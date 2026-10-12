import * as migration_20260929_152152_initial from './20260929_152152_initial';
import * as migration_20261001_140635_hu026_indexing from './20261001_140635_hu026_indexing';
import * as migration_20261012_094431_contrato_tokens from './20261012_094431_contrato_tokens';
import * as migration_20261012_095742_ocho_idiomas from './20261012_095742_ocho_idiomas';

export const migrations = [
  {
    up: migration_20260929_152152_initial.up,
    down: migration_20260929_152152_initial.down,
    name: '20260929_152152_initial',
  },
  {
    up: migration_20261001_140635_hu026_indexing.up,
    down: migration_20261001_140635_hu026_indexing.down,
    name: '20261001_140635_hu026_indexing',
  },
  {
    up: migration_20261012_094431_contrato_tokens.up,
    down: migration_20261012_094431_contrato_tokens.down,
    name: '20261012_094431_contrato_tokens',
  },
  {
    up: migration_20261012_095742_ocho_idiomas.up,
    down: migration_20261012_095742_ocho_idiomas.down,
    name: '20261012_095742_ocho_idiomas',
  },
];
