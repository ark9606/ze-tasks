import React, { PureComponent } from 'react';
import FacebookLogin from 'react-facebook-login';

import './style.scss';

const FBIcon = () => (<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="430.113px" height="430.114px" viewBox="0 0 430.113 430.114" style={{"enableBackground": "new 0 0 430.113 430.114"}}>
  <g>
    <path id="Facebook" d="M158.081,83.3c0,10.839,0,59.218,0,59.218h-43.385v72.412h43.385v215.183h89.122V214.936h59.805
    c0,0,5.601-34.721,8.316-72.685c-7.784,0-67.784,0-67.784,0s0-42.127,0-49.511c0-7.4,9.717-17.354,19.321-17.354
    c9.586,0,29.818,0,48.557,0c0-9.859,0-43.924,0-75.385c-25.016,0-53.476,0-66.021,0C155.878-0.004,158.081,72.48,158.081,83.3z"/>
  </g>
</svg>);


const Row = ({children, className, ...props}) => (<div className={`row ${className}`} {...props}>{children}</div>);

export default class BookCover extends PureComponent {

  state = {
    user: null
  };

  responseFacebook = (userData) => {
    console.log(userData);

    this.setState({user: userData});
    // this.props.onLogin(userData)
  }

  onOpen = () => {
    this.props.onLogin(this.state.user);
  }


  render() {

    const { user } = this.state;

    return (
      <div className="book_cover">

        
        <Row>
          <h1>DAIRY</h1>
        </Row>

        <Row className="user">
          <span className="title">property of</span>  
          <span className="name">{user ? user.name : ''}</span>
        </Row>
        
        <Row className="login">


          <div className="fb_btn_container">
            { !user && <FBIcon/>}
            { !user && <FacebookLogin
              appId="348150532504511"
              fields="name,email,picture"
              scope="public_profile,email"
              cssClass="fb_btn"
              textButton='Login'
              callback={this.responseFacebook}
            />}

            { user && <div className="fb_btn" onClick={this.onOpen}>Open</div>}
          </div>
          <span className="">Ze 1 0 1 KR</span>

        </Row>
        
        {/* <Row>
          <span className="">Ze 1 0 1 KR</span>
        </Row> */}
      </div>
    );
  }
}
