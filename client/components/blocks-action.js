import React from 'react';

const HitBody = () => {
  return (
    <div>
      <b>Draw Another Card</b>
    </div>
  );
};

const StandBody = () => {
  return (
    <div>
      <b>Stop Drawing</b>
    </div>
  );
};

export default props => {
  switch (props.block.subType) {
    case 'HIT':
      return <HitBody {...props.block} />;
    case 'STAND':
      return <StandBody {...props.block} />;
  }
  return <div>Oh god what happened</div>
};
