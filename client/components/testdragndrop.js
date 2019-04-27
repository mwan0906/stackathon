import React from 'react';
import Column from './testcolumn';
import { DragDropContext } from 'react-beautiful-dnd';

let numTasks = 0;

const initialData = {
  tasks: {},
  workspace: {
    id: 'column-1',
    title: 'WORKSPACE',
    taskIds: []
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
    this.reset = this.reset.bind(this);
    this.display = this.display.bind(this);
  }

  componentDidMount() {
    document.getElementById('workspace').addEventListener('click', e => {
      const selectedNode = document.querySelector('.selected');
      if (selectedNode) selectedNode.classList.remove('selected');
      const clickedNode = e.target;
      if (clickedNode.classList.contains('blank'))
        clickedNode.classList.add('selected');
    });
  }

  reset() {
    this.setState(initialData);
  }

  display() {
    this.state.workspace.taskIds.forEach(task =>
      console.log(this.state.tasks[task])
    );
  }

  newBlock() {
    const newTaskId = `task-${++numTasks}`;
    this.setState({
      tasks: {
        ...this.state.tasks,
        [newTaskId]: {
          id: newTaskId,
          content: 'AAAAAAAAAAAAAAAAAAAAAAAAAA'
        }
      },
      workspace: {
        ...this.state.workspace,
        taskIds: [...this.state.workspace.taskIds, newTaskId]
      }
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
    const { destination, source, draggableId } = result;
    if (destination && destination.index !== source.index) {
      const newWorkspace = { ...this.state.workspace };
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
    return (
      <React.Fragment>
        <button type="button" onClick={this.reset}>
          Reset
        </button>
        <button type="button" onClick={this.display}>
          Display
        </button>
        <button type="button" onClick={this.newBlock}>
          Make New Block
        </button>
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
        </div>
      </React.Fragment>
    );
  }
}
