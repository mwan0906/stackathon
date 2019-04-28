import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { Play, Work } from './components'

ReactDOM.render(
  <Provider store={store}>
    <Play />
  </Provider>,
  document.getElementById('app')
);
