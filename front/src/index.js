import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './views/containers/App';
import App from './views/containers/App';
// import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './state/store';

// disable React Dev Tools
if(process.env.NODE_ENV === 'production'){
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
      for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? () => {} : null;
      }
  }
}

const wrapper = document.getElementById('root');



if(wrapper) {
  ReactDOM.render( 
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
    </Provider>,
  wrapper);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
