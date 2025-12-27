import cart from '../assets/cart.png'
import { useEffect } from 'react';
import { useCartAction, useCartInfo } from '../hooks/useCartStore';

export const Navbar = () => {
  const {amount, cartItems} = useCartInfo();
  const { calculateTotals } = useCartAction();

  useEffect(() => {
    calculateTotals()
  },[cartItems]);
  
  return (
    <div className='flex flex-row bg-gray-800 p-4 justify-between'>
      <div className='text-white text-3xl font-bold'>Album List</div>
      <div className='flex flex-row items-center gap-2'>
        <img 
        src={cart} 
        alt='cart'
        className='w-7'/>
        <span className='text-white text-xl font-semibold'>{amount}</span>
      </div>
    </div>
  )
}
