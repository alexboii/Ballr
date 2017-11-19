import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import ActionInfo from 'material-ui/svg-icons/action/info';
import '../assets/scss/players.scss';

class PlayerListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: JSON.parse(this.props.playerProfile),
    };
  }

  render() {
    const { playerFiller, addSelectedPlayer } = this.props;
    const { player } = this.state;
    const imageUrl = `https://raw.githubusercontent.com/mroeschke/NBA-Player-Headshots/master/2015-2016/Player%20Photos/${player.full_name}.png`;

    return (
      <ListItem
        leftAvatar={
          <ReactImageFallback
            src={imageUrl}
            fallbackImage={playerFiller}
            initialImage={playerFiller}
            alt="cool image should be here"
            className={'avatar'}
          />
        }
        rightIcon={<ActionInfo />}
        primaryText={player.full_name}
        secondaryText="Jan 9, 2014"
        onClick={() => addSelectedPlayer(Object.assign(player, { image: imageUrl }))}
      />
    );
  }
}

PlayerListItem.propTypes = {
  playerProfile: PropTypes.string.isRequired,
  addSelectedPlayer: PropTypes.func.isRequired,
  playerFiller: PropTypes.string.isRequired,
};

export default PlayerListItem;
