import { combineReducers } from 'redux';

import cardHandsReducer from './cards/cardhands';
import deckReducer from './cards/deckinfo';
import playerReducer from './game/playerinfo';
import gameReducer from './game/game';

const playReducer = combineReducers({
  cardHands: cardHandsReducer,
  deck: deckReducer,
  players: playerReducer,
  game: gameReducer
});

export default playReducer;