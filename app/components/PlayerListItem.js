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
    const imageUrl = `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`;

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
        rightIcon={
          <ActionInfo
            onClick={() => addSelectedPlayer(Object.assign(player, { image: imageUrl }))}
          />
        }
        primaryText={player.full_name}
        secondaryText="Jan 9, 2014"
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
