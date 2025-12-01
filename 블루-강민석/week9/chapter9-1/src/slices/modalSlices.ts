// src/features/modal/modalSlice.ts

import { createSlice } from "@reduxjs/toolkit";

/**
 * ModalState: 모달이 열려 있는지를 관리하는 boolean state
 */
interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    /**
     * openModal(): 모달을 열기 위해 isOpen을 true로 변경
     */
    openModal(state) {
      state.isOpen = true;
    },
    /**
     * closeModal(): 모달을 닫기 위해 isOpen을 false로 변경
     */
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
