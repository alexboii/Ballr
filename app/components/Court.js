import React, { Component } from 'react';
import { Rect, Layer, Stage } from 'react-konva';
import Player from './Player';

class Court extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  createImage = (src) => {
    const image = new window.Image();
    image.src = src;
    return image;
  }

  handleDragMove = (evt) => {
    const x = evt.target.attrs.x - 350;
    const y = evt.target.attrs.y - 60;
    this.calcDistance(x, y);
  }

  calcDistance = (x, y) => {
    return Math.sqrt((x ** 2) + (y ** 2));
  }

  render() {
    return (
      <Stage width={750} height={704} onDragMove={this.handleDragMove}>
        <Layer>
          <Rect
            fillPatternImage={this.createImage('https://i.imgur.com/8XqqzWp.png')}
            width={750}
            height={704}
          />
          <Player courtX={750} courtY={704} />
        </Layer>
      </Stage>
    );
  }
}

export default Court;
