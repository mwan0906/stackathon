//import { combineReducers } from 'redux';
import { SELECT } from './actiontypes';

const ACTION = 'ACTION';
const CONDITIONAL = 'CONDITIONAL';
const COMPARISON = 'COMPARISON';
const VALUE = 'VALUE';
const MATH = 'MATH';
const blocksAccepted = {
    ACTION: [],
    CONDITIONAL: [ [COMPARISON], [ACTION, CONDITIONAL], [ACTION, CONDITIONAL] ],
    COMPARISON: [ [VALUE, MATH], [VALUE, MATH] ],
    VALUE: [],
    MATH: [ [VALUE, MATH], [VALUE, MATH] ]
};
const blockTypes = [ACTION, CONDITIONAL, COMPARISON, VALUE, MATH];

const initialState = {
  selectedId: '',
  availableBlockTypes: [ACTION, CONDITIONAL],
  currentBlocks: {},
  blockOrder: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
