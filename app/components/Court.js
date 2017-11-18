import React, { Component } from 'react';
import { Rect, Layer, Stage } from 'react-konva';
import Player from './Player';

class Court extends Component {
  constructor() {
    super();

    this.state = {};
  }

  handleDragMove = (evt) => {
    const dX = evt.target.attrs.x - 350;
    const dY = evt.target.attrs.y - 60;

    console.log(Math.sqrt((dX ** 2) + (dY ** 2)));
  }

  render() {
    return (
      <Stage width={700} height={700} onDragMove={this.handleDragMove}>
        <Layer>
          <Rect fill={'brown'} width={700} height={700} />
          <Player />
        </Layer>
      </Stage>
    );
  }
}

export default Court;
