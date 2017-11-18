import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Player from './Player';

class Court extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <Player />
        </Layer>
      </Stage>
    );
  }
}

export default Court;
