import axios from 'axios';
import { UPDATE_DECK, DRAW, NEW_HAND } from './actiontypes';

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

export const shuffleCards = () => {
  return async (dispatch, getState) => {
    try {
      const { deck } = await getState();
      await axios.get(`https://deckofcardsapi.com/api/deck/${deck.id}/shuffle/`);
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

export const getCards = (number, pile, type) => {
  return async (dispatch, getState) => {
    try {
      const { deck } = await getState();
      const { data } = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=${number}`
      );
      dispatch(newOrDrawSetter(data.cards, pile, type));
    } catch (err) {
      console.error(err);
    }
  };
};
