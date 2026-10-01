import * as migration_20260929_152152_initial from './20260929_152152_initial';
import * as migration_20261001_140635_hu026_indexing from './20261001_140635_hu026_indexing';

export const migrations = [
  {
    up: migration_20260929_152152_initial.up,
    down: migration_20260929_152152_initial.down,
    name: '20260929_152152_initial',
  },
  {
    up: migration_20261001_140635_hu026_indexing.up,
    down: migration_20261001_140635_hu026_indexing.down,
    name: '20261001_140635_hu026_indexing'
  },
];
