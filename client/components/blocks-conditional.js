import React from 'react';

const IfBody = props => {
  return (
    <div>
      <b>If </b>
      <span className="blank" id={`${props.id}-0`}>
        TRUE/FALSE
      </span>
      <b> Then </b>
      <span className="blank" id={`${props.id}-1`}>
        ACTION
      </span>
    </div>
  );
};

const IfElseBody = props => {
  return (
    <div>
      <b>If </b>
      <span className="blank" id={`${props.id}-0`}>
        TRUE/FALSE
      </span>
      <b> Then </b>
      <span className="blank" id={`${props.id}-1`}>
        ACTION
      </span>
      <b> Otherwise </b>
      <span className="blank" id={`${props.id}-2`}>
        ACTION
      </span>
    </div>
  );
};

export default props => {
  switch (props.block.subType) {
    case 'IF':
      return <IfBody {...props.block} />;
    case 'IF-ELSE':
      return <IfElseBody {...props.block} />;
  }
  return <div>Oh god what happened</div>
};
