const initialState = [
  { name: "mahdi", password: "mahdi" },
  { name: "admin", password: "admin" },
  { name: "", password: "" },
];
const FirstReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default FirstReducer;
