import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BookCover from '../../presentational/BookCover';
import Book from '../Book';

import { loginFB } from '../../../state/duck/user';
import { addTodo } from '../../../state/duck/todo';
import './style.scss';
import { request, baseURL } from '../../../state/util';





class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.boundActionCreators = bindActionCreators({
      loginFB, addTodo
    }, props.dispatch);
  }

  render() {
    const { user } = this.props;
    const { loginFB, addTodo } = this.boundActionCreators;
    const {  } = this.state;
    
    const isLogged = !!user;
    
    return (
      <div className="App">
        {isLogged ? <Book/> : <BookCover user={user} onLogin={loginFB}/> }
      </div>
    );
  }
}

const mapStateToProps = ({user, todo}) => ({
  user, todo
});

export default connect(mapStateToProps, null)(App);
