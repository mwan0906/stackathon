import { CALC_SCORE } from './actiontypes';

const intialState = {
  opp1: {
    score: 0,
    logic: () => {
      return 'hit';
    }
  },
  opp2: {
    score: 0,
    logic: () => {
      return 'hit';
    }
  },
  opp3: {
    score: 0,
    logic: () => {
      return 'hit';
    }
  },
  self: {
    score: 0,
    logic: () => {
      return 'hit';
    }
  }
};

export default (state = intialState, action) => {
  switch (action.type) {
    case CALC_SCORE:
      const newScores = { ...state };
      Object.keys(action.scores).forEach(player => {
        const newPlayer = { ...newScores[player] };
        newPlayer.score += action.scores[player];
        newScores[player] = newPlayer;
      });
      return newScores;

    default:
      return state;
  }
};
