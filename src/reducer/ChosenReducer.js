import { ADD, UPDATE, UPDATE_WORK, VERIF } from "../action/types";

const initialState = [];
const ChosenReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIF:
      return (state = action.payload);
    case ADD:
      return state.concat(action.payload);
    case UPDATE:
      return state.map((el) => {
        return el.id === action.payload ? { ...el, visited: "Visiter" } : el;
      });
    case UPDATE_WORK:
      return state.map((el) => {
        console.log(action.payload.work.length);
        return el.id === action.payload.id
          ? el.medic && {
              ...el,
              work: action.payload.work,
              achivement: (action.payload.work.length / el.medic.length) * 100,
            }
          : el;
      });
    default:
      return state;
  }
};
export default ChosenReducer;
