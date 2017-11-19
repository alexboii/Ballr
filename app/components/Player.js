import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Group, Text } from 'react-konva';

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
  getDragBounds = (pos) => {
    let newX = pos.x;
    let newY = pos.y;
    const maxX = this.props.courtX - this.props.radius;
    const maxY = this.props.courtY - this.props.radius;
    if (pos.x < this.props.radius) {
      newX = this.props.radius;
    } else if (pos.x > maxX) {
      newX = maxX;
    }
    if (pos.y < this.props.radius) {
      newY = this.props.radius;
    } else if (pos.y > maxY) {
      newY = maxY;
    }
    return {
      x: newX,
      y: newY,
    };
  }
  createImage = (src) => {
    const image = new window.Image();
    image.src = src;
    return image;
  };
  calcDistance = (x, y) => {
    const distance = Math.abs(
      Math.sqrt(((x / 14.50) ** 2) + ((y / 15) ** 2)) -
      Math.sqrt(2 * ((this.props.radius / 15) ** 2)),
    );
    this.setState({ distance });
  }
  handleDragMove = (evt) => {
    this.setState({
      x: evt.target.attrs.x,
      y: evt.target.attrs.y,
    });
    const x = evt.target.attrs.x - (this.props.courtX / 2);
    const y = evt.target.attrs.y - (this.props.courtY - 80);
    this.calcDistance(x, y);
  }
  render() {
    return (
      <Group
        x={this.state.x}
        y={this.state.y}
        onDragMove={this.handleDragMove}
        draggable
        dragBoundFunc={this.getDragBounds}
      >
        <Circle
          radius={this.props.radius}
          fill={`hsl(${Math.max(120 - (this.state.distance * 4), 0)}, 100%, 50%)`}
          shadowBlur={5}
        />
        <Circle
          radius={(this.props.radius * 2) / 3}
          fill={'white'}
          shadowBlur={5}
        />
        <Text
          text={this.state.distance.toFixed(2)}
        />
      </Group>
    );
  }
}

Player.propTypes = {
  courtX: PropTypes.number.isRequired,
  courtY: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
};

export default Player;
