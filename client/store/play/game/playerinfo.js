import { HIT, STAND } from '../actiontypes';
import { calcValue } from '../actioncreators'

const random = odds => odds > Math.random();

const intialState = {
  opp1: {
    logic: () => {
      return 'stand';
    },
    history: []
  },
  opp2: {
    logic: () => {
      return random(5 / 6) ? 'hit' : 'stand';
    },
    history: []
  },
  opp3: {
    logic: () => {
      return 'hit';
    },
    history: []
  },
  self: {
    logic: info => {
      console.log(info);
      const { deck, hand, otherCards } = info;
      const { seen, unaccountedFor } = deck;
      const handValue = calcValue(hand);
      if (handValue > 16) return 'stand'
      return 'hit';
    },
    history: []
  }
};

export default (state = intialState, action) => {
  switch (action.type) {
    case HIT:
    case STAND:
      const newPlayer = { ...state[action.pile] };
      const newHistory = [...newPlayer.history];
      newHistory.unshift(action.type);
      newPlayer.history = newHistory;
      return { ...state, [action.pile]: newPlayer };
    default:
      return state;
  }
};
