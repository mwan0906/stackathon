import { SELECT, NEW_BLOCK, DELETE_BLOCK, MOVE_BLOCK } from './actiontypes';

export const selectMaker = node => {
  return {
    type: SELECT,
    node
  };
};

export const newBlockMaker = (blockType, blockSubType) => {
  return {
    type: NEW_BLOCK,
    blockType,
    blockSubType
  };
};

export const deleteBlock = blockId => {
  return {
    type: DELETE_BLOCK,
    blockId
  }
}

export const moveBlock = result => {
  const { destination, source, draggableId } = result;
  return {
    type: MOVE_BLOCK,
    destination,
    source,
    draggableId
  };
};