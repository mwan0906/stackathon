import { NEW_HAND, DRAW } from './actiontypes';

const initialState = {
  self: [],
  opp1: [],
  opp2: [],
  opp3: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DRAW:
    case NEW_HAND:
      const newCardsOnTable = { ...state };
      action.type === DRAW
        ? newCardsOnTable[action.pile].push(...action.cards)
        : (newCardsOnTable[action.pile] = action.cards);
      return newCardsOnTable;
    default:
      return state;
  }
};
