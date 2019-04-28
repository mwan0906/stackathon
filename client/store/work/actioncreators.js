import {
  SELECT,
  NEW_BLOCK,
  DELETE_BLOCK,
  MOVE_BLOCK,
  REJECT_SUBMIT
} from './actiontypes';

export const selectMaker = node => ({
  type: SELECT,
  node
});

export const newBlockMaker = (blockType, blockSubType) => ({
  type: NEW_BLOCK,
  blockType,
  blockSubType
});

export const deleteBlock = () => ({
  type: DELETE_BLOCK
});

export const moveBlock = result => {
  const { destination, source, draggableId } = result;
  return {
    type: MOVE_BLOCK,
    destination,
    source,
    draggableId
  };
};

export const rejectSubmit = () => ({
  type: REJECT_SUBMIT
});
