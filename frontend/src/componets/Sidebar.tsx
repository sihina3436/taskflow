import React from "react";
import WomanImg from "../assets/woman.png";
import ManImg from "../assets/man.png";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/authentication/authSlice";

interface MenuItem {
  path: string;
  name: string;
  icon: string;
}

const menu: MenuItem[] = [
  { path: "/", name: "Dashboard", icon: "ri-home-5-line" },
  { path: "/add-task", name: "Create Task", icon: "ri-add-circle-line" },
  { path: "/my-task", name: "My Task", icon: "ri-todo-line" },
  { path: "/task-categories", name: "Task Categories", icon: "ri-folder-line" },
  { path: "/settings", name: "Settings", icon: "ri-settings-3-line" },
];

const Sidebar: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // clears redux + localStorage
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen sticky top-0 bg-primary p-6 flex flex-col shadow-xl">
      
      {/* ================= PROFILE ================= */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center mb-8 shadow-md">
        <img
          src={user?.gender === "male" ? ManImg : WomanImg}
          alt="profile"
          className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-white shadow"
        />
        <h2 className="font-semibold text-sm text-white">{user?.name}</h2>
        <p className="text-xs opacity-80 text-white">{user?.email}</p>
      </div>

      {/* ================= MENU ================= */}
      <nav className="flex flex-col gap-1 flex-1">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 rounded-xl
               transition-all duration-200 group
               ${
                 isActive
                   ? "bg-white text-primary shadow-lg"
                   : "hover:bg-white/20 text-white"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-9 h-9 flex items-center justify-center rounded-lg
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white/20 group-hover:bg-white/30"
                    }`}
                >
                  <i className={`${item.icon} text-lg`} />
                </span>

                <span className="text-sm font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ================= LOGOUT ================= */}
      <button
        onClick={handleLogout}
        className="mt-4 py-3 rounded-xl bg-white/20 text-white hover:bg-white hover:text-primary transition font-medium"
      >
        <i className="ri-logout-box-r-line mr-2"></i>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
