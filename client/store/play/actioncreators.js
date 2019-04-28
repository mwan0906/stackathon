import axios from 'axios';
import {
  UPDATE_DECK,
  HIT,
  NEW_HAND,
  CALC_SCORE,
  STAND,
  REVEAL,
  CHANGE_LOGIC
} from './actiontypes';

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
      const { play } = await getState();
      const { data } = await axios.get(
        `https://deckofcardsapi.com/api/deck/${play.deck.id}/draw/?count=${
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
  let handValue = 0;
  let aces = 0;
  cards.forEach(card => {
    let value = parseInt(card.value);
    if (isNaN(value)) {
      if (card.value === 'ACE') aces++;
      else handValue += 10;
    } else handValue += value;
  });
  let withoutAces = handValue;
  while (aces) {
    if (handValue < 11) handValue += 11;
    else handValue++;
    aces--;
  }
  return { handValue, withoutAces };
};

export const calcScores = () => {
  return async (dispatch, getState) => {
    try {
      const { play } = await getState();
      const { cardHands } = play;

      const sums = {};
      Object.keys(cardHands).forEach(
        hand => (sums[hand] = calcValue(cardHands[hand]).handValue)
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

const reveal = cards => ({
  type: REVEAL,
  cards
});

export const makeMove = () => {
  return async (dispatch, getState) => {
    try {
      const { play } = await getState();
      const { players, cardHands, deck } = play;
      let hitPlayers = 0;
      Object.keys(players).forEach(player => {
        const hand = cardHands[player];
        const { handValue, withoutAces } = calcValue(hand);
        if (players[player].history[0] !== 'STAND' && handValue < 21) {
          const { rawLogic } = players[player];
          const { unaccountedFor } = deck;

          let otherCards = [];
          Object.keys(players).forEach(otherPlayer => {
            if (otherPlayer !== player)
              otherCards.push(cardHands[otherPlayer][0]);
          });

          const result = eval(rawLogic);
          if (result === 'hit') {
            hitPlayers++;
            dispatch(getCards(player, 'draw'));
          } else dispatch(standCreator(player));
        }
      });
      if (!hitPlayers) {
        dispatch(
          reveal([
            ...cardHands.opp1.slice(1),
            ...cardHands.opp2.slice(1),
            ...cardHands.opp3.slice(1)
          ])
        );
        dispatch(calcScores());
      }
    } catch (err) {
      console.error(err);
    }
  };
};

const logicChanger = newLogic => {
  return {
    type: CHANGE_LOGIC,
    newLogic
  };
};
