import { useCartAction, useCartInfo } from "../hooks/useCartStore";
import { useModalInfo } from "../hooks/useModalStore";
import { Modal } from "./Modal";

export const ClearList = () => {
  const {total} = useCartInfo();
  const {clearCart} = useCartAction();
  const {isOpen, closeModal, openModal} = useModalInfo();

  const handleClearList = () => {
    clearCart();
    closeModal();
  }

  const handleOpen = () => {
    openModal();
  }
  const handleClose = () => {
    closeModal();
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex justify-between items-center w-210">
          <button
            onClick={handleOpen}
            className="bg-gray-200 hover:bg-gray-300 font-semibold px-5 py-3 rounded-sm m-4">장바구니 비우기</button>
          <div className="m-4">{total}원</div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        onClearList={handleClearList}
      />
    </>
  )
}
