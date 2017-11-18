import _ from 'lodash';

const TEAMS_CONST = {
  atl: 'hawks',
  bkn: 'nets',
  bos: 'celtics',
  cha: 'hornets',
  chi: 'bulls',
  cle: 'cavaliers',
  dal: 'mavericks',
  den: 'nuggets',
  det: 'pistons',
  gsw: 'warriors',
  hou: 'rockets',
  ind: 'pacers',
  lac: 'clippers',
  lal: 'lakers',
  mem: 'grizzlies',
  mia: 'heat',
  mil: 'bucks',
  min: 'timberwolves',
  nop: 'pelicans',
  nyk: 'knicks',
  okc: 'thunder',
  orl: 'magic',
  phi: '76ers',
  phx: 'suns',
  por: 'blazers',
  sac: 'kings',
  sas: 'spurs',
  tor: 'raptors',
  uta: 'jazz',
  was: 'wizards',
};

const TEAMS_ARRAY = Object.values(TEAMS_CONST);

const TEAMS_SWAPPED = _.invert(TEAMS_CONST);

export { TEAMS_ARRAY, TEAMS_CONST, TEAMS_SWAPPED };
