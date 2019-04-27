import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
//import Task from './testtask';
import Block from './blocks';
import { selectMaker } from '../store/work/actioncreators';

let numBlocks = 0;

const initialData = {
  blocks: {},
  blockIds: []
};

class NewApp extends React.Component {
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
    document
      .getElementById('workspace')
      .addEventListener('click', e => this.props.selectNode(e.target));
  }

  reset() {
    this.setState(initialData);
  }

  display() {
    this.state.blockIds.forEach(block => console.log(this.state.blocks[block]));
  }

  newBlock() {
    const newBlockId = `block-${++numBlocks}`;
    this.setState({
      blocks: {
        ...this.state.blocks,
        [newBlockId]: {
          id: newBlockId,
          content: 'AAAAAAAAAAAAAAAAAAAAAAAAAA'
        }
      },
      blockIds: [...this.state.blockIds, newBlockId]
    });
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
      const newBlockIds = [...this.state.blockIds];

      newBlockIds.splice(source.index, 1);
      newBlockIds.splice(destination.index, 0, draggableId);

      this.setState({
        blockIds: newBlockIds
      });
      console.log(this.state);
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
            <div id="work">
              <h1>WORKSPACE</h1>
              <Droppable droppableId="work">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {this.state.blockIds.map((blockId, index) => (
                      <Block
                        key={blockId}
                        block={this.state.blocks[blockId]}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedId: state.work.selectedId,
    availableBlockTypes: state.work.availableBlockTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectNode: e => dispatch(selectMaker(e))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewApp);
