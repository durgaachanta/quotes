import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import QuotesParentContainer from './container/QuotesParentContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <QuotesParentContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
