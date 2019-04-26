import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { startNewGame } from './store';
import store from './store';

import { UI, Table } from './components';
import NewApp from './components/testdragndrop';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  async componentDidMount() {
    await this.props.startNewGame().then(() =>
      this.setState({
        loaded: true
      })
    );
  }

  render() {
    if (!this.state.loaded) return <h1>Loading...</h1>;
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startNewGame: () => dispatch(startNewGame())
  };
};

const ConnectedApp = connect(null, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <NewApp />
  </Provider>,
  document.getElementById('app')
);
