import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../axiosPublic/useAxiosPublic";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import ReviewsRatings from "./BookRevew";
import InfoSection from "./InfoSection";

interface Book {
  _id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
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

  useEffect(() => {
    const fetchBookDetails = async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      setBook(res.data.data);
    };
    fetchBookDetails();
  }, [id, axiosPublic]);

  const addToCart = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      Swal.fire({
        title: "Please Login",
        icon: "info",
      });
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

  if (!book) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Main Section */}
      <div className="grid lg:grid-cols-2 gap-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        {/* Book Image */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-xl border">
            <img
              src={book.image}
              alt={book.title}
              className="w-full max-h-[520px] object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* thumbnails */}
          <div className="flex gap-3 mt-5">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={book.image}
                className="w-20 h-20 object-cover rounded border cursor-pointer hover:scale-105"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {book.title}
          </h1>

          <p className="text-gray-500 text-sm">
            Author: <span className="font-medium">{book.author}</span>
          </p>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-teal-600">
              ${book.price}
            </span>

            <span className="text-lg line-through text-red-400">
              ${book.discount}
            </span>

            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
              Sale
            </span>
          </div>

          {/* Stock */}
          <p className="text-sm text-gray-600">
            Available: <span className="font-semibold">{book.quantity}</span>{" "}
            pcs
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{book.description}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={addToCart}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Add To Cart
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Extra Sections */}
      <div className="mt-16 space-y-16">
        <ReviewsRatings />
        <InfoSection />
      </div>
    </div>
  );
};

export default BookDetails;
