import * as migration_20261015_093257_initial from './20261015_093257_initial';
import * as migration_20261015_093644_media_prefix from './20261015_093644_media_prefix';
import * as migration_20261015_102417_footer_contacts from './20261015_102417_footer_contacts';
import * as migration_20261015_120640_partners_title_legal from './20261015_120640_partners_title_legal';
import * as migration_20261023_120922_landing_seo from './20261023_120922_landing_seo';

export const migrations = [
  {
    up: migration_20261015_093257_initial.up,
    down: migration_20261015_093257_initial.down,
    name: '20261015_093257_initial',
  },
  {
    up: migration_20261015_093644_media_prefix.up,
    down: migration_20261015_093644_media_prefix.down,
    name: '20261015_093644_media_prefix',
  },
  {
    up: migration_20261015_102417_footer_contacts.up,
    down: migration_20261015_102417_footer_contacts.down,
    name: '20261015_102417_footer_contacts',
  },
  {
    up: migration_20261015_120640_partners_title_legal.up,
    down: migration_20261015_120640_partners_title_legal.down,
    name: '20261015_120640_partners_title_legal',
  },
  {
    up: migration_20261023_120922_landing_seo.up,
    down: migration_20261023_120922_landing_seo.down,
    name: '20261023_120922_landing_seo'
  },
];
