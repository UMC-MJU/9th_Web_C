import { CartItem } from './CartItem'
import type { RootState } from '../store/store'
import { useSelector } from '../hooks/useAppDispatch'

export const CartList = () => {
  const {cartItems, amount, total} = useSelector((state: RootState) => state.cart)
  return (
    <div className='flex flex-col items-center m-2'>
      {cartItems.map((cart) => <CartItem cart={cart} />)}
    </div>
  )
}
