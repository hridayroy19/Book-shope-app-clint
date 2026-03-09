import { useEffect, useState } from "react";

export type Blog = {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string[];
  image: string;
};

const Bloge = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/blog.json")
      .then((res) => res.json())
      .then((data: Blog[]) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009689]"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-4 lg:px-8 py-1.5">
      {/* --- Hero Section --- */}
      <div className="relative mb-16">
        <div className="w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-2xl shadow-lg">
          <img
            src="https://i.ibb.co.com/QjXHqBQk/IMG-0324.jpg"
            alt="Bookshelf Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute -bottom-10 left-8 flex items-end space-x-4">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden shadow-xl bg-white">
            <img
              src="https://i.ibb.co.com/Xrrw66mQ/image-1.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pb-10">
            <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-sm">
              The Book House Blog
            </h1>
            <p className="text-white font-medium hidden sm:block">Sharing stories, one page at a time.</p>
          </div>
        </div>
      </div>

      {/* --- Blog Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {blogs?.map((blog) => (
          <article
            key={blog.id}
            className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={blog.image}
                alt={blog.title}
              />
              <div className="absolute top-4 left-4 bg-[#009689] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Article
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#009689] transition-colors">
                {blog.title}
              </h2>
              
              <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                <span className="flex items-center">
                  <span className="mr-1">📅</span> {blog.date}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">✍️</span> {blog.author}
                </span>
              </div>

              {/* Push button to bottom */}
              <div className="mt-auto">
                <a
                  href={`/bloge/blogdetails/${blog.id}`}
                  className="inline-block w-full text-center bg-[#009689] hover:bg-[#007a6f] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Continue Reading
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Bloge;