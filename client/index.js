import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { Play, DisconnectedWork } from './components'

ReactDOM.render(
  <Provider store={store}>
    <DisconnectedWork />
  </Provider>,
  document.getElementById('app')
);
