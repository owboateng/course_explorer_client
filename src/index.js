import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

import './styles/index.css';

const store = compose( 
                      applyMiddleware(thunk)
                    )(createStore)(rootReducer);
class AppProvider extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<AppProvider />, document.getElementById('root'));
registerServiceWorker();
