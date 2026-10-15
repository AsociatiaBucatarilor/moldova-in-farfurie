import * as migration_20261015_093257_initial from './20261015_093257_initial';
import * as migration_20261015_093644_media_prefix from './20261015_093644_media_prefix';

export const migrations = [
  {
    up: migration_20261015_093257_initial.up,
    down: migration_20261015_093257_initial.down,
    name: '20261015_093257_initial',
  },
  {
    up: migration_20261015_093644_media_prefix.up,
    down: migration_20261015_093644_media_prefix.down,
    name: '20261015_093644_media_prefix'
  },
];
