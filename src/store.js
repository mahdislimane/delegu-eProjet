import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";

const something = (store) => (next) => (action) => {
  // console.log(action, store.getState());
  next(action);
  // console.log(action, store.getState());
};

const Store = createStore(
  rootReducer,
  compose(
    applyMiddleware(something),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default Store;
