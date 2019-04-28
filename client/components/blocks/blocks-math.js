import React from 'react';
import ChildBlock from './childBlock';

const PlusBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> plus </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="NUMBER"
      />
    </div>
  );
};

const MinusBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> minus </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="NUMBER"
      />
    </div>
  );
};

const MultBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> times </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="NUMBER"
      />
    </div>
  );
};

const DivBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> divided by </b>
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
    case 'PLUS':
      return <PlusBody {...props.block} />;
    case 'MINUS':
      return <MinusBody {...props.block} />;
    case 'MULTIPLY':
      return <MultBody {...props.block} />;
    case 'DIVIDE':
      return <DivBody {...props.block} />;
  }
  return <div>Oh god what happened</div>;
};
