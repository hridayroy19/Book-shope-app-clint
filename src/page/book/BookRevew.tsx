import { FaStar, FaRegThumbsUp } from "react-icons/fa6";

// Define the Review type for better TS support
export type Review = {
  name: string;
  time: string;
  review: string;
  rating: number;
};

interface ReviewsRatingsProps {
  reviews?: Review[]; // Optional reviews array
}

const ReviewsRatings = ({ reviews = [] }: ReviewsRatingsProps) => {
  const ratings = [
    { stars: 5, count: 1500 },
    { stars: 4, count: 1200 },
    { stars: 3, count: 800 },
    { stars: 2, count: 400 },
    { stars: 1, count: 200 },
  ];

  // --- Dynamic Calculations ---
  const totalRatingsCount = ratings.reduce((sum, r) => sum + r.count, 0);
  
  // Weighted average calculation: (5*1500 + 4*1200...) / total
  const totalWeightedStars = ratings.reduce((sum, r) => sum + r.stars * r.count, 0);
  const averageRating = totalRatingsCount > 0 
    ? (totalWeightedStars / totalRatingsCount).toFixed(1) 
    : "0.0";

  return (
    <div className="w-full mx-auto ">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h2>

        {/* --- Summary Header --- */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-5xl font-extrabold text-gray-900">{averageRating}</span>
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium">/ 5.0</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.round(Number(averageRating)) ? "fill-current" : "text-gray-200"} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              {totalRatingsCount.toLocaleString()} Total Ratings
            </p>
          </div>

          {/* --- Progress Bars --- */}
          <div className="flex-1 space-y-3">
            {ratings.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-600 w-3">{rating.stars}</span>
                <FaStar className="text-yellow-400 text-xs" />
                <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#009689] h-full rounded-full transition-all duration-500"
                    style={{ width: `${(rating.count / totalRatingsCount) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-10 text-right">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Dynamic Reviews Section --- */}
        {reviews.length > 0 ? (
          <div className="mt-12">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-gray-800">Top Reviews</h3>
              <p className="text-[#009689] text-sm font-semibold cursor-pointer hover:underline">
                See All {reviews.length} Reviews
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {reviews.map((review, index) => (
                <div key={index} className="py-6 group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900 capitalize">{review.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{review.time}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                      <span className="text-xs font-bold text-green-700">{review.rating}</span>
                      <FaStar className="text-green-700 text-[10px]" />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mt-3 leading-relaxed italic">"{review.review}"</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#009689] transition-colors">
                      <FaRegThumbsUp /> Helpful
                    </button>
                    <span className="text-gray-200">|</span>
                    <button className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors">Report</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 py-10 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No written reviews yet.</p>
            <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
            <button className="mt-4 bg-[#009689] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#007a6f]">
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsRatings;