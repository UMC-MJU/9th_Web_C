import { useDispatch, useSelector } from "../hooks/useAppDispatch"
import { clearCart } from "../slices/cartSlice";

export const ClearList = () => {
  const {total} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearList = () => {
    dispatch(clearCart());
  }
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between items-center w-210">
        <button 
        onClick={handleClearList}
        className="bg-gray-200 hover:bg-gray-300 font-semibold px-5 py-3 rounded-sm m-4">장바구니 비우기</button>
        <div className="m-4">{total}원</div>
      </div>
    </div>
  )
}
