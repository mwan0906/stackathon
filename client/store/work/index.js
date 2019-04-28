//import { combineReducers } from 'redux';
import { SELECT, NEW_BLOCK, DELETE_BLOCK, MOVE_BLOCK } from './actiontypes';
import {
  ACTION,
  CONDITIONAL,
  COMPARISON,
  CONJUNCTION,
  VALUE,
  MATH
} from './blocktypes';

const blocksAccepted = {
  ACTION: [],
  CONDITIONAL: [
    [COMPARISON, CONJUNCTION],
    [ACTION, CONDITIONAL],
    [ACTION, CONDITIONAL]
  ],
  COMPARISON: [[VALUE, MATH], [VALUE, MATH]],
  CONJUNCTION: [[COMPARISON], [COMPARISON]],
  VALUE: [[VALUE, MATH], [VALUE, MATH]],
  MATH: [[VALUE, MATH], [VALUE, MATH]],
  DEFAULT: [ACTION, CONDITIONAL]
};

const blockParent = element => {
  do {
    if (element.classList && element.classList.contains('block')) {
      return element;
    }
    element = element.parentNode;
  } while (element.tagName !== 'HTML');
  return '';
}

let numBlocks = 0;

const initialState = {
  selectedBlockId: '',
  selectedBlankId: '',
  availableBlockTypes: [ACTION, CONDITIONAL],
  currentBlocks: {},
  blockOrder: []
};

const reducer = (state = initialState, action) => {
  const newBlockOrder = [...state.blockOrder];

  switch (action.type) {
    case NEW_BLOCK:
      const newBlock = {
        type: action.blockType,
        subType: action.blockSubType,
        children: []
      };

      if (state.selectedBlankId) {
        // if the user is currently on a blank space
        newBlock.id = state.selectedBlankId;
        newBlock.parentId = state.selectedBlockId;
        const newParent = { ...state.currentBlocks[state.selectedBlockId] };
        const newSiblings = [...newParent.children];
        const childIndex = Number(newBlock.id.slice(-1));
        newSiblings[childIndex] = newBlock.id;
        newParent.children = newSiblings;
        return {
          ...state,
          currentBlocks: {
            ...state.currentBlocks,
            [newBlock.id]: newBlock,
            [newBlock.parentId]: newParent
          },
          selectedBlankId: '',
          selectedBlockId: ''
        };
      } else {
        newBlock.id = `-block${numBlocks++}`;
        return {
          ...state,
          currentBlocks: { ...state.currentBlocks, [newBlock.id]: newBlock },
          blockOrder: [...state.blockOrder, newBlock.id]
        };
      }

    case MOVE_BLOCK:
      if (
        action.destination &&
        action.destination.index !== action.source.index
      ) {
        newBlockOrder.splice(action.source.index, 1);
        newBlockOrder.splice(action.destination.index, 0, action.draggableId);
        return { ...state, blockOrder: newBlockOrder };
      }
      return state;

    case SELECT:
      const selectedNode = document.querySelector('.selected');
      if (selectedNode) selectedNode.classList.remove('selected');
      const clickedNode = action.node;
      let newSelectedBlockId = '';
      let newSelectedBlankId = '';
      let newAvailableBlockTypes = state.availableBlockTypes;

      if (clickedNode.classList && clickedNode.classList.contains('blank')) {
        // The user has selected a blank space, which should be highlighted
        // to indicate that it should be filled with a new block
        const grandparent = clickedNode.parentNode.parentNode;
        newSelectedBlockId = grandparent.id;
        newSelectedBlankId = clickedNode.id;
        clickedNode.classList.add('selected');

        const blankIndex = Number(newSelectedBlankId.slice(-1));
        newAvailableBlockTypes =
          blocksAccepted[grandparent.classList[0]][blankIndex];
      } else if (
        clickedNode.tagName !== 'SELECT' &&
        clickedNode.tagName !== 'INPUT'
      ) {
        const hasBlockParent = blockParent(clickedNode);
        if (hasBlockParent) {
          // The user selected a block, but not a blank space
          // The only option should be to ask if they want to delete it
          hasBlockParent.classList.add('selected');
          newSelectedBlockId = hasBlockParent.id;

          newAvailableBlockTypes = ['DELETE'];
        } // otherwise, nothing happened
      }

      if (newSelectedBlockId === '') {
        // if the user didn't select anything valid
        newAvailableBlockTypes = blocksAccepted.DEFAULT;
      }

      return {
        ...state,
        selectedBlockId: newSelectedBlockId,
        selectedBlankId: newSelectedBlankId,
        availableBlockTypes: newAvailableBlockTypes
      };

    case DELETE_BLOCK:
      const blockToBeDeleted = state.selectedBlockId;
      const newBlocks = {...state.currentBlocks};
      let newBlockOrder = [...state.blockOrder];
      let tbd = [ blockToBeDeleted ];
      let firstThrough = true;

      do {
        const newNode = { ...newBlocks[ tbd[0] ]};
        if (newNode.parentId && newBlocks[newNode.parentId]) {
          const newParent = {... newBlocks[newNode.parentId]};
          const deletedChildIndex = newParent.children.indexOf(newNode.id)
          newParent.children.splice(deletedChildIndex, 1);
          newBlocks[newNode.parentId] = newParent;
          firstThrough = false;
        }
        else if (firstThrough) {
          // it's our first runthrough but there's no parent,
          // which means this is a top level node! we need to remove it
          // from the draggable area!
          const deletedNodeIndex = newBlockOrder.indexOf(newNode.id);
          newBlockOrder.splice(deletedNodeIndex, 1);
          firstThrough = false;
        }
        tbd = tbd.concat(newNode.children);
        delete newBlocks[ tbd.shift() ]
      } while (tbd.length)

      return {
        ...state,
        currentBlocks: newBlocks,
        blockOrder: newBlockOrder,
        selectedBlockId: '',
        availableBlockTypes: blocksAccepted.DEFAULT
      }

    default:
      return state;
  }
};

export default reducer;
