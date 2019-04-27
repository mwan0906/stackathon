import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import {
  ACTION,
  CONDITIONAL,
  COMPARISON,
  CONJUNCTION,
  VALUE,
  MATH
} from '../store/work/blocktypes';

import ActionBody from './blocks-action';
import ConditionalBody from './blocks-conditional';
import ComparisonBody from './blocks-comparison';
import ConjunctionBody from './blocks-conjunction';
import MathBody from './blocks-math';
import ValueBody from './blocks-value';

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
      block.type === VALUE ? <ValueBody block={block} /> :
      block.type === CONJUNCTION ? <ConjunctionBody block={block} /> :
      block.type === CONDITIONAL ? <ConditionalBody block={block} /> :
      block.type === COMPARISON ? <ComparisonBody block={block} /> :
      block.type === ACTION ? <ActionBody block={block} /> :
      <div>This should not be showing up</div>}
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
