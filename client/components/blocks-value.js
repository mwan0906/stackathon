import React from 'react';

const NumberBody = props => {
  return (
    <div>
      <input type="number" id={`${props.id}-0`} placeholder="0" />
    </div>
  );
};

const HandBody = props => {
  return (
    <div>
      <span id={`${props.id}-0`}><b>The Value of the Current Hand</b></span>
    </div>
  );
};

const NumberInBody = props => {
  return (
    <div>
      <select id={`${props.id}-0`}>
        {[
          'ACES',
          'ONES',
          'TWOS',
          'THREES',
          'FOURS',
          'FIVES',
          'SIXES',
          'SEVENS',
          'EIGHTS',
          'NINES',
          'TENS',
          'JACKS',
          'QUEENS',
          'KINGS'
        ].map(suit => (
          <option key={suit} value={suit}>{suit}</option>
        ))}
      </select>
      <b> in </b>
      <select id={`${props.id}-1`}>
        {[
          'MY HAND',
          "OPPONENTS' VISIBLE HANDS",
          'THE DECK',
          'ALL CARDS SO FAR'
        ].map(place => (
          <option key={place} value={place}>{place}</option>
        ))}
      </select>
    </div>
  );
};

const RandomBody = props => {
  return (
    <div>
      <b>A Random Whole Number Between </b>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> and </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
    </div>
  );
};

export default props => {
  switch (props.block.subType) {
    case 'NUMBER':
      return <NumberBody {...props.block} />;
    case 'HAND':
      return <HandBody {...props.block} />;
    case 'NUMBER-IN':
      return <NumberInBody {...props.block} />;
    case 'RANDOM':
      return <RandomBody {...props.block} />;
  }
  return <div>Oh god what happened</div>
};
