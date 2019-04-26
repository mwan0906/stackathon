import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import cardHandsReducer from './cardhands';
import deckReducer from './deckinfo';
import playerReducer from './playerinfo';

const reducer = combineReducers({
  cardHands: cardHandsReducer,
  deck: deckReducer,
  players: playerReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './actioncreators';