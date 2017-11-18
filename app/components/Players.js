import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ReactImageFallback from 'react-image-fallback';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TEAMS_CONST, TEAMS_ARRAY } from '../constants/TeamConstants';
import { GET_PLAYERS_PER_TEAM } from '../constants/EndpointConstants';
import '../assets/scss/players.scss';
import PLAYER_FILLER from '../constants/ImageConstants';

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
        src={`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${getKeyByValue(
          TEAMS_CONST,
          suggestion,
        )}.png`}
        alt={suggestion}
      />
      <span>{suggestion}</span>
    </div>
  );
};

class Players extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      players: [],
      loading: false,
    };

    this.onChangeSuggestion = this.onChangeSuggestion.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onChangeSuggestion(event, { newValue }) {
    this.setState({
      value: newValue,
    });

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
          this.setState({ players: response });
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

  render() {
    const { value, suggestions, players, loading } = this.state;

    const inputProps = {
      placeholder: 'Enter a team',
      value,
      onChange: this.onChangeSuggestion,
    };

    const listElements = players.map(player => (
      <ListItem
        leftAvatar={
          <ReactImageFallback
            src={`https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`}
            fallbackImage={PLAYER_FILLER}
            initialImage={PLAYER_FILLER}
            alt="cool image should be here"
            className={'avatar'}
          />
        }
        rightIcon={<ActionInfo />}
        primaryText={player.full_name}
        secondaryText="Jan 9, 2014"
      />
    ));

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
              left={120}
              top={100}
              status="loading"
              className={'refresh'}
            />
          </MuiThemeProvider>
        )}

        {players.length > 0 && (
          <MuiThemeProvider>
            <List>{listElements}</List>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

export default Players;
