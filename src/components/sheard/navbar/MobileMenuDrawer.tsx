/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books" },
  { name: "Author", path: "/author" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/bloge" },
  { name: "Contact", path: "/contact" },
];

const MobileMenuDrawer = ({ open, setOpen }: any) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />

          {/* drawer */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-[280px] bg-white z-50 shadow-xl flex flex-col"
          >
            {/* header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-lg">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <IoClose size={22} />
              </button>
            </div>

            {/* links */}
            <div className="flex flex-col gap-1 p-4 flex-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg text-md font-medium transition ${
                      isActive
                        ? "bg-teal-100 text-teal-600"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* bottom buttons */}
            <div className="p-4 border-t space-y-3">
              <button className="w-full bg-black text-white py-3 rounded-lg">
                Login
              </button>

              <button className="w-full border py-3 rounded-lg">
                Register
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuDrawer;
