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
      <React.Fragment>
        <div id="center">
          <Table player="opp1" />
          <div id="centercolumn">
            <Table player="opp2" />
            <UI />
            <Table player="self" />
          </div>
          <Table player="opp3" />
        </div>
        <div id="scoreboard">
          <h2>SCORES:</h2>
          <h3>You: {this.props.scores.self}</h3>
          <h3>Antsy Ally: {this.props.scores.opp1}</h3>
          <h3>Betting Billie: {this.props.scores.opp2}</h3>
          <h3>Carrie Careless: {this.props.scores.opp3}</h3>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    scores: state.play.game.scores,
    phase: state.play.game.phase
  };
};
const mapDispatchToProps = dispatch => {
  return {
    startNewGame: () => dispatch(startNewGame())
  };
};

const Play = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedPlay);

const Work = () => {
  return (
    <React.Fragment>
      <Workspace />
      <Menu />
    </React.Fragment>
  );
};

const App = props => {
  if (props.phase === 'working') return <Work />;
  return <Play />;
};
const mapStateToAppProps = state => {
  return {
    phase: state.play.game.phase
  };
};
export default connect(mapStateToAppProps)(App);
