import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './testtask';

export default class Column extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.column.title}</h1>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
