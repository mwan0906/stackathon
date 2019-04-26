import React from 'react';
import { connect } from 'react-redux';
import { newDeckGetter, getCards, calcScores } from '../store';

const disconnectedDeckDisplay = props => {
  return (
    <div id="ui">
      <button type="button" onClick={props.newDeck}>
        new deck
      </button>
      {props.id && (
        <React.Fragment>
          <button type="button" onClick={props.calcScores}>
            calculate scores
          </button>
          <br />
          {['self', 'opp1', 'opp2', 'opp3'].map(player => (
            <div key={player}>
              <button
                type="button"
                onClick={() => props.getCards(player, 'new')}
              >
                new hand for {player}
              </button>
              <button
                type="button"
                onClick={() => props.getCards(player, 'draw')}
              >
                draw card for {player}
              </button>
            </div>
          ))}
          <br />
          <button type='button'>
            Hit
          </button>
          <button type='button'>
            Stand
          </button>
        </React.Fragment>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    id: state.deck.id
  };
};
const mapDispatchToProps = dispatch => {
  return {
    newDeck: () => dispatch(newDeckGetter()),
    getCards: (pile, type) => dispatch(getCards(pile, type)),
    calcScores: () => dispatch(calcScores())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedDeckDisplay);
