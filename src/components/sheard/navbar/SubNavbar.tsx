import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";

const SubNavbar = () => {
  return (
    <div className="bg-gray-50 border-gray-400">
      <div className="hidden lg:flex items-center justify-between max-w-screen-2xl mx-auto px-6 py-1.5 text-sm">

        {/* Email Subscribe */}
        <form className="relative flex items-center">
          <input
            type="email"
            placeholder="Sign up for our emails"
            className="w-56 h-9 rounded-full border border-gray-300 bg-white px-4 pr-24 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white text-xs px-4 py-1.5 rounded-full transition"
          >
            Subscribe
          </button>
        </form>

        {/* Message */}
        <p className="text-gray-600 text-xs md:text-sm text-center">
          Every purchase financially supports{" "}
          <span className="underline font-medium">
            local independent bookstores
          </span>
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-xs">Follow us</span>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-blue-600 hover:text-white transition">
              <FaFacebookF size={14} />
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-pink-500 hover:text-white transition">
              <FaInstagram size={14} />
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-sky-500 hover:text-white transition">
              <FaTwitter size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubNavbar;