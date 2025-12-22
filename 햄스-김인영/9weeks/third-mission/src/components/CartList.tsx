import { CartItem } from './CartItem'
import { useCartInfo } from '../hooks/useCartStore'

export const CartList = () => {
  const {cartItems} = useCartInfo();
  return (
    <div className='flex flex-col items-center m-2'>
      {cartItems.map((cart) => <CartItem cart={cart} />)}
    </div>
  )
}
