import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Group, Text } from 'react-konva';
import { GET_ZONES_PER_PLAYER } from '../constants/EndpointConstants';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.courtX / 2,
      y: props.courtY / 2,
      percentage: 0,
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
    const formData = new FormData();
    const payload = { "x": (x / 14.5), "y": (y / 15)}; // eslint-disable-line
    for (const key in payload) { // eslint-disable-line
      formData.append(key, payload[key]); // eslint-disable-line
    }
    fetch(GET_ZONES_PER_PLAYER(
      this.props.data.player_id),
      {
        method: 'POST',
        body: formData,
      },
      )
      .then((response) => {
        return response.json();
      })
      .then((r) => {
        this.setState({ percentage: r.percent_difference_average });
      })
      .catch(() => {
      });
  }
  handleDrag = (evt) => {
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
        onDragEnd={this.handleDrag}
        draggable
        dragBoundFunc={this.getDragBounds}
      >
        <Circle
          radius={this.props.radius}
          fill={`hsl(${Math.max(120 - (this.state.percentage * 400), 0)}, 100%, 50%)`}
          shadowBlur={5}
        />
        <Circle
          radius={(this.props.radius * 2) / 3}
          fill={'white'}
          shadowBlur={5}
        />
        <Text
          text={`${this.props.data.number} \n ${(this.state.percentage * 100).toFixed(2)}%`}
        />
      </Group>
    );
  }
}

Player.propTypes = {
  courtX: PropTypes.number.isRequired,
  courtY: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line
};

export default Player;
