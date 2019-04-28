import { HIT, STAND, CHANGE_LOGIC } from '../actiontypes';

const random = odds => odds > Math.random();

const intialState = {
  opp1: {
    rawLogic: `'stand';`,
    history: []
  },
  opp2: {
    rawLogic: `if ((( Math.floor(Math.random() * 6) + 1) < (6))) { 'hit';} 'stand';`,
    history: []
  },
  opp3: {
    rawLogic: `'hit';`,
    history: []
  },
  self: {
    rawLogic: `if (( hand.filter(card => card.value == 'ACE').length >0)) { 'hit';}else {if (( handValue >16)) { 'stand';} else {'hit';}}`,
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
