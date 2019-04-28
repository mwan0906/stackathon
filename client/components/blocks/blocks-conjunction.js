import React from 'react';
import ChildBlock from './childBlock';

const AndBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="TRUE/FALSE"
      />
      <b> and </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="TRUE/FALSE"
      />
    </div>
  );
};

const OrBody = props => {
  return (
    <div>
      <ChildBlock
        seeking={`${props.id}-0`}
        childId={props.children[0]}
        type="TRUE/FALSE"
      />
      <b> or </b>
      <ChildBlock
        seeking={`${props.id}-1`}
        childId={props.children[1]}
        type="TRUE/FALSE"
      />
    </div>
  );
};

export default props => {
  switch (props.block.subType) {
    case 'AND':
      return <AndBody {...props.block} />;
    case 'OR':
      return <OrBody {...props.block} />;
  }
  return <div>Oh god what happened</div>;
};
