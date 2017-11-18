import React, { Component } from 'react';
import { Circle } from 'react-konva';

function getDragBounds(pos) {
  let newX = pos.x;
  let newY = pos.y;
  if (pos.x < 25) {
    newX = 25;
  } else if (pos.x > 675) {
    newX = 675;
  }
  if (pos.y < 25) {
    newY = 25;
  } else if (pos.y > 675) {
    newY = 675;
  }

  return {
    x: newX,
    y: newY,
  }
}

class Player extends Component {
  render() {
    return (
      <Circle
        x={350}
        y={350}
        width={50}
        height={50}
        fill={'black'}
        shadowBlur={5}
        draggable
        dragBoundFunc={getDragBounds}
      />
    );
  }
}

export default Player;
