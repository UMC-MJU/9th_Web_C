import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export const MyPage = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  

  

  return (
    <div>
      <img
        src={user?.avatar || "/default-profile.png"}
        alt={user?.name || "작성자"}
        className="w-40 h-40 rounded-full border border-gray-600 object-cover mt-1.5"
      />
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </div>
  );
};
