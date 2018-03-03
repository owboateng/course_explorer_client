import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import App from '../components/app';
import rootReducer from '../reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  let store = compose( 
    applyMiddleware(thunk)
  )(createStore)(persistedReducer);
  let persistor = persistStore(store)
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
   div
  );
  ReactDOM.unmountComponentAtNode(div);
});
