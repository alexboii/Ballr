import React, { Component } from 'react';
import { Rect, Layer, Stage } from 'react-konva';
import Player from './Player';

class Court extends Component {
  constructor() {
    super();
    this.state = {
      distance: 0,
    };
  }

  createImage = (src) => {
    const image = new window.Image();
    image.src = src;
    return image;
  }

  render() {
    return (
      <Stage width={750} height={704}>
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
