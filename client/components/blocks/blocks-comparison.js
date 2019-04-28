import React from 'react';
import ChildBlock from './childBlock';

const EqualBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> equals </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="NUMBER"
      />
    </div>
  );
};

const NotEqualBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> does not equal </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="NUMBER"
      />
    </div>
  );
};

const GreaterBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> is greater than </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="NUMBER"
      />
    </div>
  );
};

const LessBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="NUMBER"
      />
      <b> is less than </b>
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
    case 'EQUAL':
      return <EqualBody {...props.block} />;
    case 'NOT-EQUAL':
      return <NotEqualBody {...props.block} />;
    case 'GREATER-THAN':
      return <GreaterBody {...props.block} />;
    case 'LESS-THAN':
      return <LessBody {...props.block} />;
  }
  return <div>Oh god what happened</div>
};
