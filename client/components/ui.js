import React from 'react';
import { connect } from 'react-redux';
import { newDeckGetter, shuffleCards, getCards, calcScores } from '../store';

const disconnectedDeckDisplay = props => {
  return (
    <div id="ui">
      <button type="button" onClick={props.newDeck}>
        new deck
      </button>
      {props.id && (
        <React.Fragment>
          <button type="button" onClick={props.shuffle}>
            shuffle existing deck
          </button>
          <button type="button" onClick={props.calcScores}>
            calculate scores
          </button>
          <br />
          {['self', 'opp1', 'opp2', 'opp3'].map(player => (
            <div key={player}>
              <button
                type="button"
                onClick={() => props.getCards(2, player, 'new')}
              >
                new hand for {player}
              </button>
              <button
                type="button"
                onClick={() => props.getCards(1, player, 'draw')}
              >
                draw card for {player}
              </button>
            </div>
          ))}
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
    shuffle: () => dispatch(shuffleCards()),
    getCards: (num, pile, type) => dispatch(getCards(num, pile, type)),
    calcScores: () => dispatch(calcScores())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedDeckDisplay);
