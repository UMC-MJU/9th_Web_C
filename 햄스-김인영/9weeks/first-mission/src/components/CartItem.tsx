type CartItemProps = {
  cart : {
    id: string;
    title: string;
    singer: string;
    price: string;
    img: string;
    amount: number;
  }
}

export const CartItem = ({ cart }: CartItemProps) => {
  return (
    <div key={cart.id}
      className='flex items-center p-5 border-b border-gray-300 w-210'>
      <img
        src={cart.img}
        alt='album-img'
        className='w-20 h-20 object-cover rounded-sm mr-4' />
      <div className='flex-1'>
        <h2 className='text-lg font-semibold'>{cart.title}</h2>
        <p className="text-gray-500">{cart.singer}</p>
        <p className='font-semibold'>{cart.price}</p>
      </div>
      <div className="flex items-center">
        <button className="px-3 py-1 bg-gray-300 hover:bg-gray-200 cursor-pointer rounded-l">-</button>
        <label className="px-4 py-[3px] border-y border-gray-300">{cart.amount}</label>
        <button className="px-3 py-1 bg-gray-300 hover:bg-gray-200 cursor-pointer rounded-r">+</button>
      </div>
    </div>
  )
}
