import React, { Component } from 'react';
import ReactModal from 'react-modal';
// import * as _ from 'lodash';
import { ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import ActionInfo from 'material-ui/svg-icons/action/info';
import '../assets/scss/players.scss';
import POSITION_CONSTANTS from '../constants/PlayerConstants';

class PlayerListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: JSON.parse(this.props.playerProfile),
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { playerFiller, addSelectedPlayer } = this.props;
    const { player } = this.state;
    const imageUrl = `https://raw.githubusercontent.com/mroeschke/NBA-Player-Headshots/master/2015-2016/Player%20Photos/${player.full_name}.png`;

    return (
      <div>
        <ListItem
          style={{
            backgroundColor: this.props.selectedPlayers.some(x => x.full_name === player.full_name)
              ? '#83EEA7'
              : '',
            marginRight: 2,
          }}
          leftAvatar={
            <ReactImageFallback
              src={imageUrl}
              fallbackImage={playerFiller}
              initialImage={playerFiller}
              alt="cool image should be here"
              className={'avatar'}
            />
          }
          rightIcon={<ActionInfo onClick={this.handleOpenModal} />}
          primaryText={player.full_name}
          secondaryText={POSITION_CONSTANTS[player.position]}
          onClick={() => {
            setTimeout(() => {
              if (!this.state.showModal) {
                if (addSelectedPlayer(Object.assign(player, { image: imageUrl })) !== 0) {
                  this.setState({ toggled: true });
                }
              }
            }, 10);
          }}
        />
        <ReactModal
          isOpen={this.state.showModal}
          className="modal"
          contentLabel="Minimal Modal Example"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
        >
          <div className={'modal-div'}>
            <div className={'modal-header'}>
              <ReactImageFallback
                src={imageUrl}
                fallbackImage={playerFiller}
                initialImage={playerFiller}
                className={'modal-player-avatar'}
                alt="cool image should be here"
              />
              <div className={'modal-player-info-header'}>
                <h1>{player.full_name}</h1>
                <h2>{POSITION_CONSTANTS[player.position]}</h2>
              </div>
            </div>
            <div className="stats-container">
              <div className="modal-stats-container">
                <div className="modal-stats-name">PTS</div>
                <div className="modal-stats-result">{player.points_per_game.toFixed(2)}</div>
              </div>
              <div className="modal-stats-container">
                <div className="modal-stats-name">REB</div>
                <div className="modal-stats-result">{player.rebounds_per_game.toFixed(2)}</div>
              </div>
              <div className="modal-stats-container">
                <div className="modal-stats-name">AST</div>
                <div className="modal-stats-result">{player.assists_per_game.toFixed(2)}</div>
              </div>
              <div className="modal-stats-container">
                <div className="modal-stats-name">BLK</div>
                <div className="modal-stats-result">{player.blocks_per_game.toFixed(2)}</div>
              </div>
              <div className="modal-stats-container">
                <div className="modal-stats-name">STL</div>
                <div className="modal-stats-result">{player.steals_per_game.toFixed(2)}</div>
              </div>
              <div className="modal-stats-container">
                <div className="modal-stats-name">MPG</div>
                <div className="modal-stats-result">{player.minutes.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

PlayerListItem.propTypes = {
  playerProfile: PropTypes.string.isRequired,
  addSelectedPlayer: PropTypes.func.isRequired,
  playerFiller: PropTypes.string.isRequired,
  selectedPlayers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayerListItem;
