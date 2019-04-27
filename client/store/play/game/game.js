import { UPDATE_DECK, NEW_HAND, CALC_SCORE, REVEAL } from '../actiontypes';

const initialState = {
  phase: 'start',
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
      return initialState;
    case NEW_HAND:
      if (state.phase !== 'start') {
        return { ...state, round: state.round + 1, phase: 'start' };
      }
      return state;
    case CALC_SCORE:
      const newScores = { ...state.scores };
      Object.keys(action.scores).forEach(player => {
        newScores[player] += action.scores[player];
      });
      return { ...state, scores: newScores };
    case REVEAL:
      return {...state, phase: 'show'};
    default:
      return state;
  }
};
