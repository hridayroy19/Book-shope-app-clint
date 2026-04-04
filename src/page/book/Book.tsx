/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaSearch, FaStar, FaUndo, FaFilter, FaTimes } from "react-icons/fa";
import useAxiosPublic from "../../axiosPublic/useAxiosPublic";
import Loading from "../../components/sheard/Loading";
import BookCard from "./BookCard";
import { IBook } from "../Home/PopularBooks";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const Book = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [popularBooks, setPopularBooks] = useState<IBook[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  // --- Filter States ---
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // --- Fetch Logic ---
  const fetchBooks = async (search: string) => {
    setLoading(true);
    try {
      const response = await axiosPublic.get("/products/get-book", {
        params: {
          category: selectedCategory,
          priceRange,
          minRating,
          sort: sortBy,
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      let fetchedBooks = response.data.data || [];

      // Frontend Filtering for Search
      if (search) {
        const lowerSearch = search.toLowerCase();
        fetchedBooks = fetchedBooks.filter(
          (book: IBook) =>
            book.title?.toLowerCase().includes(lowerSearch) ||
            book.author?.toLowerCase().includes(lowerSearch),
        );
      }

      // Filter by category if backend doesn't support it
      if (selectedCategory) {
        fetchedBooks = fetchedBooks.filter(
          (book: IBook) => book.category === selectedCategory,
        );
      }

      // Filter by min rating
      if (minRating > 0) {
        fetchedBooks = fetchedBooks.filter(
          (book: IBook) => book.rating >= minRating,
        );
      }

      setTotalBooks(fetchedBooks.length);

      // Frontend Pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedBooks = fetchedBooks.slice(
        startIndex,
        startIndex + itemsPerPage,
      );

      setPopularBooks(paginatedBooks);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 1. Automatic Search (Debouncing) ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks(searchTerm);

      // Update URL to match search term so Navbar stays in sync
      if (searchTerm) {
        searchParams.set("search", searchTerm);
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [
    searchTerm,
    selectedCategory,
    priceRange,
    minRating,
    sortBy,
    currentPage,
  ]);

  // Sync if URL search params change externally (e.g. from Navbar)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams.get("search")]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange("");
    setMinRating(0);
    setSortBy("newest");
    setCurrentPage(1);
    setIsDrawerOpen(false);
  };

  // --- Filter UI Component ---
  const FilterControls = () => (
    <div className="space-y-8">
      {/* Category Dropdown */}
      <div>
        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition"
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Religious">Religious</option>
          <option value="Children">Children</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {/* Price Range List */}
      <div>
        <label className="text-xs font-bold uppercase text-gray-500 mb-3 block">
          Price Range
        </label>
        <div className="space-y-2">
          {[
            { label: "All Prices", value: "" },
            { label: "Under $20", value: "0-20" },
            { label: "$20 - $50", value: "20-50" },
            { label: "$50 - $100", value: "50-100" },
            { label: "Over $100", value: "100-9999" },
          ].map((r) => (
            <label
              key={r.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="price"
                checked={priceRange === r.value}
                onChange={() => setPriceRange(r.value)}
                className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span
                className={`text-sm ${priceRange === r.value ? "text-teal-700 font-bold" : "text-gray-600 group-hover:text-gray-900"}`}
              >
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating List */}
      <div>
        <label className="text-xs font-bold uppercase text-gray-500 mb-3 block tracking-wider">
          Minimum Rating
        </label>
        <div className="space-y-1">
          {[5, 4, 3, 2].map((num) => (
            <label
              key={num}
              className={`flex items-center gap-3 w-full p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                minRating === num
                  ? "bg-teal-50 border border-teal-100 shadow-sm"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              {/* Hidden Radio Input */}
              <input
                type="radio"
                name="rating"
                value={num}
                checked={minRating === num}
                onChange={() => setMinRating(num)}
                className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 cursor-pointer"
              />

              {/* Star Icons */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < num ? "fill-current" : "text-gray-200"}
                    />
                  ))}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    minRating === num ? "text-teal-900" : "text-gray-600"
                  }`}
                >
                  {num}.0 & Up
                </span>
              </div>
            </label>
          ))}

          {/* Optional: Clear Rating Option */}
          {minRating > 0 && (
            <button
              onClick={() => setMinRating(0)}
              className="text-[10px] text-gray-400 mt-2 ml-2 hover:text-red-500 underline uppercase font-bold"
            >
              Clear Rating
            </button>
          )}
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition"
      >
        <FaUndo size={12} /> Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:py-10 py-24">
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* 1. Smoother Backdrop (Fades in) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* 2. Smoother Drawer (Slides in from left) */}
            <motion.div
              initial={{ x: "-100%" }} // Start off-screen to the left
              animate={{ x: 0 }} // Slide into view
              exit={{ x: "-100%" }} // Slide back out
              transition={{ type: "spring", damping: 25, stiffness: 200 }} // Natural spring effect
              className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="font-bold text-2xl text-gray-800">Filters</h2>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Refine your search
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-600" size={20} />
                </button>
              </div>

              {/* Scrollable area for filters if they are long */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <FilterControls />
              </div>

              {/* Optional: Add a "Show Results" button at the bottom of the drawer for better mobile UX */}
              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-100"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="flex flex-col items-start md:flex-row gap-10">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterControls />
          </div>
        </aside>

        <main className="flex-1">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10">
            <div className="relative w-full sm:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or author name..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold"
              >
                <FaFilter className="text-teal-600" /> Filters
              </button>
            </div>
          </div>

          {/* Book List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loading />
            </div>
          ) : popularBooks.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">
                No books found for this selection.
              </p>
              <button
                onClick={resetFilters}
                className="text-teal-600 font-bold mt-2 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Dynamic Pagination UI */}
          {!loading && totalBooks > 0 && (
            <div className="flex justify-center items-center mt-10 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-teal-200 text-teal-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50 font-bold transition flex items-center"
              >
                Prev
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(Math.ceil(totalBooks / itemsPerPage))].map(
                  (_, index) => {
                    const pageNumber = index + 1;
                    // Simple truncation logic for many pages
                    if (
                      pageNumber === 1 ||
                      pageNumber === Math.ceil(totalBooks / itemsPerPage) ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`w-10 h-10 rounded-lg font-bold shadow-sm transition-colors ${
                            currentPage === pageNumber
                              ? "bg-teal-600 text-white border-transparent"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-teal-50 hover:text-teal-700"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="flex items-center text-gray-400 font-bold px-1"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  },
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(Math.ceil(totalBooks / itemsPerPage), p + 1),
                  )
                }
                disabled={currentPage >= Math.ceil(totalBooks / itemsPerPage)}
                className="px-4 py-2 bg-white border border-teal-200 text-teal-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-50 font-bold transition flex items-center"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Book;
