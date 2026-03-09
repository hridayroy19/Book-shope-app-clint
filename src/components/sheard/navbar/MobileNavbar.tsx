import { FaBook, FaHome } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import UseCart from "../../../hooks/UseCart";
import { FaCartShopping } from "react-icons/fa6";
import { useState, useEffect } from "react";
import MobileMenuDrawer from "./MobileMenuDrawer";

const MobileNavbar = () => {
  const [cart] = UseCart();
  const [open, setOpen] = useState(false);

  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItemClass = (isActive: boolean) =>
    `flex flex-col items-center justify-center text-xs transition-all duration-300 ease-in-out ${
      isActive ? "text-teal-600 scale-110" : "text-gray-500"
    }`;

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50 transition-transform duration-300 md:hidden ${
          scrollDirection === "down" ? "translate-y-full" : "translate-y-4"
        }`}
      >
        <div className="flex justify-around items-center py-3">
          {/* Home */}
          <NavLink to="/" className={({ isActive }) => navItemClass(isActive)}>
            <FaHome size={24} />
            <span className="mt-1 font-medium">Home</span>
          </NavLink>

          {/* Books */}
          <NavLink
            to="/books"
            className={({ isActive }) => navItemClass(isActive)}
          >
            <FaBook size={24} />
            <span className="mt-1 font-medium">Books</span>
          </NavLink>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex flex-col items-center relative text-gray-500 transition-all duration-300 ease-in-out hover:text-teal-600"
          >
            <FaCartShopping size={24} />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-[10px] px-1 rounded-full font-semibold">
                {cart.length}
              </span>
            )}
            <span className="mt-1 font-medium">Cart</span>
          </Link>

          {/* Blog */}
          <NavLink
            to="/bloge"
            className={({ isActive }) => navItemClass(isActive)}
          >
            <span className="text-2xl">📝</span>
            <span className="mt-1 font-medium">Blog</span>
          </NavLink>

          {/* Menu */}
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col items-center justify-center text-gray-500 hover:text-teal-600 transition-all duration-300 ease-in-out p-2 rounded-lg hover:bg-gray-100"
          >
            <IoMenuSharp size={24} />
            <span className="mt-1 font-medium">Menu</span>
          </button>
        </div>
      </div>

      <MobileMenuDrawer open={open} setOpen={setOpen} />
    </>
  );
};

export default MobileNavbar;
