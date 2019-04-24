import React from 'react';
import { connect } from 'react-redux';

const table = props => {
  return (
    <div id='table'>
      {props.cardsOnTable.map(card => (
        <div key={card.code}>
          <img src={card.image} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cardsOnTable: state.cardsOnTable
  };
};

export default connect(mapStateToProps)(table);
