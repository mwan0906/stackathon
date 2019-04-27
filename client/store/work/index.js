//import { combineReducers } from 'redux';
import { SELECT, NEW_BLOCK, DELETE_BLOCK, MOVE_BLOCK } from './actiontypes';
import { ACTION, CONDITIONAL, COMPARISON, CONJUNCTION, VALUE, MATH } from './blocktypes';

const blocksAccepted = {
  ACTION: [],
  CONDITIONAL: [[COMPARISON], [ACTION, CONDITIONAL], [ACTION, CONDITIONAL]],
  COMPARISON: [[VALUE, MATH], [VALUE, MATH]],
  CONJUNCTION: [[COMPARISON], [COMPARISON]],
  VALUE: [],
  MATH: [[VALUE, MATH], [VALUE, MATH]],
  DEFAULT: [ACTION, CONDITIONAL]
};

function blockParent(element) {
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
      const parentId =
        state.selectedBlankId && state.currentBlocks[state.selectedBlockId]
          ? state.selectedBlockId
          : null;
      const newBlockId =
        state.selectedBlankId || `-block${numBlocks++}`;
      const newBlock = {
        id: newBlockId,
        type: action.blockType,
        subType: action.blockSubType,
        children: [],
        parentId
      };

      return {
        ...state,
        currentBlocks: { ...state.currentBlocks, [newBlockId]: newBlock },
        blockOrder: [...state.blockOrder, newBlockId]
      };

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

        newAvailableBlockTypes = blocksAccepted[grandparent.classList[0]];
      }
      
      else {
        const hasBlockParent = blockParent(clickedNode);
        if (hasBlockParent) {
          // The user selected a block, but not a blank space
          // The only option should be to ask if they want to delete it
          hasBlockParent.classList.add('selected');
          newSelectedBlockId = hasBlockParent.id;

          newAvailableBlockTypes = ['DELETE'];
        } // otherwise, nothing happened
      }

      if (newSelectedBlockId === '') { // if the user didn't select anything valid
        newAvailableBlockTypes = blocksAccepted.DEFAULT;
      }

      return {
        ...state,
        selectedBlockId: newSelectedBlockId,
        selectedBlankId: newSelectedBlankId,
        availableBlockTypes: newAvailableBlockTypes
      };
    default:
      return state;
  }
};

export default reducer;
