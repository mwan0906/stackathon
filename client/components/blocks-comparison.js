import React from 'react';

const EqualBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> equals </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
    </div>
  );
};

const NotEqualBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> does not equal </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
    </div>
  );
};

const GreaterBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> is greater than </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
    </div>
  );
};

const LessBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> is less than </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
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
