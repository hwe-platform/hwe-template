// Prueba los hooks de `.githooks/` y la guarda de la CI en un repo git temporal.
// Se lanza a mano (`node scripts/probar-hooks.mjs`) y en la CI. No es un test de
// vitest: un script de shell no cabe ahí sin ruido.
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  chmodSync,
  mkdtempSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const RAIZ = resolve(import.meta.dirname, '..');

const FILE = '"@hwe-platform/core-ui": "file:../hwe-core/packages/core-ui"';
const LINK = '"@hwe-platform/core-ui": "link:../hwe-core/packages/core-ui"';
const PORTAL = '"@hwe-platform/core-ui": "portal:../hwe-core/packages/core-ui"';
// La forma sin protocolo, que npm y pnpm también aceptan como ruta local.
const RELATIVA = '"@hwe-platform/core-ui": "../hwe-core/packages/core-ui"';
const OVERRIDE = '"overrides": { "@hwe-platform/core-ui": "link:../otro-sitio/ui" }';
const REGISTRO = '"@hwe-platform/core-ui": "^0.6.1"';
const PERFIL = '"profile:uso": "0.1.0"';
const LOCK_FILE = '      specifier: file:../hwe-core/packages/core-ui\n';
// Un paquete real del lockfile cuyo nombre acaba en «file» no es un enlace local.
const LOCK_DETECT = '      detect-file: 1.0.0\n';
const LOCK_NOMBRE = "  '@hwe-platform/core-ui@file:../hwe-core/packages/core-ui':\n";
const LOCK_OK = '      specifier: ^0.6.1\n';

const pkg = (dep) => `{\n  "dependencies": {\n    ${dep}\n  }\n}\n`;

/** Ejecuta git y devuelve `{ ok, salida }` sin lanzar si falla. */
function git(cwd, ...args) {
  try {
    const salida = execFileSync('git', args, { cwd, stdio: 'pipe', encoding: 'utf8' });
    return { ok: true, salida };
  } catch (error) {
    return { ok: false, salida: `${error.stdout ?? ''}${error.stderr ?? ''}` };
  }
}

/** Repo temporal con los hooks activados por `core.hooksPath`, como hace `prepare`. */
function repoTemporal(base) {
  const dir = mkdtempSync(join(base, 'repo-'));
  git(dir, 'init', '-q', '-b', 'main');
  git(dir, 'config', 'user.email', 'prueba@hwe.test');
  git(dir, 'config', 'user.name', 'Prueba');
  git(dir, 'config', 'commit.gpgsign', 'false');
  cpSync(join(RAIZ, '.githooks'), join(dir, '.githooks'), { recursive: true });
  for (const f of readdirSync(join(dir, '.githooks'))) chmodSync(join(dir, '.githooks', f), 0o755);
  git(dir, 'config', 'core.hooksPath', '.githooks');
  return dir;
}

function escribir(dir, ficheros) {
  for (const [nombre, contenido] of Object.entries(ficheros)) {
    writeFileSync(join(dir, nombre), contenido);
  }
}

/** Escribe y añade los ficheros al índice. */
function preparar(dir, ficheros) {
  escribir(dir, ficheros);
  git(dir, 'add', ...Object.keys(ficheros));
}

function commit(dir, mensaje, ficheros) {
  preparar(dir, ficheros);
  return git(dir, 'commit', '-q', '-m', mensaje);
}

/** Se salta el pre-commit: sirve para crear un commit malo que el pre-push tiene que cazar. */
function commitSinVerificar(dir, mensaje, ficheros) {
  preparar(dir, ficheros);
  return git(dir, 'commit', '-q', '--no-verify', '-m', mensaje);
}

const resultados = [];
function caso(nombre, esperado, real) {
  resultados.push({ nombre, pasa: esperado === real });
}

function probarPreCommit(base) {
  const dir = repoTemporal(base);
  const casos = [
    ['bloquea file: en package.json', false, { 'package.json': pkg(FILE) }],
    ['bloquea link: en package.json', false, { 'package.json': pkg(LINK) }],
    ['bloquea portal: en package.json', false, { 'package.json': pkg(PORTAL) }],
    ['bloquea una ruta relativa sin protocolo', false, { 'package.json': pkg(RELATIVA) }],
    ['bloquea un override con link:', false, { 'package.json': pkg(OVERRIDE) }],
    ['bloquea file: en pnpm-lock.yaml', false, { 'pnpm-lock.yaml': LOCK_FILE }],
    ['no confunde profile: con file:', true, { 'package.json': pkg(PERFIL) }],
    ['no confunde detect-file: con file:', true, { 'pnpm-lock.yaml': LOCK_DETECT }],
    ['bloquea file: en el nombre completo del lockfile', false, { 'pnpm-lock.yaml': LOCK_NOMBRE }],
    ['deja pasar ^0.6.1 en package.json', true, { 'package.json': pkg(REGISTRO) }],
    ['deja pasar ^0.6.1 en pnpm-lock.yaml', true, { 'pnpm-lock.yaml': LOCK_OK }],
  ];
  for (const [nombre, deberiaPasar, ficheros] of casos) {
    const r = commit(dir, nombre, ficheros);
    caso(`pre-commit ${nombre}`, deberiaPasar, r.ok);
    if (!r.ok) git(dir, 'reset', '-q', '--hard');
  }
}

/** Repo con un commit malo en medio de la serie y un remoto bare. */
function repoConSerieMala(base, rama) {
  const dir = repoTemporal(base);
  const remoto = mkdtempSync(join(base, 'remoto-'));
  git(remoto, 'init', '-q', '--bare');
  git(dir, 'remote', 'add', 'origin', remoto);
  commit(dir, 'base', { 'package.json': pkg(REGISTRO) });
  git(dir, 'push', '-q', 'origin', 'main');
  git(dir, 'switch', '-q', '-c', rama);
  commit(dir, 'bueno', { 'a.txt': 'a\n' });
  commitSinVerificar(dir, 'malo', { 'package.json': pkg(FILE) });
  commit(dir, 'arreglo', { 'package.json': pkg(REGISTRO) });
  return dir;
}

function probarPrePush(base) {
  const malo = repoConSerieMala(base, 'feat/serie');
  const r1 = git(malo, 'push', 'origin', 'feat/serie');
  caso('pre-push bloquea un commit malo en medio de la serie', false, r1.ok);

  const wip = repoConSerieMala(base, 'wip/copia');
  const r2 = git(wip, 'push', 'origin', 'wip/copia');
  caso('pre-push deja pasar una rama wip/*', true, r2.ok);

  // Lo ya subido a wip/* no cuenta como revisado: el commit malo no se cuela después.
  git(wip, 'switch', '-q', '-c', 'feat/despues');
  const r3 = git(wip, 'push', 'origin', 'feat/despues');
  caso('pre-push no da por revisado lo subido a wip/*', false, r3.ok);

  const limpio = repoTemporal(base);
  const remoto = mkdtempSync(join(base, 'remoto-'));
  git(remoto, 'init', '-q', '--bare');
  git(limpio, 'remote', 'add', 'origin', remoto);
  commit(limpio, 'base', { 'package.json': pkg(REGISTRO) });
  const r4 = git(limpio, 'push', 'origin', 'main');
  caso('pre-push deja pasar una serie limpia', true, r4.ok);

  probarRemotaAdelantada(base);
}

/**
 * La rama remota avanzó (otra persona empujó) y este repo no hizo fetch: su SHA no
 * existe en local y el rango `remota..local` falla. El hook no puede dejar pasar
 * el push sin revisar nada.
 */
function probarRemotaAdelantada(base) {
  const dir = repoTemporal(base);
  const remoto = mkdtempSync(join(base, 'remoto-'));
  git(remoto, 'init', '-q', '--bare');
  git(dir, 'remote', 'add', 'origin', remoto);
  commit(dir, 'base', { 'package.json': pkg(REGISTRO) });
  git(dir, 'push', '-q', 'origin', 'main');
  git(dir, 'switch', '-q', '-c', 'feat/adelantada');
  commit(dir, 'bueno', { 'a.txt': 'a\n' });
  git(dir, 'push', '-q', 'origin', 'feat/adelantada');

  const otro = mkdtempSync(join(base, 'otro-'));
  git(base, 'clone', '-q', remoto, otro);
  git(otro, 'config', 'user.email', 'otra@hwe.test');
  git(otro, 'config', 'user.name', 'Otra');
  git(otro, 'config', 'commit.gpgsign', 'false');
  git(otro, 'switch', '-q', 'feat/adelantada');
  commit(otro, 'extra', { 'b.txt': 'b\n' });
  git(otro, 'push', '-q', 'origin', 'feat/adelantada');

  commitSinVerificar(dir, 'malo', { 'package.json': pkg(FILE) });
  const r = git(dir, 'push', '--force', 'origin', 'feat/adelantada');
  caso('pre-push no deja pasar un commit malo si la remota avanzó sin fetch', false, r.ok);
}

function probarGuardaCi(base) {
  const dir = mkdtempSync(join(base, 'ci-'));
  cpSync(join(RAIZ, '.githooks'), join(dir, '.githooks'), { recursive: true });
  mkdirSync(join(dir, '.github', 'scripts'), { recursive: true });
  cpSync(
    join(RAIZ, '.github', 'scripts', 'comprobar-sin-file.sh'),
    join(dir, '.github', 'scripts', 'comprobar-sin-file.sh'),
  );
  const guarda = () => {
    try {
      execFileSync('sh', ['.github/scripts/comprobar-sin-file.sh'], { cwd: dir, stdio: 'pipe' });
      return { ok: true, salida: '' };
    } catch (error) {
      return { ok: false, salida: `${error.stdout ?? ''}${error.stderr ?? ''}` };
    }
  };

  escribir(dir, { 'package.json': pkg(REGISTRO), 'pnpm-lock.yaml': LOCK_OK });
  caso('guarda de la CI deja pasar el registro', true, guarda().ok);

  escribir(dir, { 'package.json': pkg(FILE) });
  const r = guarda();
  caso('guarda de la CI falla con file:', false, r.ok);
  caso('guarda de la CI dice qué línea es', true, /package\.json:3/.test(r.salida));
}

const base = mkdtempSync(join(tmpdir(), 'hwe-hooks-'));
try {
  probarPreCommit(base);
  probarPrePush(base);
  probarGuardaCi(base);
} finally {
  rmSync(base, { recursive: true, force: true });
}

for (const { nombre, pasa } of resultados) {
  process.stdout.write(`${pasa ? 'ok     ' : 'FALLA  '} ${nombre}\n`);
}
const fallos = resultados.filter((r) => !r.pasa).length;
process.stdout.write(`\n${resultados.length - fallos}/${resultados.length} casos correctos\n`);
process.exit(fallos === 0 ? 0 : 1);
