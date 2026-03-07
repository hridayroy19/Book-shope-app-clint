import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoLogIn } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SubNavbar from "./SubNavbar";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../axiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import UseCart from "../../../hooks/UseCart";
import MobileNavbar from "./MobileNavbar";

interface DecodedToken {
  exp: number;
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books" },
  { name: "Author", path: "/author" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/bloge" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [cart] = UseCart();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;

      if (decoded.exp > now) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("jwtToken");
      }
    } catch {
      localStorage.removeItem("jwtToken");
    }
  }, []);

  const logoutHandler = async () => {
    await axiosPublic.post("/auth/logout");

    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User Logout",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollDirection(window.scrollY > 80 ? "down" : "up");
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
        {/* Top bar */}
        <div
          className={`transition-all duration-500 ${
            scrollDirection === "down" ? "hidden" : "block"
          }`}
        >
          <SubNavbar />
        </div>

        {/* Main Navbar */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/">
              <img
                src="https://i.ibb.co.com/VmX711W/images-removebg-preview.png"
                className="lg:h-44 h-32 object-contain"
              />
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
              <input
                type="text"
                placeholder="Search books, authors..."
                className="w-full rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-teal-600">
                <CiSearch size={20} />
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link to="/cart" className="relative hidden md:block">
                <FaCartShopping className="text-xl text-gray-700 hover:text-teal-600 transition" />
                <span className="absolute -top-2 -right-2 text-xs bg-teal-600 text-white rounded-full px-1.5">
                  {cart?.length || 0}
                </span>
              </Link>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="flex-none">
                  <div className="dropdown dropdown-end"></div>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                      <li>
                        <a className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </a>
                      </li>
                      <li>
                        <a href="/deshboard">Dashboard</a>
                      </li>
                      <li>
                        <button onClick={logoutHandler}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile menu */}

              <div className="flex md:hidden">
                <button className="flex items-center gap-2 px-2 py-1.5 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-500 transition-colors duration-300 font-medium text-base">
                  <span>Login</span>
                  <IoLogIn size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex justify-center border-t border-gray-300">
            <ul className="flex gap-8 py-3 text-lg font-semibold">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative group ${
                        isActive ? "text-teal-600" : "text-gray-700"
                      }`
                    }
                  >
                    {link.name}

                    {/* hover underline animation */}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-600 transition-all group-hover:w-full"></span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <MobileNavbar />
    </>
  );
};

export default Navbar;
