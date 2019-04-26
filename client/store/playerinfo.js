import { CALC_SCORE, HIT, STAND } from './actiontypes';

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
    logic: () => {
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
