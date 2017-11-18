import React, { Component } from 'react';
import { Rect, Layer, Stage } from 'react-konva';
import Player from './Player';

class Court extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [1, 2, 3, 4, 5],
    };
  }

  createImage = (src) => {
    const image = new window.Image();
    image.src = src;
    return image;
  }

  render() {
    const players = this.state.players.map(() => <Player courtX={750} courtY={704} />);
    return (
      <Stage width={750} height={704}>
        <Layer>
          <Rect
            fillPatternImage={this.createImage('https://i.imgur.com/8XqqzWp.png')}
            width={750}
            height={704}
          />
          {players}
        </Layer>
      </Stage>
    );
  }
}

export default Court;
