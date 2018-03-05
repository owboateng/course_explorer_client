import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from '../components/app';
import rootReducer from '../reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  let store = compose( 
    applyMiddleware(thunk)
  )(createStore)(rootReducer);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
   div
  );
  ReactDOM.unmountComponentAtNode(div);
});
