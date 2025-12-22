import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../slices/cartSlice';
import modalReducer from '../slices/modalSlice';
function createStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      modal : modalReducer,
    }, //state.cart를 cartReducer가 관리.
  });

  return store;
}

//싱글톤 패턴! (한 개의 인스턴스)
const store = createStore();
export default store;

//타입을 알 수 있게 함.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =  typeof store.dispatch;