import React from 'react';
import { connect } from 'react-redux';

const calcValue = cards => {
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

const table = props => {
  const cards = props.cards[props.player];
  const total = calcValue(cards);
  console.log('total for', props.player, ':', total);
  return (
    <div id={props.player} className="cardspread">
      {cards.map((card, index) => (
        <img
          key={card.code}
          src={
            props.player !== 'self' && index
              ? 'https://i.pinimg.com/236x/10/80/a4/1080a4bd1a33cec92019fab5efb3995d--card-deck-playing-cards.jpg'
              : card.image
          }
          className="card"
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cards: state.cardHands
  };
};

export default connect(mapStateToProps)(table);
