import React from 'react';
import { connect } from 'react-redux';

const table = props => {
  const cards = props.cards[props.player];
  return (
    <div id={props.player} className="cardspread">
      {cards.map((card, index) => (
        <img
          key={card.code}
          src={
            props.player !== 'self' && index && !(props.phase === 'show')
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
    cards: state.cardHands,
    phase: state.game.phase
  };
};

export default connect(mapStateToProps)(table);
