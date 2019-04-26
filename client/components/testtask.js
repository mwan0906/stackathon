import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {provided => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div {...provided.dragHandleProps}>{this.props.task.content}</div>
            {this.props.task.children.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
          </div>
        )}
      </Draggable>
    );
  }
}
