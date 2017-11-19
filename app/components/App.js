import React, { Component } from 'react';
import ReactImageFallback from 'react-image-fallback';
import ReactModal from 'react-modal';
import Court from '../components/Court';
import Players from '../components/Players';
import '../assets/scss/main.scss';
import { PLAYER_FILLER } from '../constants/ImageConstants';
import '../assets/scss/players.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedPlayers: [],
      showModal: true,
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.clearPlayersList = this.clearPlayersList.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  addPlayer(player) {
    if (
      !this.state.selectedPlayers.some(x => x.full_name === player.full_name) &&
      this.state.selectedPlayers.length < 5
    ) {
      this.setState({ selectedPlayers: [...this.state.selectedPlayers, player] });
    } else {
      return 'err';
    }

    return 'good';
  }

  clearPlayersList() {
    this.setState({ selectedPlayers: [] });
  }

  removePlayer(player) {
    this.setState({
      selectedPlayers: this.state.selectedPlayers.filter(x => x.player_id !== player.player_id),
    });
  }

  render() {
    const { selectedPlayers } = this.state;

    const listElements = selectedPlayers.map((player) => {
      const imageUrl = `https://raw.githubusercontent.com/mroeschke/NBA-Player-Headshots/master/2015-2016/Player%20Photos/${player.full_name}.png`;

      return (
        <div className={'player-box'} key={player.player_id}>
          <ReactImageFallback
            src={imageUrl}
            fallbackImage={PLAYER_FILLER}
            initialImage={PLAYER_FILLER}
            alt="cool image should be here"
            className={'lower-image'}
            onClick={() => this.removePlayer(player)}
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
        <Players
          addSelectedPlayer={this.addPlayer}
          removeSelectedPlayer={this.removePlayer}
          selectedPlayers={this.state.selectedPlayers}
          clearPlayersList={this.clearPlayersList}
        />
        <ReactModal
          isOpen={this.state.showModal}
          className="modal"
          contentLabel="Minimal Modal Example"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
        >
          <div className={'modal-div2'}>
            <div className="buff2">
              <img
                style={{ marginTop: 10, width: 500 }}
                alt="img"
                src="https://i.imgur.com/0DuIpG4.png"
              />
            </div>
            <div className="buff1">
              Improve your play making! Through advanced data analytics and a comfortable user
              interface, Ballr allows you to prepare the plays that optimize the capabilities of
              your team. Simply select your preferred team. Clicking on players will automatically
              place them in their best positions, but if you choose to drag them around it will
              indicate how comfortable they might be in different positions. A greener color means
              the player is best in the current position, while red indicates that you should think
              twice about the layout.
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default App;
