import React from 'react';
import Column from './testcolumn';
import { DragDropContext } from 'react-beautiful-dnd';

let numTasks = 4;

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'do this 1', children: [] },
    'task-2': { id: 'task-2', content: 'do this 2', children: [] },
    'task-3': { id: 'task-3', content: 'do this 3', children: [] },
    'task-4': { id: 'task-4', content: 'do this 4', children: [] }
  },
  workspace: {
    id: 'column-1',
    title: 'to-do',
    taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
  }
};

export default class NewApp extends React.Component {
  constructor() {
    super();
    this.state = initialData;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragUpdate = this.onDragUpdate.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.newBlock = this.newBlock.bind(this);
  }

  componentDidMount() {
    document
      .getElementById('workspace')
      .addEventListener('click', e => console.log(e.target));
  }

  newBlock() {
    const newTaskId = `task-${++numTasks}`;
    this.setState({
      tasks: {
        ...this.state.tasks,
        [newTaskId]: {
          id: newTaskId,
          content: 'AAAAAAAAAAAAAAAAAAAAAAAAAA',
          children: []
        }
      },
      workspace: {...this.state.workspace,
      taskIds: [...this.state.workspace.taskIds, newTaskId]}
    });
    console.log(this.state);
  }

  onDragStart(e) {
    //    console.log(e);
  }

  onDragUpdate(update) {
    //    console.log('dragged');
  }

  onDragEnd(result) {
    console.log('result:', result);

    const { destination, source, draggableId } = result;
    if (destination && destination.index !== source.index) {
      
      const newWorkspace = {...this.state.workspace}
      const newTaskIds = Array.from(newWorkspace.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      this.setState({
        workspace: {
          ...this.state.workspace,
          taskIds: newTaskIds
        }
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div id="workspace">
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <Column
            key="column-1"
            column={this.state.workspace}
            tasks={this.state.workspace.taskIds.map(
              taskId => this.state.tasks[taskId]
            )}
          />
        </DragDropContext>
        <button type="button" onClick={this.reset}>
          Reset
        </button>
        <button type="button" onClick={this.newBlock}>Make New Block</button>
      </div>
    );
  }
}
