import React, { Component } from 'react';
import ReactImageFallback from 'react-image-fallback';
import Court from '../components/Court';
import Players from '../components/Players';
import '../assets/scss/main.scss';
import { PLAYER_FILLER } from '../constants/ImageConstants';

class App extends Component {
  constructor() {
    super();

    this.state = { selectedPlayers: [] };
    this.addPlayer = this.addPlayer.bind(this);
    this.clearPlayersList = this.clearPlayersList.bind(this);
  }

  addPlayer(player) {
    if (
      !this.state.selectedPlayers.some(x => x.full_name === player.full_name) &&
      this.state.selectedPlayers.length < 5
    ) {
      this.setState({ selectedPlayers: [...this.state.selectedPlayers, player] });
    }
  }

  clearPlayersList() {
    this.setState({ selectedPlayers: [] });
  }

  render() {
    const { selectedPlayers } = this.state;

    const listElements = selectedPlayers.map((player) => {
      const imageUrl = `https://raw.githubusercontent.com/mroeschke/NBA-Player-Headshots/master/2015-2016/Player%20Photos/${player.full_name}.png`;

      return (
        <div className={'player-box'}>
          <ReactImageFallback
            src={imageUrl}
            fallbackImage={PLAYER_FILLER}
            initialImage={PLAYER_FILLER}
            alt="cool image should be here"
            className={'lower-image'}
          />
          <div className={'player-text-info'}>
            <div className={'player-text-name'}>
              <p>{player.first_name}</p>
              <p>{player.last_name}</p>
            </div>
            <div className={'player-number'}>{player.number}</div>
          </div>
        </div>
      );
    });

    return (
      <div className={'body'}>
        <div>
          <Court selectedPlayers={this.state.selectedPlayers} />
          <div className={'players-detailed'}>{listElements}</div>
        </div>
        <Players addSelectedPlayer={this.addPlayer} clearPlayersList={this.clearPlayersList} />
      </div>
    );
  }
}

export default App;
