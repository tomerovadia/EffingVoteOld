import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { fetchBlah, fetchSocketClient } from './actions/actions';
import { RECEIVE_MESSAGE } from './actions/actions.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      message: "",
    };
    
    this.props.fetchBlah();
    this.props.fetchSocketClient();
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleKeyPress(e) {
    if(e.keyCode === 13 && !e.shiftKey) {
      this.handleSubmit(e);
    }
  }
  
  handleMessageChange(e) {
    this.setState({message: e.target.value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.socketClient.emit('chat message', this.state.message);
    this.props.store.dispatch({
      type: RECEIVE_MESSAGE,
      message: this.state.message,
    });
    this.setState({message: ""});
  }
  
  render() {
    return <div className="main-chat">
        <div className="message-history">
          {this.props.messages}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-div">
            <textarea 
              className="main-chat-input"
              placeholder="How do I effin' vote?" 
              value={this.state.message}
              onChange={this.handleMessageChange}
              onKeyDown={this.handleKeyPress}
            />
          </div>
          <div className="button-div">
            <button>
              Send
            </button>
          </div>
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
    chat: state.chat.blah,
    socketClient: state.chat.socketClient,
    messages: state.chat.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlah: () => dispatch(fetchBlah()),
    fetchSocketClient: () => dispatch(fetchSocketClient()),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
