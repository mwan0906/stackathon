import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import {
  ACTION,
  CONDITIONAL,
  COMPARISON,
  VALUE,
  MATH
} from '../store/work/blocktypes';

import MathBody from './blocks-math'

const Block = props => {
  if (props.topLevel) {
    return (
      <Draggable draggableId={props.blockId} index={props.index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <InnerBlock blockId={props.blockId} />
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <div>
        <InnerBlock blockId={props.blockId} />
      </div>
    );
  }
};

const DisconnectedInnerBlock = props => {
  const block = props.block;
  return (
    <div className={`${block.type} block`} id={props.blockId}>
      <h3>
        {block.subType}
      </h3>
      {block.type === MATH ? <MathBody block={block} /> :
      <div>what is even going on</div>}
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  return {
    block: state.work.currentBlocks[otherProps.blockId]
  };
};

const InnerBlock = connect(mapStateToProps)(DisconnectedInnerBlock);

export default Block;
