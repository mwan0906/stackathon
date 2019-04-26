import { UPDATE_DECK, NEW_HAND, HIT } from './actiontypes';

const initialState = {
  self: [],
  opp1: [],
  opp2: [],
  opp3: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DECK:
      return initialState
    case HIT:
    case NEW_HAND:
      const newCardsOnTable = { ...state };
      action.type === HIT
        ? newCardsOnTable[action.pile].push(action.cards[0])
        : newCardsOnTable[action.pile] = action.cards;
      return newCardsOnTable;
    default:
      return state;
  }
};
