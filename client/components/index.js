import React from 'react';
import { connect } from 'react-redux';
import UI from './ui';
import Table from './table';
import Menu from './blockMenu';
import Workspace from './workspace';
import { startNewGame } from '../store';

class DisconnectedPlay extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.startNewGame();
  }

  render() {
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

export const Play = connect(
  null,
  mapDispatchToProps
)(DisconnectedPlay);

class DisconnectedWork extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <Workspace />
        <Menu />
      </React.Fragment>
    );
  }
}

export { DisconnectedWork };
