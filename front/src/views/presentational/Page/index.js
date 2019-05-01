import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import './style.scss';

class Page extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    };
  }

  render() {
    const { user, className, title } = this.props;

    return (
      <div className={`page ${className ? className : ''}`}>
        <header className="page_header">
          <p className='page_title'>{title}</p>

          <aside className="user" onClick={() => {}}>
            <span className="name">{user.name}</span>
            <div className="avatar" style={{backgroundImage: `url(${user.avatar})`}}></div>

          </aside>
        </header>
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps = ({user}) => ({
  user
});

export default connect(mapStateToProps, null)(Page);