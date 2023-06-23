import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-col overflow-y-auto w-full ">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 py-4 ">
              <NavLink
                className={
                  "text-gray-500 bg-gray-200 px-4 py-2 rounded-l-full ring-2 ring-black"
                }
                to="/admin"
              >
                ADMIN
              </NavLink>
              <NavLink
                className={
                  "text-gray-500 bg-gray-200 px-4 py-2 rounded-r-full ring-2 ring-black"
                }
                to="/admin/categoria"
              >
                CATEGORIA
              </NavLink>

              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
