import React, { Component } from 'react';
import './app.scss';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


// import logo from './logo.svg';
{/* <img src={logo} className="App-logo" alt="logo" /> */}

class App extends Component {

  render() {

    const responseFacebook = (response) => {
      console.log(response);
    }

    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

      <FacebookLogin
        appId="348150532504511" //APP ID NOT CREATED YET
        fields="name,email,picture"
        scope="public_profile,email"
        callback={responseFacebook}
      />
      <br />
      <br />


      {/* <GoogleLogin
        clientId="975611854006-tg4frfb0bke2v4v2ss5p51mev51rngdg.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      /> */}

      </div>
    );
  }
}

export default App;



// import { FacebookProvider, LoginButton } from 'react-facebook';
 
// export default class Example extends Component {
//   handleResponse = (data) => {
//     console.log(data);
//   }
 
//   handleError = (error) => {
//     this.setState({ error });
//   }
 
//   render() {
//     return (
//       <FacebookProvider appId="348150532504511">
//         <LoginButton
//           scope="email,public_profile,user_friends"
//           onCompleted={this.handleResponse}
//           onError={this.handleError}
//         >
//           <span>Login via Facebook</span>
//         </LoginButton>
//       </FacebookProvider>
//     );
//   }
// }