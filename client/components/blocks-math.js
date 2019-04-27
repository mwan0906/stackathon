import React from 'react';

const PlusBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> plus </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
    </div>
  );
};

const MinusBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> minus </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
    </div>
  );
};

const MultBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> times </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
    </div>
  );
};

const DivBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> divided by </b>
      <span className="blank" id={`${props.id}-1`}>
        NUMBER
      </span>
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
  return <div>Oh god what happened</div>
};
