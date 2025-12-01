import { createPortal } from "react-dom";
import { useDeleteUsers } from "../../hooks/mutations/useDeleteUsers";

type userDeleteModalProps = {
  onClose: () => void;
};

export const UserDeleteModal = ({ onClose }: userDeleteModalProps) => {
  const { mutate : deleteUsers } = useDeleteUsers();
  return createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
        <h2 className="text-[15px] font-semibold m-4">정말 탈퇴하시겠습니까?</h2>
        <div className="flex justify-center gap-4 mb-3">
          <button
            onClick={() => {
              deleteUsers();
              onClose();
            }}
            className="bg-red-400 text-white px-4 pb-1 pt-0.5 rounded hover:bg-red-500">
            yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 pb-1 pt-0.5 rounded hover:bg-gray-500">
            no
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
