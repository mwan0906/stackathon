//import { combineReducers } from 'redux';
import { SELECT, NEW_BLOCK, DELETE_BLOCK, MOVE_BLOCK } from './actiontypes';

const ACTION = 'ACTION';
const CONDITIONAL = 'CONDITIONAL';
const COMPARISON = 'COMPARISON';
const VALUE = 'VALUE';
const MATH = 'MATH';

const blocksAccepted = {
  ACTION: [],
  CONDITIONAL: [[COMPARISON], [ACTION, CONDITIONAL], [ACTION, CONDITIONAL]],
  COMPARISON: [[VALUE, MATH], [VALUE, MATH]],
  VALUE: [],
  MATH: [[VALUE, MATH], [VALUE, MATH]]
};
const blockTypes = [ACTION, CONDITIONAL, COMPARISON, VALUE, MATH];

let numBlocks = 0;

const initialState = {
  selectedId: '',
  availableBlockTypes: [ACTION, CONDITIONAL],
  currentBlocks: {},
  blockOrder: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_BLOCK:
      const newBlockId = `block-${++numBlocks}`;
      const newBlock = { id: newBlockId, content: 'AAAAAAAAAAAAAAA' };
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
        const newBlockOrder = [...state.blockOrder];

        newBlockOrder.splice(action.source.index, 1);
        newBlockOrder.splice(action.destination.index, 0, action.draggableId);
        return { ...state, blockOrder: newBlockOrder };
      }
      return state;
    case SELECT:
      const selectedNode = document.querySelector('.selected');
      if (selectedNode) selectedNode.classList.remove('selected');
      const clickedNode = action.node;
      let newSelectedId = '';
      if (clickedNode.classList.contains('blank')) {
        newSelectedId = clickedNode.parentNode.parentNode.id;
        clickedNode.classList.add('selected');
      }
      return { ...state, selectedId: newSelectedId };
    default:
      return state;
  }
};

export default reducer;
