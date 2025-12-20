import { useState } from "react";

export function useSideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  }

  const open = () => {
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
  }

  return{
    isOpen,
    setIsOpen,
    toggle,
    open,
    close,
  };
}