import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { UI, Table } from './components';
import NewApp from './components/testdragndrop';

const App = () => {
  return (
    <div id="center">
      <Table player="opp1" />
      <div id="centercolumn">
        <Table player="opp2" />
        <UI />
        <Table player="self" />
      </div>
      <Table player="opp3" />
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
