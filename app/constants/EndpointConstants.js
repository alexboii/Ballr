const PROXY_ENDPOINT = 'https://cors-anywhere.herokuapp.com/';

const BACKEND_ENDPOINT = `${PROXY_ENDPOINT}https://ballr.herokuapp.com/`;

const TEAM_ENDPOINT = `${BACKEND_ENDPOINT}teams/`;

const GET_PLAYERS_PER_TEAM = teamAbb => `${TEAM_ENDPOINT}${teamAbb}`;

export { GET_PLAYERS_PER_TEAM, BACKEND_ENDPOINT, TEAM_ENDPOINT };
