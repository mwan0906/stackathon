import { HIT, STAND, CHANGE_LOGIC, NEW_HAND } from '../actiontypes';

const intialState = {
  opp1: {
    rawLogic: `return 'stand';`,
    history: []
  },
  opp2: {
    rawLogic: `if ((( Math.floor(Math.random() * 6) + 1) < (6))) { return 'hit';} return 'stand';`,
    history: []
  },
  opp3: {
    rawLogic: `return 'hit';`,
    history: []
  },
  self: {
    rawLogic: `if (( hand.filter(card => card.value == 'ACE').length ==1)) { return 'hit'; } else {if (( handValue >16)) { return 'stand'; } else { return 'hit'; }} return 'hit';`,
    history: []
  }
};

export default (state = intialState, action) => {
  switch (action.type) {
    case NEW_HAND:
      return {
        ...state,
        opp1: { ...state.opp1, history: [] },
        opp2: { ...state.opp2, history: [] },
        opp3: { ...state.opp3, history: [] },
        self: { ...state.self, history: [] }
      };
    case HIT:
    case STAND:
      const newPlayer = { ...state[action.pile] };
      const newHistory = [...newPlayer.history];
      newHistory.unshift(action.type);
      newPlayer.history = newHistory;
      return { ...state, [action.pile]: newPlayer };
    case CHANGE_LOGIC:
      return { ...state, self: { ...state.self, rawLogic: action.newLogic } };
    default:
      return state;
  }
};
