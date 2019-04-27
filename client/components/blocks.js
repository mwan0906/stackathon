import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  ACTION,
  CONDITIONAL,
  COMPARISON,
  VALUE,
  MATH
} from '../store/work/blocktypes';

const Block = props => {
  const block = props.block;
  return (
    <Draggable draggableId={block.id} index={props.index}>
      {provided => (
        <div {...provided.draggableProps} ref={provided.innerRef} id={block.id}>
          <b {...provided.dragHandleProps}>
            {block.content}
            {block.id}
          </b>
          {block.type === ACTION && <ActionBlock block={block} />}
        </div>
      )}
    </Draggable>
  );
};

const ActionBlock = props => {
  const block = props.block;
  return (
    <div className={ACTION}>
      Hit or Miss
      {block.children[0] || <span className="blank">?????</span>}
      Guess They Never Miss Huh
    </div>
  );
};

export default Block;
