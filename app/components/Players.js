import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { List } from 'material-ui/List';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TEAMS_CONST, TEAMS_ARRAY } from '../constants/TeamConstants';
import { GET_PLAYERS_PER_TEAM } from '../constants/EndpointConstants';
import PlayerListItem from '../components/PlayerListItem';
import '../assets/scss/players.scss';
import { PLAYER_FILLER, TEAM_LOGO } from '../constants/ImageConstants';

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : TEAMS_ARRAY.filter(team => team.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = suggestion => suggestion;

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

const renderSuggestion = (suggestion) => {
  return (
    <div>
      <img
        className={'team-logo'}
        src={`${TEAM_LOGO}${getKeyByValue(TEAMS_CONST, suggestion)}.png`}
        alt={suggestion}
      />
      <span>{suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}</span>
    </div>
  );
};

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
      players: [],
      loading: false,
      selectedPlayers: props.selectedPlayers,
    };

    this.onChangeSuggestion = this.onChangeSuggestion.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);

    this.addPlayerCopy = this.addPlayerCopy.bind(this);
    this.removePlayerCopy = this.removePlayerCopy.bind(this);
  }

  onChangeSuggestion(event, { newValue }) {
    this.setState({
      value: newValue,
    });

    this.props.clearPlayersList();

    if (TEAMS_ARRAY.find(team => team === newValue)) {
      // TODO: REST CALLS FOR ARRAY OF PLAYERS
      const teamKey = getKeyByValue(TEAMS_CONST, newValue);

      this.setState({ loading: true });

      fetch(GET_PLAYERS_PER_TEAM(teamKey))
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((response) => {
          this.setState({ loading: false });
          const newList = _.reverse(
            _.sortBy(_.uniqBy(response, 'full_name'), x => x.points_per_game),
          );

          this.setState({
            players: newList,
          });
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ players: [] });
    }
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  addPlayerCopy(e) {
    this.props.addSelectedPlayer(e);
  }

  removePlayerCopy(e) {
    this.props.removeSelectedPlayer(e);
  }

  render() {
    const { value, suggestions, players, loading } = this.state;

    const inputProps = {
      placeholder: 'Enter a team',
      value,
      onChange: this.onChangeSuggestion,
    };

    const listElements = players.map((player) => {
      return (
        <PlayerListItem
          key={player.player_id}
          playerProfile={JSON.stringify(player)}
          addSelectedPlayer={this.addPlayerCopy}
          removeSelectedPlayer={this.removePlayerCopy}
          playerFiller={PLAYER_FILLER}
          selectedPlayers={this.props.selectedPlayers}
        />
      );
    });

    return (
      <div className="body-suggestions">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

        {loading && (
          <MuiThemeProvider>
            <RefreshIndicator
              size={40}
              left={1220}
              top={100}
              status="loading"
              className={'refresh'}
            />
          </MuiThemeProvider>
        )}

        {players.length > 0 && (
          <MuiThemeProvider>
            <div className="players-box">
              <List>{listElements}</List>
            </div>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

Players.propTypes = {
  addSelectedPlayer: PropTypes.func.isRequired,
  clearPlayersList: PropTypes.func.isRequired,
  selectedPlayers: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeSelectedPlayer: PropTypes.func.isRequired,
};

export default Players;
