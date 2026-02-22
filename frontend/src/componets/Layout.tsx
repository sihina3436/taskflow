import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 md:hidden flex transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* SIDEBAR */}
        <Sidebar onClose={() => setSidebarOpen(false)} />

        {/* OVERLAY */}
        <div
          className="flex-1 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        />
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-20">
          <Navbar onHamburgerClick={() => setSidebarOpen(true)} />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;