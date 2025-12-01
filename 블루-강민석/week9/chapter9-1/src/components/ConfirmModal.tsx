// src/features/modal/ConfirmModal.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { clearCart } from "../slices/cartSlices";
import { closeModal } from "../slices/modalSlices";

export default function ConfirmModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    // 배경 오버레이
    <div
      className="
        fixed inset-0 z-50 
        flex items-center justify-center 
        bg-black/50               /* 검정 50% 반투명 */
        backdrop-blur-sm          /* 뒤에 콘텐츠를 약하게 블러 처리 */
      "
    >
      {/* 모달 박스 */}
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-center text-lg font-semibold mb-4">
          정말 삭제하시겠습니까?
        </h2>
        <div className="flex justify-center gap-4">
          {/* 아니요 버튼 */}
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          >
            아니요
          </button>
          {/* 네 버튼 */}
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
