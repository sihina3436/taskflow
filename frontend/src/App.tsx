import  { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connectSocket } from "./util/socket";

const App = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user?._id) {
      connectSocket(user._id);
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
