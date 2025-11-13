import { useState } from "react"
import { LpRegisterModal } from "./Modal/LpRegisterModal";

export const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
    <div>
      {isOpen && <LpRegisterModal onClose={() => setIsOpen(false)}/>}
    </div>
    <div>
      <button 
      className="fixed bottom-8 right-8 w-[80px] h-[80px] pb-2
      bg-blue-500 rounded-full font-light text-6xl text-white z-999 hover:bg-blue-400"
      onClick={() => setIsOpen(true)}>
        <span>+</span>
      </button>
    </div>
    </>
  )
}
