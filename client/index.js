import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { Deck, Table } from './components';
import NewApp from './components/testdragndrop';

const App = () => {
  return (
    <div>
      <Deck />
      <Table />
    </div>
  );
};



ReactDOM.render(
  <Provider store={store}>
    <NewApp />
  </Provider>,
  document.getElementById('app')
);
