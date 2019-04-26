import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

const initialState = {
  id: '',
  cardsOnTable: {
    self: [],
    opp1: [],
    opp2: [],
    opp3: []
  },
  unaccountedFor: {
    ACE: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    JACK: 4,
    QUEEN: 4,
    KING: 4
  }
};

const UPDATE_DECK = 'UPDATE_DECK';
const NEW_HAND = 'NEW_HAND';
const DRAW = 'DRAW';

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
      const { id } = await getState();
      await axios.get(`https://deckofcardsapi.com/api/deck/${id}/shuffle/`);
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
      const { id } = await getState();
      const { data } = await axios.get(
        `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${number}`
      );
      dispatch(newOrDrawSetter(data.cards, pile, type));
    } catch (err) {
      console.error(err);
    }
  };
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DECK:
      return { ...initialState, id: action.deck.deck_id };
    case DRAW:
    case NEW_HAND:
      const newCardsOnTable = { ...state.cardsOnTable };
      const newUnaccountedFor = { ...state.unaccountedFor }
      action.type === DRAW
        ? newCardsOnTable[action.pile].push(...action.cards)
        : (newCardsOnTable[action.pile] = action.cards);
      action.cards.forEach(card => newUnaccountedFor[card.value]--);
      return {
        ...state,
        cardsOnTable: newCardsOnTable,
        unaccountedFor: newUnaccountedFor
      };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(deckReducer, middleware);

export default store;
