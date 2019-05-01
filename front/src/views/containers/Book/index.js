import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoPage from '../../presentational/TodoPage';
import ProgramsPage from '../../presentational/ProgramsPage';
import ProfilePage from '../../presentational/ProfilePage';

import { addTodo } from '../../../state/duck/todo';
import './style.scss';


const Lines = () => (
  <React.Fragment>
    <div className="line hor"/>
    <div className="line hor"/>

    <div className="line ver"/>
    <div className="line ver"/>
  </React.Fragment>
);

const TabButton = ({title, selected, onClick}) => (
  <div className={`tab_btn ${selected ? 'selected': ''}`} onClick={onClick}>
    <span>{title}</span>
  </div>
);

const routes = [

];

class Book extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'plan'
    };

    this.boundActionCreators = bindActionCreators({
      addTodo
    }, props.dispatch);
  }

  onMenuClick = (page) => {
    this.setState({page})
  }

  render() {
    const { user } = this.props;
    // const { addTodo } = this.boundActionCreators;
    const { page } = this.state;
    
    
    return (
      <div className="book">
        <div className="book_pages">
          <Lines/>
          <header className="menu">
            <TabButton title='PLAN' selected={page === 'plan'} onClick={() => this.onMenuClick('plan')}/>
            <TabButton title='PROGRAMS' selected={page === 'programs'} onClick={() => this.onMenuClick('programs')}/>
            <TabButton title='PROFILE' selected={page === 'profile'} onClick={() => this.onMenuClick('profile')}/>
          </header>


          {page === 'plan' && <TodoPage/>}
          {page === 'programs' && <ProgramsPage/>}
          {page === 'profile' && <ProfilePage/>}

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({user, todo}) => ({
  user, todo
});

export default connect(mapStateToProps, null)(Book);
