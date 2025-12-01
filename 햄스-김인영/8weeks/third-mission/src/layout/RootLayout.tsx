import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FloatingButton } from "../components/FloatingButton";
import { useSideBar } from "../hooks/useSideBar";
import { Sidebar } from "../components/Sidebar";

export const RootLayout = () => {
  const {isOpen, close, toggle} = useSideBar();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 transition-all duration-300">
      <Sidebar isOpen={isOpen} close={close}/>
      <Navbar toggle={toggle}/>
      <div className="flex flex-1 relative">
        <main
          className={`flex-1 flex justify-center pt-14 transition-all duration-300 ease-in-out}`}
        >
          <Outlet />
        </main>
      </div>
      <FloatingButton />
    </div>
  );
};

export default RootLayout;
