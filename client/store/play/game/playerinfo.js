import { HIT, STAND, CHANGE_LOGIC } from '../actiontypes';

const random = odds => odds > Math.random();

const intialState = {
  opp1: {
    rawLogic: '',
    logic: () => {
      return 'stand';
    },
    history: []
  },
  opp2: {
    rawLogic: '',
    logic: () => {
      return random(5 / 6) ? 'hit' : 'stand';
    },
    history: []
  },
  opp3: {
    rawLogic: '',
    logic: () => {
      return 'hit';
    },
    history: []
  },
  self: {
    rawLogic: `if (( hand.filter(card => card.value == 'ACE').length >0)) { 'hit';}if (( handValue >16)) { 'stand';} 'hit';`,
    logic: info => {
      const { deck, hand, handValue, otherCards, rawLogic } = info;
      const { seen, unaccountedFor } = deck;
      return eval(rawLogic) || 'hit';
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
    case CHANGE_LOGIC:
      return {...state, self: {...state.self, rawLogic: action.rawLogic}};
    default:
      return state;
  }
};
