import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

export interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,

    openModal: () =>
      set((state) => {
        state.isOpen = true;
      }),

    closeModal: () =>
      set((state) => {
        state.isOpen = false;
      }),
  }))
);

export const useModalInfo = () => useModalStore(
  useShallow((state) => ({
    isOpen: state.isOpen,
    openModal: state.openModal,
    closeModal: state.closeModal,

  }))
);