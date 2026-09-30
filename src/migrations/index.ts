import * as migration_20260929_152152_initial from './20260929_152152_initial';

export const migrations = [
  {
    up: migration_20260929_152152_initial.up,
    down: migration_20260929_152152_initial.down,
    name: '20260929_152152_initial'
  },
];
