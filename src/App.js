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
    this.state = {
      message: "",
    };
    this.props.fetchBlah();
    this.props.fetchWSClient();
    // setTimeout(() => {
    //   if (this.props.wsClient != null && this.props.wsClient.readyState === this.props.wsClient.OPEN) {
    //     var number = Math.round(Math.random() * 0xFFFFFF);
    //     this.props.wsClient.send(number.toString());
    //   }
    // }, 5000);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleMessageChange(e) {
    this.setState({message: e.target.value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.wsClient.send(this.state.message);
  }
  
  render() {
    // console.log(this.props.wsClient);
    return <div className="App">
        <div>
          {this.props.message}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="placeholder" 
            value={this.state.message}
            onChange={this.handleMessageChange}
          />
          
          <button>
            Submit
          </button>
          
        </form>
      </div>
      // <header className="App-header">
      // <img src={logo} className="App-logo" alt="logo" />
      // <p>
      // Welcome to <code>EffingVote</code>.
      // {this.props.blah}
      // </p>
      // </header>React.Component 
  }
}

const mapStateToProps = (state) => {
  return {
    blah: state.blah.blah,
    wsClient: state.blah.wsClient,
    message: state.blah.message,
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
