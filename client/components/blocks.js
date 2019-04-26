/* import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

let numBlocks = 0;

class Block extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(numBlocks)
    return (
      <Draggable draggableId={numBlocks} index={0}>
        <div className={this.props.type}>block</div>
      </Draggable>
    );
  }
}

export const IfBlock = () => {
  return <Block type="if" />;
};

export const MarioBlock = () => {
  return <Block type="mario" />;
};
 */