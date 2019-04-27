import { SELECT } from './actiontypes';

export const selectMaker = node => {
  return {
    type: SELECT,
    node
  };
};
