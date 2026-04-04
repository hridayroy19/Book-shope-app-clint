import axios from "axios";

const axiosPublic = axios.create({ baseURL: "http://localhost:5000/api" });
// const axiosPublic = axios.create({ baseURL: "https://book-shop-projcet.vercel.app/api" });

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
