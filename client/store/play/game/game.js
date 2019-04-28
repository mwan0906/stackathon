import { UPDATE_DECK, NEW_HAND, HIT, CALC_SCORE, REVEAL, END_GAME, CHANGE_LOGIC } from '../actiontypes';

const initialState = {
  phase: 'working',
  round: 1,
  scores: {
    opp1: 0,
    opp2: 0,
    opp3: 0,
    self: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DECK:
      return { ...state, phase: 'start', round: 1 };
    case NEW_HAND:
      if (state.phase === 'show') {
        return { ...state, round: state.round + 1, phase: 'start' };
      }
      return state;
    case HIT:
      return { ...state, phase: 'playing' };
    case CALC_SCORE:
      const newScores = { ...state.scores };
      Object.keys(action.scores).forEach(player => {
        newScores[player] += action.scores[player];
      });
      return { ...state, scores: newScores };
    case REVEAL:
      return {...state, phase: 'show' };
    case END_GAME:
      return { ...state, phase: 'working' };
    case CHANGE_LOGIC:
      return { ...initialState, phase: 'start' };
    default:
      return state;
  }
};
