// 引入reducer到store，並讓之後app進入點可以引入這個store connects the reducer to the store
// 引入reducer
import reducer from "./reducer";
import { legacy_createStore as createStore } from "redux";

export default function configureStore() {
  // 利用createStore創建store
  let store = createStore(reducer);
  return store;
}
