import React, { Component } from 'react';
import Court from '../components/Court';
import Players from '../components/Players';
import '../assets/scss/main.scss';

class App extends Component {
  constructor() {
    super();

    this.state = { selectedPlayers: [] };
    this.addPlayer = this.addPlayer.bind(this);
    this.clearPlayersList = this.clearPlayersList.bind(this);
  }

  addPlayer(player) {
    console.log('Am I here?');
    this.setState({ selectedPlayers: [...this.state.selectedPlayers, player] });
    console.log(this.state.selectedPlayers);
  }

  clearPlayersList() {
    this.setState({ selectedPlayers: [] });
  }

  render() {
    const listElements = this.state.selectedPlayers.map(
      player => <li key={player.player_id}>{player.full_name}</li>,
    );
    return (
      <div className={'body'}>
        <Court selectedPlayers={this.state.selectedPlayers} />
        <Players addSelectedPlayer={this.addPlayer} clearPlayersList={this.clearPlayersList} />
        <ul>{listElements}</ul>
      </div>
    );
  }
}

export default App;
