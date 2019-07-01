import React from 'react';
import logo from './logo.svg';
import './App.css';
// import * as ApiUtil from './api_util';
import $ from "jquery";

class App extends React.Component {
  
  getBlah() {
    return $.ajax({
      method: 'get',
      url: `/blah`,
    });
  };
  
  render() {
    const apiResponse = this.getBlah();
    console.log(apiResponse.responseText);
    return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to <code>EffingVote</code>.
            {apiResponse.responseText}
          </p>
        </header>React.Component 
      </div>
  }
}

export default App;