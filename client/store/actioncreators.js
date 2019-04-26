import axios from 'axios';
import { UPDATE_DECK, HIT, NEW_HAND, CALC_SCORE, STAND } from './actiontypes';

const deckSetter = deck => ({
  type: UPDATE_DECK,
  deck
});

export const newDeckGetter = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      );
      dispatch(deckSetter(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const newOrDrawSetter = (cards, pile, type) => ({
  type: type === 'new' ? NEW_HAND : HIT,
  cards,
  pile
});

export const getCards = (pile, type) => {
  return async (dispatch, getState) => {
    try {
      const { deck } = await getState();
      const { data } = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=${
          type === 'new' ? 2 : 1
        }`
      );
      dispatch(newOrDrawSetter(data.cards, pile, type));
    } catch (err) {
      console.error(err);
    }
  };
};

export const startNewGame = () => {
  return async dispatch => {
    try {
      await dispatch(newDeckGetter()).then(() => dispatch(startNewRound()));
    } catch (err) {
      console.error(err);
    }
  };
};

export const startNewRound = () => {
  return async dispatch => {
    try {
      ['self', 'opp1', 'opp2', 'opp3'].forEach(player =>
        dispatch(getCards(player, 'new'))
      );
    } catch (err) {
      console.error(err);
    }
  };
};

const scoreSetter = scores => ({
  type: CALC_SCORE,
  scores
});

export const calcValue = cards => {
  let total = 0;
  let aces = 0;
  cards.forEach(card => {
    let value = parseInt(card.value);
    if (isNaN(value)) {
      if (card.value === 'ACE') aces++;
      else total += 10;
    } else total += value;
  });
  while (aces) {
    if (total < 11) total += 11;
    else total++;
    aces--;
  }
  return total;
};

export const calcScores = () => {
  return async (dispatch, getState) => {
    try {
      const { cardHands } = await getState();

      const sums = {};
      Object.keys(cardHands).forEach(
        hand => (sums[hand] = calcValue(cardHands[hand]))
      );
      const maxValue = Math.max(...Object.values(sums).filter(sum => sum < 22));
      const minValue = Math.min(...Object.values(sums));

      const scores = {};
      Object.keys(sums).forEach(player => {
        if (sums[player] === maxValue && maxValue !== 0) scores[player] = 2;
        else if (sums[player] < 22 && sums[player] !== minValue)
          scores[player] = 1;
      });

      dispatch(scoreSetter(scores));
    } catch (err) {
      console.error(err);
    }
  };
};

const standCreator = pile => ({
  type: STAND,
  pile
});

export const makeMove = () => {
  return async (dispatch, getState) => {
    try {
      const { players, cardHands, deck } = await getState();
      let hitPlayers = 0;
      Object.keys(players).forEach(player => {
        if (
          players[player].history[0] !== 'STAND' &&
          calcValue(cardHands[player]) < 21
        ) {
          const { logic } = players[player];

          const toGiveToFunction = {
            deck,
            hand: cardHands[player],
            otherCards: []
          };

          Object.keys(players).forEach(otherPlayer => {
            if (otherPlayer !== player)
              toGiveToFunction.otherCards.push(cardHands[otherPlayer][0]);
          });

          const result = logic(toGiveToFunction);
          if (result === 'hit') {
            hitPlayers++;
            dispatch(getCards(player, 'draw'));
          } else dispatch(standCreator(player));
        }
      });
      if (!hitPlayers) {
        dispatch(calcScores());
      }
    } catch (err) {
      console.error(err);
    }
  };
};
