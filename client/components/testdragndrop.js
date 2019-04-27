import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import Block from './blocks';
import { selectMaker, newBlockMaker, moveBlock } from '../store/work/actioncreators';


class NewApp extends React.Component {
  constructor() {
    super();
//    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    document
      .getElementById('workspace')
      .addEventListener('click', e => this.props.selectNode(e.target));
  }

  render() {
    return (
      <React.Fragment>
        <button type="button" onClick={this.props.newBlock}>
          Make New Block
        </button>

        <div id="workspace">
          <DragDropContext
            onDragEnd={this.props.onDragEnd}
          >
            <div id="work">
              <h1>WORKSPACE</h1>
              <Droppable droppableId="work">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {this.props.blockOrder.map((blockId, index) => (
                      <Block
                        key={blockId}
                        block={this.props.blocks[blockId]}
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
    availableBlockTypes: state.work.availableBlockTypes,
    blocks: state.work.currentBlocks,
    blockOrder: state.work.blockOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectNode: e => dispatch(selectMaker(e)),
    onDragEnd: result => dispatch(moveBlock(result)),
    newBlock: () => dispatch(newBlockMaker('ACTION'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewApp);
