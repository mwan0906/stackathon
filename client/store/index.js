import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

const initialState = {
  id: 'big test id',
  cardsLeft: 52,
  cardsOnTable: []
};

const UPDATE_DECK = 'UPDATE_DECK';
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
      const { data } = await axios.get(
        `https://deckofcardsapi.com/api/deck/${id}/shuffle/`
      );
      dispatch(deckSetter(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const drawnCardsSetter = (cards, remaining) => ({
  type: DRAW,
  cards,
  remaining
});

export const drawCards = number => {
  return async (dispatch, getState) => {
    try {
      const { id } = await getState();
      const { data } = await axios.get(
        `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${number}`
      );
      dispatch(drawnCardsSetter(data.cards, data.remaining));
    } catch (err) {
      console.error(err);
    }
  };
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DECK:
      return { ...initialState, id: action.deck.deck_id};
    case DRAW:
      return {
        ...state,
        cardsLeft: action.remaining,
        cardsOnTable: action.cards
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
