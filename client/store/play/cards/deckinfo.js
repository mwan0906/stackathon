import { UPDATE_DECK, HIT, NEW_HAND, REVEAL } from '../actiontypes';

const deckInitializer = val => {
  const toReturn = {};
  ['ACE', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'JACK', 'QUEEN', 'KING'].forEach(
    suit => (toReturn[suit] = val)
  );
  return toReturn;
};

const initialState = {
  id: '',
  unaccountedFor: deckInitializer(4)
};

export default (state = initialState, action) => {
  const newUnaccountedFor = { ...state.unaccountedFor };
  switch (action.type) {
    case UPDATE_DECK:
      return { ...initialState, id: action.deck.deck_id };
    case NEW_HAND:
      if (action.pile !== 'self') {
        newUnaccountedFor[action.cards[0].value]--;
      };
    case HIT:
      if (action.pile === 'self') {
        action.cards.forEach(card => {
          newUnaccountedFor[card.value]--;
        });
      }
      return { ...state, unaccountedFor: newUnaccountedFor };
    case REVEAL:
      action.cards.forEach(card => {
        newUnaccountedFor[card.value]--;
      });
      return { ...state, unaccountedFor: newUnaccountedFor };
    default:
      return state;
  }
};
