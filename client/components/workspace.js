/* import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { IfBlock, MarioBlock } from './blocks'

const initialWorkspace = {
  blockIds: ['0']
};

export default class Workspace extends React.Component {
  constructor() {
    super();
    this.state = initialWorkspace;
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    console.log('result:', result);
  }

  render() {
    return (
      <div id="workspace">
        <h1>Work Here!</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="workspace">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <IfBlock />
                <MarioBlock />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
 */