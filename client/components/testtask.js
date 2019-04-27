import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component {
  constructor() {
    super();
  }

  render() {
    const task = this.props.task;
    return (
      <Draggable draggableId={task.id} index={this.props.index}>
        {provided => (
          <div {...provided.draggableProps} ref={provided.innerRef} id={task.id}>
            <b {...provided.dragHandleProps}>
              {task.content}{task.id}
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
  }
}
