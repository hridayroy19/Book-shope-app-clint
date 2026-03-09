import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../axiosPublic/useAxiosPublic";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import ReviewsRatings from "./BookRevew";

interface Book {
  _id: string;
  title: string;
  description: string;
  author: string;
  publisher?: string;
  language?: string;
  pages?: number;
  edition?: string;
  publicationDate?: Date;
  category: string;
  subCategory?: string;
  tags?: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  quantity: number;
  inStock?: boolean;
  image: string;
  averageRating?: number;
  totalReviews?: number;
  views?: number;
  sold?: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface DecodedToken {
  email?: string;
  exp: number;
  iat: number;
}

const BookDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [book, setBook] = useState<Book | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axiosPublic.get(`/products/${id}`);
        setBook(res.data.data);
        setSelectedImage(res.data.data.image);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBookDetails();
  }, [id, axiosPublic]);

  const addToCart = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      Swal.fire({ title: "Please Login", icon: "info" });
      return;
    }
    const decoded: DecodedToken = jwtDecode(token);
    const cartData = {
      productId: book?._id,
      title: book?.title,
      price: book?.price,
      image: book?.image,
      userEmail: decoded?.email,
    };
    try {
      await axiosPublic.post("/cart/create-cart", cartData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Added to cart",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {
      Swal.fire("Error", "Failed to add cart", "error");
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!book) return <div className="text-center py-20">Loading...</div>;

  const discountPercentage =
    book.discountPercentage ||
    (book.originalPrice
      ? Math.round(
          ((book.originalPrice - book.price) / book.originalPrice) * 100,
        )
      : 0);

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-16 space-y-10">
      {/* Main Section */}
      <div className="grid lg:grid-cols-2 gap-10 bg-white dark:bg-gray-900 p-4 transition-all">
        {/* Left: Image */}
        <div className=" flex flex-col items-center">
          <div className="overflow-hidden  h-[500px] w-full max-w-lg">
            <img
              src={selectedImage || book.image}
              alt={book.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
          {/* Badges */}
          <div className="flex gap-2 mt-3 flex-wrap justify-center">
            {book.featured && badge("Featured", "purple")}
            {book.bestseller && badge("Bestseller", "yellow")}
            {book.newArrival && badge("New Arrival", "green")}
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          <h1 className="text-xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {book.title}
          </h1>

          {/* Ratings & Stats */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(book.averageRating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({book.totalReviews || 0} reviews)
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {book.views || 0} views • {book.sold || 0} sold
            </span>
          </div>

          {/* Author / Publisher */}
          <div className="grid grid-cols-2 text-lg gap-4 py-4 border-y border-gray-200">
            {book.author && infoItem("Author", book.author)}
            {book.publisher && infoItem("Publisher", book.publisher)}
            {book.edition && infoItem("Edition", book.edition)}
            {book.language && infoItem("Language", book.language)}
          </div>
          {/* Price / Stock */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <span className="text-3xl font-bold text-teal-600">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && book.originalPrice > book.price && (
                <>
                  <span className="text-lg line-through text-red-400">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-4 flex-wrap">
              <p
                className={`text-sm font-semibold ${
                  book.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <p className="text-sm text-gray-600">
                Available:{" "}
                <span className="font-semibold">{book.quantity}</span> pcs
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={addToCart}
              disabled={!book.inStock}
              className={`flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition ${
                !book.inStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {book.inStock ? "Add To Cart" : "Out of Stock"}
            </button>
            <button className="flex-1 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8 overflow-x-auto scrollbar-hide">
            {["description", "details", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition whitespace-nowrap ${
                  activeTab === tab
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {book.description}
              </p>
            </div>
          )}
          {activeTab === "details" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailItem("Title", book.title)}
                {detailItem("Author", book.author)}
                {detailItem("Publisher", book.publisher)}
                {detailItem("Edition", book.edition)}
                {detailItem("Language", book.language)}
                {detailItem("Category", book.category)}
                {detailItem("Sub Category", book.subCategory)}
                {detailItem("Pages", book.pages)}
                {detailItem(
                  "Publication Date",
                  formatDate(book.publicationDate),
                )}
                {detailItem("ISBN", "N/A")}
              </div>
            </div>
          )}
          {activeTab === "reviews" && <ReviewsRatings />}
        </div>
      </div>
    </div>
  );
};

// Badge helper
const badge = (text: string, color: string) => (
  <span
    className={`text-xs px-3 py-1 rounded-full font-semibold ${
      color === "purple"
        ? "bg-purple-100 text-purple-600"
        : color === "yellow"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-green-100 text-green-600"
    }`}
  >
    {text}
  </span>
);

// Info Item helper
const infoItem = (label: string, value?: string | number) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "N/A"}</p>
  </div>
);

// Detail item helper for details tab
const detailItem = (label: string, value?: string | number) => (
  <div className="flex">
    <span className="w-32 text-gray-500">{label}:</span>
    <span className="font-medium text-gray-900">{value || "N/A"}</span>
  </div>
);

export default BookDetails;
