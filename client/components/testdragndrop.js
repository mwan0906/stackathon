import React from 'react';
import Column from './testcolumn';
import { DragDropContext } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'do this 1' },
    'task-2': { id: 'task-2', content: 'do this 2' },
    'task-3': { id: 'task-3', content: 'do this 3' },
    'task-4': { id: 'task-4', content: 'do this 4' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'to-do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'done',
      taskIds: []
    },
    trash: {
      id: 'trash',
      title: 'trash',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2', 'trash']
};

export default class NewApp extends React.Component {
  constructor() {
    super();
    this.state = initialData;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragUpdate = this.onDragUpdate.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.reset = this.reset.bind(this);
    this.displayDone = this.displayDone.bind(this);
  }

  reset() {
    this.setState(initialData);
  }

  displayDone() {
    console.log(document.getElementById('column-2').childNodes);
  }

  onDragStart(e) {
    //    console.log(e);
  }

  onDragUpdate(update) {
    //    console.log('dragged');
  }

  onDragEnd(result) {
    if (result.combine) {
      const { combine, source, draggableId } = result;
      console.log(combine.draggableId);
      const draggedInto = this.state.columns[combine.droppableId];
      console.log(draggedInto);
    } else {
      const { destination, source, draggableId } = result;
      if (
        destination &&
        (destination.droppableId !== source.droppableId ||
          destination.index !== source.index)
      ) {
        const sourceColumn = this.state.columns[source.droppableId];
        const destinationColumn = this.state.columns[destination.droppableId];

        const sourceNewTaskIds = Array.from(sourceColumn.taskIds);
        const destinationNewTaskIds =
          source.droppableId === destination.droppableId
            ? sourceNewTaskIds
            : Array.from(destinationColumn.taskIds);

        sourceNewTaskIds.splice(source.index, 1);
        destinationNewTaskIds.splice(destination.index, 0, draggableId);

        const sourceNewColumn = {
          ...sourceColumn,
          taskIds: sourceNewTaskIds
        };
        const destinationNewColumn = {
          ...destinationColumn,
          taskIds: destinationNewTaskIds
        };

        this.setState({
          columns: {
            ...this.state.columns,
            [sourceColumn.id]: sourceNewColumn,
            [destinationColumn.id]: destinationNewColumn,
            trash: { ...this.state.columns.trash, taskIds: [] }
          }
        });
      }
    }
  }

  render() {
    return (
      <div>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId]
            );
            return <Column key={columnId} column={column} tasks={tasks} />;
          })}
        </DragDropContext>
        <button type="button" onClick={this.reset}>
          Reset
        </button>
        <button type="button" onClick={this.displayDone}>
          Display done
        </button>
      </div>
    );
  }
}
