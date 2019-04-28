import React from 'react';
import ChildBlock from './childBlock';

const IfBody = props => {
  return (
    <div>
      <b>If </b>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="TRUE/FALSE"
      />
      <b> Then </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="ACTION"
      />
    </div>
  );
};

const IfElseBody = props => {
  return (
    <div>
      <b>If </b>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="TRUE/FALSE"
      />
      <b> Then </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="ACTION"
      />
      <b>, Otherwise </b>
      <ChildBlock
        seeking={`${props.id}-2`}
        childId={props.children[2]}
        type="ACTION"
      />
    </div>
  );
};

export default props => {
  switch (props.block.subType) {
    case 'IF-THEN':
      return <IfBody {...props.block} />;
    case 'IF-THEN-ELSE':
      return <IfElseBody {...props.block} />;
  }
  return <div>Oh god what happened</div>;
};
