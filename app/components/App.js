import React, { Component } from 'react';
import Court from '../components/Court';
import Players from '../components/Players';
import '../assets/scss/main.scss';

class App extends Component {
  constructor() {
    super();

    this.state = { selectedPlayers: [] };
    this.addPlayer = this.addPlayer.bind(this);
  }

  addPlayer(player) {
    this.setState({ selectedPlayers: [...this.state.selectedPlayers, player] });
  }

  render() {
    return (
      <div className={'body'}>
        <Court selectedPlayers={this.state.selectedPlayers} />
        <Players addSelectedPlayer={this.addPlayer} />
      </div>
    );
  }
}

export default App;
