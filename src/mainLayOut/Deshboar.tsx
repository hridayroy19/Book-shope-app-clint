/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaBagShopping, FaUsers, FaHeart } from "react-icons/fa6";
import { IoMdAddCircleOutline, IoMdContacts } from "react-icons/io";
import {
  MdDashboardCustomize,
  MdHome,
  MdOutlineBorderColor,
} from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { Link, NavLink, Outlet } from "react-router-dom";

const navItem =
  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium group";
const activeNav =
  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-white bg-white/15 text-sm font-medium";

const SectionLabel = ({ children }: any) => (
  <span className="px-4 pt-5 pb-1 text-[10px] font-semibold tracking-widest uppercase text-slate-500 select-none block">
    {children}
  </span>
);

const DashboardLayout = () => {
  const token = localStorage.getItem("jwtToken");
  let isAdmin = false;
  let isUsers = false;

  if (token) {
    try {
      const user = JSON.parse(atob(token.split(".")[1]));
      isAdmin = user?.role === "admin";
      isUsers = user?.role === "user";
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full w-60 bg-[#0f172a] border-r border-white/5">
      {/* Logo */}
      <div className="px-4 py-4 text-center border-b border-white/5">
        <Link to="/">
          <h2 className="text-white">DASHBOARD</h2>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {isAdmin && (
          <>
            <SectionLabel>Admin</SectionLabel>
            <NavLink
              to="/deshboard"
              end
              className={({ isActive }) => (isActive ? activeNav : navItem)}
            >
              <MdDashboardCustomize className="text-lg shrink-0" />
              Dashboard
            </NavLink>
            <NavLink
              to="all-user"
              className={({ isActive }) => (isActive ? activeNav : navItem)}
            >
              <FaUsers className="text-base shrink-0" />
              All Users
            </NavLink>
            <NavLink
              to="add-book"
              className={({ isActive }) => (isActive ? activeNav : navItem)}
            >
              <IoMdAddCircleOutline className="text-lg shrink-0" />
              Add Book
            </NavLink>
            <NavLink
              to="manage-Books"
              className={({ isActive }) => (isActive ? activeNav : navItem)}
            >
              <TiEdit className="text-lg shrink-0" />
              Manage Books
            </NavLink>
            <NavLink
              to="manage-order"
              className={({ isActive }) => (isActive ? activeNav : navItem)}
            >
              <FaBagShopping className="text-base shrink-0" />
              Manage Orders
            </NavLink>
          </>
        )}

        {isUsers && (
          <>
            <SectionLabel>My Account</SectionLabel>
            <NavLink
              to="order"
              className={({ isActive }) => (isActive ? activeNav : navItem)}
            >
              <FaBagShopping className="text-base shrink-0" />
              My Orders
            </NavLink>
            <NavLink
              to="wishlist"
              className={({ isActive }) => (isActive ? activeNav : navItem)}
            >
              <FaHeart className="text-base shrink-0" />
              Wishlist
            </NavLink>
          </>
        )}

        <SectionLabel>General</SectionLabel>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeNav : navItem)}
        >
          <MdHome className="text-lg shrink-0" />
          Home
        </NavLink>
        <NavLink
          to="profile"
          className={({ isActive }) => (isActive ? activeNav : navItem)}
        >
          <FaUsers className="text-base shrink-0" />
          Profile
        </NavLink>
        <NavLink
          to="/deshboard/tracking"
          className={({ isActive }) => (isActive ? activeNav : navItem)}
        >
          <MdOutlineBorderColor className="text-lg shrink-0" />
          Order Tracking
        </NavLink>
        <NavLink
          to="/deshboard/support"
          className={({ isActive }) => (isActive ? activeNav : navItem)}
        >
          <IoMdContacts className="text-lg shrink-0" />
          Customer Support
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {isAdmin ? "A" : "U"}
          </div>
          <div>
            <p className="text-xs font-semibold text-white leading-none">
              {isAdmin ? "Admin" : "User"}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {isAdmin ? "Full Access" : "Standard Access"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <div className="drawer md:hidden">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-2" className="drawer-overlay" />
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-white/5 sticky top-0 z-40">
          <label
            htmlFor="my-drawer-2"
            className="text-white cursor-pointer p-1 rounded-lg hover:bg-white/10 transition"
          >
            <MdDashboardCustomize className="text-2xl" />
          </label>
          <img
            src="https://i.ibb.co.com/VmX711W/images-removebg-preview.png"
            alt="Logo"
            className="h-6 object-contain brightness-200"
          />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
