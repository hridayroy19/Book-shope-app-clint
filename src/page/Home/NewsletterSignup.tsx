const NewsletterSignup = () => {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-[#a567b4] py-16 px-6 lg:px-20 rounded-xl shadow-lg relative overflow-hidden">
      {/* Optional illustration */}
      <div className="absolute right-0 top-0 opacity-10">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill="white" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Subscribe to Our Newsletter
        </h2>
        <p className="mt-4 text-white/90 sm:text-lg">
          Get the latest books, exclusive discounts, and special offers directly
          in your inbox.
        </p>

        {/* Form */}
        <form className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg  text-gray-900 placeholder-white"
          />
          <button
            type="submit"
            className="bg-white text-orange-500 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>

        {/* Optional note */}
        <p className="mt-4 text-white/80 text-sm">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
