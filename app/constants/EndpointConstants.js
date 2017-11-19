const PROXY_ENDPOINT = 'https://cors-anywhere.herokuapp.com/';

const BACKEND_ENDPOINT = `${PROXY_ENDPOINT}https://ballr.herokuapp.com/`;

const TEAM_ENDPOINT = `${BACKEND_ENDPOINT}teams/`;

const PLAYER_ENDPOINT = `${BACKEND_ENDPOINT}player/`;

const GET_ZONES_PER_PLAYER = playerId => `${PLAYER_ENDPOINT}${playerId}/zone`;

const GET_PLAYERS_PER_TEAM = teamAbb => `${TEAM_ENDPOINT}${teamAbb}`;

export { GET_PLAYERS_PER_TEAM, BACKEND_ENDPOINT, TEAM_ENDPOINT, GET_ZONES_PER_PLAYER };
