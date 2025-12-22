import { useDispatch, useSelector } from "../hooks/useAppDispatch"
import { clearCart } from "../slices/cartSlice";
import { closeModal, openModal } from "../slices/modalSlice";
import { Modal } from "./Modal";

export const ClearList = () => {
  const {total} = useSelector((state) => state.cart);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleClearList = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  }

  const handleOpen = () => {
    dispatch(openModal());
  }
  const handleClose = () => {
    dispatch(closeModal());
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
