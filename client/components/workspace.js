import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import Block from './blocks';
import {
  selectMaker,
  moveBlock
} from '../store';

class Workspace extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    document
      .getElementsByClassName('workspace')[0]
      .addEventListener('click', e => this.props.selectNode(e.target));
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <div className="workspace">
          <h1>WORKSPACE</h1>
          <Droppable droppableId="work">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {this.props.blockOrder.map((blockId, index) => (
                  <Block
                    key={blockId}
                    blockId={blockId}
                    index={index}
                    topLevel={true}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    availableBlockTypes: state.work.availableBlockTypes,
    blockOrder: state.work.blockOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectNode: e => dispatch(selectMaker(e)),
    onDragEnd: result => dispatch(moveBlock(result))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
