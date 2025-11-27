import cartList from '../constants/cartItems'
import { CartItem } from './CartItem'

export const CartList = () => {
  return (
    <div className='flex flex-col items-center m-2'>
      {cartList.map((cart) => <CartItem cart={cart} />)}
    </div>
  )
}
