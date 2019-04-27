import React from 'react';
import { connect } from 'react-redux';
import { makeMove, startNewRound } from '../store';

const ui = props => {
  return (
    <div id="ui">
      <button
        type="button"
        onClick={() => {
          if (props.phase === 'show') {
            if (props.round === 3) {
              alert('Game done!');
            } else props.startNewRound();
          } else props.makeMove();
        }}
      >
        Next
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    id: state.play.deck.id,
    players: state.play.players,
    phase: state.play.game.phase,
    round: state.play.game.round
  };
};
const mapDispatchToProps = dispatch => {
  return {
    makeMove: () => dispatch(makeMove()),
    startNewRound: () => dispatch(startNewRound())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ui);
