import InfoSection from "../book/InfoSection";

const Contact = () => {
  return (
    <>
      <div className="relative bg-gray-50 py-1">
        <div className="w-full mb-16">
          <img
            src="https://i.ibb.co/ksbX08FH/5b76f375-edac-47b2-8a46-e48c74b8d088-1024.jpg"
            alt="Contact"
            className="bg-cover w-full h-[250px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Inquiry Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Online Inquiry
              </h3>
              <div className="space-y-6">
                <input
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  placeholder="Phone"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <select className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Select an Interest</option>
                  <option>Consultation</option>
                  <option>Support</option>
                  <option>Sales</option>
                </select>
                <textarea
                  placeholder="Message"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 h-36"
                ></textarea>
                <button className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none transition duration-300">
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Contact Details
              </h3>
              <div className="space-y-6">
                <div className="text-lg text-teal-600">
                  <a href="mailto:hrhridoyroy@gmail.com">
                    hrhridoyroy@gmail.com
                  </a>
                </div>
                <div className="text-lg text-teal-600">(+088) 017382119365</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800">Westfield</h4>
                    <p className="text-gray-600">
                      Bangladesh, Dhaka <br />
                      Dinajpur Sodor
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">HR ID AY</h4>
                    <p className="text-gray-600">
                      357 Dinajpur Ave. <br />
                      PTI MOR, NJ 07901
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      PTI MOR Office
                    </h4>
                    <p className="text-gray-600">
                      549 Millburn Ave. <br />
                      PTI MOR, NJ 07078
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfoSection />
    </>
  );
};

export default Contact;
