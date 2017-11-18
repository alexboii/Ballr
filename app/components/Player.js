import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Group, Text } from 'react-konva';

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

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.courtX / 2,
      y: props.courtY / 2,
      distance: 0,
    };
  }

  componentDidMount() {
    this.calcDistance(this.props.courtX / 2, this.props.courtY / 2);
  }

  calcDistance = (x, y) => {
    const distance = Math.abs(
      Math.sqrt(((x / 15) ** 2) + ((y / 15) ** 2)) -
      Math.sqrt(2 * ((20 / 15) ** 2)),
    );
    this.setState({ distance });
  }
  handleDragMove = (evt) => {
    this.setState({
      x: evt.target.attrs.x,
      y: evt.target.attrs.y,
    });
    const x = evt.target.attrs.x - (750 / 2);
    const y = evt.target.attrs.y - (704 - 80);
    this.calcDistance(x, y);
  }
  render() {
    return (
      <Group
        x={this.state.x}
        y={this.state.y}
        onDragMove={this.handleDragMove}
        draggable
        dragBoundFunc={getDragBounds}
      >
        <Circle
          radius={20}
          fill={'red'}
          shadowBlur={5}
        />
        <Text
          text={this.state.distance.toString()}
        />
      </Group>
    );
  }
}

Player.propTypes = {
  courtX: PropTypes.number.isRequired,
  courtY: PropTypes.number.isRequired,
};

export default Player;
