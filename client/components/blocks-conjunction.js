import React from 'react';

const AndBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        TRUE/FALSE
      </span>
      <b> and </b>
      <span className="blank" id={`${props.id}-1`}>
        TRUE/FALSE
      </span>
    </div>
  );
};

const OrBody = props => {
  return (
    <div>
      <span className="blank" id={`${props.id}-0`}>
        TRUE/FALSE
      </span>
      <b> or </b>
      <span className="blank" id={`${props.id}-1`}>
        TRUE/FALSE
      </span>
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
  return <div>Oh god what happened</div>
};
