import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* 🔥 STICKY NAVBAR */}
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>

        {/* 🔥 SCROLLABLE CONTENT ONLY */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;
