type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onClearList: () => void;
};

export const Modal = ({isOpen, onClose, onClearList} : ModalProps) => {
  return (
    <>
      {
        isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative z-10 w-90 rounded bg-white p-6 shadow-lg">
              <h2 className="text-lg font-bold mb-2">확인</h2>
              <p className="text-gray-600 mb-5">
                장바구니를 정말 비울까요?
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={onClearList}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  비우기
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
