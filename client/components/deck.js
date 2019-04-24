import React from 'react';
import { connect } from 'react-redux';
import { newDeckGetter, shuffleCards, drawCards } from '../store';

const disconnectedDeckDisplay = props => {
  return (
    <div>
      <h1>{props.id}</h1>
      <h2>{props.cardsLeft} cards left</h2>
      <button type="button" onClick={props.newDeck}>
        new deck
      </button>
      <button type="button" onClick={props.shuffle}>
        shuffle existing deck
      </button>
      <br></br>
      <button type="button" onClick={() => props.draw(1)}>
        draw 1 card
      </button>
      <button type="button" onClick={() => props.draw(2)}>
        draw 2 cards
      </button>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    id: state.id,
    cardsLeft: state.cardsLeft
  };
};
const mapDispatchToProps = dispatch => {
  return {
    newDeck: () => dispatch(newDeckGetter()),
    shuffle: () => dispatch(shuffleCards()),
    draw: num => dispatch(drawCards(num))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedDeckDisplay);
