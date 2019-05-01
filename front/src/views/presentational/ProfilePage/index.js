import React, { PureComponent } from 'react';
import './style.scss';
import Page from '../Page';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../../../state/duck/user';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    };

    this.boundActionCreators = bindActionCreators({
      setUser
    }, props.dispatch);
  }

  logout = () => {
    this.boundActionCreators.setUser(null);
  }

  render() {  
    const { user } = this.props;
    return (
      <Page className='profile_page'>
        <p className='page_title'>Profile</p>
        <p className='page_title'>{user.email}</p>

        <div className='center'>
          <button className='btn' onClick={this.logout}>Log out</button>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = ({user, todo}) => ({
  user
});

export default connect(mapStateToProps, null)(App);