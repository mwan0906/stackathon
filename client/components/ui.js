import React from 'react';
import { connect } from 'react-redux';
import { startNewGame, endGame } from '../store';

const UI = props => {
  const end = props.phase === 'show' && props.round === 3;
  let message = 'You Lost...';
  if (end) {
    const scores = Object.values(props.scores);
    const max = Math.max(...scores);
    if (props.scores.self === max) {
      message = 'You Won!'
    }
  }
  return (
    <div id="ui">
      {end && (
        <div>
          <h1>{message}</h1>
          <br />
          <button type="button" onClick={props.startNewGame}>
            Shuffle Deck and Start Again
          </button>
          <br />
          <button type="button" onClick={props.endGame}>Back To Workshop</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    phase: state.play.game.phase,
    round: state.play.game.round,
    scores: state.play.game.scores
  };
};
const mapDispatchToProps = dispatch => {
  return {
    startNewGame: () => dispatch(startNewGame()),
    endGame: () => dispatch(endGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UI);
