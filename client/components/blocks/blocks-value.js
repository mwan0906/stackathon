import React from 'react';
import ChildBlock from './childBlock';

const NumberBody = props => {
  return (
    <div>
      <input type="number" id={`${props.id}-0`} defaultValue="0" />
    </div>
  );
};

const HandBody = props => {
  return (
    <div>
      <span id={`${props.id}-0`}><b>The Value of My Current Hand</b></span>
    </div>
  );
};

const NumberInBody = props => {
  return (
    <div>
      <select id={`${props.id}-0`}>
        {[
          'Aces',
          'Twos',
          'Threes',
          'Fours',
          'Fives',
          'Sixes',
          'Sevens',
          'Eights',
          'Nines',
          'Tens',
          'Jacks',
          'Queens',
          'Kings'
        ].map(suit => (
          <option key={suit} value={suit}>{suit}</option>
        ))}
      </select>
      <b> in </b>
      <select id={`${props.id}-1`}>
        {[
          'My Hand',
          "Opponent's Visible Cards",
          'The Deck',
          'All Cards Seen So Far'
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
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> and </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="NUMBER"
      />
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
