import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import logo from './logo.svg';
import './App.css';
import {fetchBlah, fetchWSClient} from './actions/actions';
// import $ from "jquery";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.props.fetchBlah();
    this.props.fetchWSClient();
  }
  
  render() {
    console.log(this.props.wsClient);
    return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to <code>EffingVote</code>.
            {this.props.blah}
          </p>
        </header>React.Component 
      </div>
  }
}

const mapStateToProps = (state) => {
  return {
    blah: state.blah.blah,
    wsClient: state.blah.wsClient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlah: () => dispatch(fetchBlah()),
    fetchWSClient: () => dispatch(fetchWSClient()),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
