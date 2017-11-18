import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';

function getDragBounds(pos) {
  let newX = pos.x;
  let newY = pos.y;
  const maxX = 750 - 20;
  const maxY = 704 - 20;
  if (pos.x < 20) {
    newX = 20;
  } else if (pos.x > maxX) {
    newX = maxX;
  }
  if (pos.y < 20) {
    newY = 20;
  } else if (pos.y > maxY) {
    newY = maxY;
  }

  return {
    x: newX,
    y: newY,
  };
}

const Player = (props) => {
  return (
    <Circle
      x={props.courtX / 2}
      y={props.courtY / 2}
      radius={20}
      fill={'black'}
      shadowBlur={5}
      draggable
      dragBoundFunc={getDragBounds}
    />
  );
};

Player.propTypes = {
  courtX: PropTypes.number.isRequired,
  courtY: PropTypes.number.isRequired,
};

export default Player;
