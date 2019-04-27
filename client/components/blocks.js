import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

let numBlocks = 0;

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
          <div>
            fjkskhes s hskjs
            <span className="blank">CLICK HERE TO DO A THING</span> gshhk gf
            khgd h jkfd khgkdgjherkgher
          </div>
        </div>
      )}
    </Draggable>
  );
};

const IfBlock = props => {
  return <Block />
}

export default Block;