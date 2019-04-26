import axios from 'axios';
import { UPDATE_DECK, DRAW, NEW_HAND, CALC_SCORE } from './actiontypes';

const deckSetter = deck => ({
  type: UPDATE_DECK,
  deck
});

export const newDeckGetter = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      );
      dispatch(deckSetter(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const newOrDrawSetter = (cards, pile, type) => ({
  type: type === 'new' ? NEW_HAND : DRAW,
  cards,
  pile
});

export const getCards = (pile, type) => {
  return async (dispatch, getState) => {
    try {
      const { deck } = await getState();
      const { data } = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=${type === 'new' ? 2 : 1}`
      );
      dispatch(newOrDrawSetter(data.cards, pile, type));
    } catch (err) {
      console.error(err);
    }
  };
};

const scoreSetter = scores => ({
  type: CALC_SCORE,
  scores
});

const calcValue = cards => {
  let total = 0;
  let aces = 0;
  cards.forEach(card => {
    let value = parseInt(card.value);
    if (isNaN(value)) {
      if (card.value === 'ACE') aces++;
      else total += 10;
    } else total += value;
  });
  while (aces) {
    if (total < 11) total += 11;
    else total++;
    aces--;
  }
  return total;
};

export const calcScores = () => {
  return async (dispatch, getState) => {
    try {
      const { cardHands } = await getState();

      const sums = {};
      Object.keys(cardHands).forEach(
        hand => (sums[hand] = calcValue(cardHands[hand]))
      );
      const maxValue = Math.max(...Object.values(sums).filter(sum => sum < 22));
      const minValue = Math.min(...Object.values(sums));
      
      const scores = {};
      Object.keys(sums).forEach(player => {
        if (sums[player] === maxValue) scores[player] = 2;
        else if (sums[player] < 22 && sums[player] !== minValue) scores[player] = 1;
      });
      
      dispatch(scoreSetter(scores));
    } catch (err) {
      console.error(err);
    }
  };
};
