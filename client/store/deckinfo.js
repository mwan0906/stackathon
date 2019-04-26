import { UPDATE_DECK, DRAW, NEW_HAND } from './actiontypes';

const initialState = {
  id: '',
  phase: 'start',
  unaccountedFor: {
    ACE: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    JACK: 4,
    QUEEN: 4,
    KING: 4
  }
};

export default (state = initialState, action) => {
  const newUnaccountedFor = { ...state.unaccountedFor };
  switch (action.type) {
    case UPDATE_DECK:
      return { ...initialState, id: action.deck.deck_id };
    case NEW_HAND:
      if (action.pile !== 'self') newUnaccountedFor[action.cards[0].value]--;
    case DRAW:
      if (action.pile === 'self') {
        action.cards.forEach(card => newUnaccountedFor[card.value]--);
      }
      return { ...state, unaccountedFor: newUnaccountedFor };
    default:
      return state;
  }
};
