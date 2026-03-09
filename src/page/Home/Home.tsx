import { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import Advertise from "./Advertise";
import BookCatagory from "./catagory/BookCatagory";
import ChildBook from "./ChildBook";
import Discount from "./Discount";
import PopularBooks, { IBook } from "./PopularBooks";
import RelizonBook from "./RelizonBook";
import Feedback from "./Review";
import useAxiosPublic from "../../axiosPublic/useAxiosPublic";
import Loading from "../../components/sheard/Loading";
import NewsletterSignup from "./NewsletterSignup";

const Home = () => {

  const [popularBooks, setPopularBooks] = useState<IBook[]>([]);
  // console.log(popularBooks,"data get popouer")
  const [religiousBooks, setReligiousBooks] = useState<IBook[]>([]);
  // console.log(religiousBooks)
  const [childrenBooks, setChildrenBooks] = useState<IBook[]>([]);
  // console.log(childrenBooks)
  const [isLoading, setIsLoading] = useState(true);
  
  const axiosPublic = useAxiosPublic();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/products/get-book`);
        const allBooks = response.data.data || [];
        const populer = allBooks.filter((book: IBook) => book.category === 'Fiction');
        const religious = allBooks.filter((book: IBook) => book.category === 'Religious');
        const children = allBooks.filter((book: IBook) => book.category === 'Children');
        setPopularBooks(populer)   
        setReligiousBooks(religious);
        setChildrenBooks(children);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [axiosPublic]);
  
  if (isLoading) {
    return (
     <Loading/>
    );
  }
  return (
    <div className="bg-gray-100 w-full mx-auto">
        <Banner />
        <div className="px-4">
        <BookCatagory />
        <PopularBooks popularBooks={popularBooks} />
        <RelizonBook religiousBooks={religiousBooks} />
        <ChildBook  religiousBooks={childrenBooks} />
        <Discount />
        <Advertise />
        <NewsletterSignup/>
        <Feedback />
      </div>
    </div>
  );
};

export default Home;
