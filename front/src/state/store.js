import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AppReducer from "./duck";

const persistConfig = {
  key: 'root',
  storage,
  writeFailHandler: (err, s, d) => {
    console.log(err, s, d);
    console.log('Error: too much image size');    
  }
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

export let store = createStore(persistedReducer, applyMiddleware(thunk, createLogger));
export let persistor = persistStore(store);