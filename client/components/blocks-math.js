import React from 'react';

const PlusBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        NUMBER
      </span>
      <b> + </b>
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
      <b> - </b>
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
      <b> x </b>
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
      <b> / </b>
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
    case 'MULT':
      return <MultBody {...props.block} />;
    case 'DIV':
      return <DivBody {...props.block} />;
  }
};
