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
  seen: deckInitializer(0),
  unaccountedFor: deckInitializer(4)
};

export default (state = initialState, action) => {
  const newSeen = { ...state.seen };
  const newUnaccountedFor = { ...state.unaccountedFor };
  switch (action.type) {
    case UPDATE_DECK:
      return { ...initialState, id: action.deck.deck_id };
    case NEW_HAND:
      if (action.pile !== 'self') {
        newUnaccountedFor[action.cards[0].value]--;
        newSeen[action.cards[0].value]++;
      };
    case HIT:
      if (action.pile === 'self') {
        action.cards.forEach(card => {
          newUnaccountedFor[card.value]--;
          newSeen[card.value]++;
        });
      }
      return { ...state, seen: newSeen, unaccountedFor: newUnaccountedFor };
    case REVEAL:
      action.cards.forEach(card => {
        newUnaccountedFor[card.value]--;
        newSeen[card.value]++;
      });
      return { ...state, seen: newSeen, unaccountedFor: newUnaccountedFor };
    default:
      return state;
  }
};
