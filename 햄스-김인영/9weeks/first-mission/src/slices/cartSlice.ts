import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { cart } from "../types/cart";

export interface CartState {
  cartItems: cart[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
}

//cartSlice 생성
//createSlice -> RTK에서 제공
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //증가
    increase : (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id;
      //이 아이디로 전체 음반 중에서 내가 클릭한 음반 찾기.
      const item = state.cartItems.find((cartItems) => cartItems.id === itemId);

      if (item){
        item.amount += 1;
      }
    },

    //감소
    decrease : (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItems) => cartItems.id === itemId);

      if (item){
        item.amount -= 1;
      }
    },

    //removeItem
    removeItem : (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id;
      //이 아이디로 전체 음반 중에서 내가 클릭한 음반 찾기.
      state.cartItems = state.cartItems.filter((cartItems) => cartItems.id !== itemId);
    },

    //장바구니 비우기
    clearCart : (state) => {
      state.cartItems = [];
    },

    //total 총액 계산
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item => {
        amount += item.amount;
        total += item.amount * item.price;
      })
      )

      state.amount = amount;
      state.total = total;
    }
  }
})

export const {increase, decrease, clearCart, removeItem, calculateTotals} = cartSlice.actions;

//duck pattern reducer는 export default로 내보내기
const cartReducer = cartSlice.reducer;

export default cartReducer;