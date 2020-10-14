import { ADD, UPDATE, UPDATE_WORK, VERIF } from "./types";
export const add = (doctor) => {
  return {
    type: ADD,
    payload: doctor,
  };
};
export const update = (his) => {
  return {
    type: UPDATE,
    payload: his,
  };
};
export const updateWork = (his) => {
  return {
    type: UPDATE_WORK,
    payload: his,
  };
};
export const verif = (his) => {
  return {
    type: VERIF,
    payload: his,
  };
};
