import React, { Component } from 'react';
import Court from '../components/Court';
import Players from '../components/Players';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <Court />
        <Players />
      </div>
    );
  }
}

export default App;
