import React, { Component } from 'react';
import { Rect, Layer, Stage } from 'react-konva';
import PropTypes from 'prop-types';
import Player from './Player';
import { TEAM_LOGO } from '../constants/ImageConstants';

class Court extends Component {

  createImage = (src) => {
    const image = new window.Image();
    image.src = src;
    return image;
  };

  render() {
    const players = this.props.selectedPlayers.map(
      data => <Player key={data.player_id} courtX={750} courtY={704} radius={22} data={data} />,
    );
    console.log(this.props.selectedPlayers);
    const teamName = (this.props.selectedPlayers.length > 0 && this.props.selectedPlayers[0]['player_stats.team']) || 'gsw';
    return (
      <Stage width={750} height={704}>
        <Layer>
          <Rect
            fillPatternImage={this.createImage('https://i.imgur.com/8XqqzWp.png')}
            width={750}
            height={704}
          />
          <Rect
            fillPatternImage={this.createImage(`${TEAM_LOGO}${teamName}.png`)}
            width={500}
            height={500}
            rotate={Math.PI / 2}
            x={125}
            y={-250}
          />
          {players}
        </Layer>
      </Stage>
    );
  }
}

Court.propTypes = {
  selectedPlayers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Court;
