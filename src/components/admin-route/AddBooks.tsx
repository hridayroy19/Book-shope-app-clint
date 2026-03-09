/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../axiosPublic/useAxiosPublic";

const AddBooks = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    const payload = {
      title: data.title,
      author: data.author,
      publisher: data.publisher || "",
      bookLanguage: data.bookLanguage,
      pages: Number(data.pages || 0),
      edition: data.edition || "",
      publicationDate: data.publicationDate
        ? new Date(data.publicationDate)
        : null,
      category: data.category,
      subCategory: data.subCategory || "",
      tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()) : [],
      price: Number(data.price),
      originalPrice: Number(data.originalPrice || 0),
      discountPercentage: Number(data.discountPercentage || 0),
      quantity: Number(data.quantity),
      inStock: Number(data.quantity) > 0,
      image: data.image,
      description: data.description || "",
      averageRating: 4,
      featured: Boolean(data.featured),
      bestseller: Boolean(data.bestseller),
      newArrival: Boolean(data.newArrival),
      metaTitle: data.metaTitle || "",
      metaDescription: data.metaDescription || "",
    };

    try {
      const res = await axiosPublic.post("/products/create-book", payload);
      console.log(res?.data);
      Swal.fire("Success", "Book added successfully!", "success");
      reset();
    } catch (err: any) {
      console.error(err.response.data || err);
      Swal.fire("Error", "Check console for errors", "error");
    }
  };

  const Input = ({ label, name, type = "text", req = false }: any) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-gray-700 uppercase">
        {label} {req && "*"}
      </label>
      <input
        {...register(name, { required: req })}
        type={type}
        className={`border p-2 rounded focus:border-teal-500 outline-none ${errors[name] ? "border-red-500" : "border-gray-300"}`}
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <h2 className="text-2xl font-bold md:col-span-3 border-b pb-2 mb-4">
          Add New Book
        </h2>

        <Input label="Title" name="title" req />
        <Input label="Author" name="author" req />
        <Input label="Publisher" name="publisher" />
        <Input label="Edition" name="edition" />
        <Input label="Book Language" name="bookLanguage" />

        <Input label="Price" name="price" type="number" req />
        <Input label="Original Price" name="originalPrice" type="number" />
        <Input label="Discount %" name="discountPercentage" type="number" />
        <Input label="Quantity" name="quantity" type="number" req />
        <Input label="Pages" name="pages" type="number" />
        <Input label="Publication Date" name="publicationDate" type="date" />

        <Input label="Category" name="category" req />
        <Input label="Sub Category" name="subCategory" />

        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Cover Image URL" name="image" req />
          <Input label="Tags (comma separated)" name="tags" />
          <Input label="Meta Title (SEO)" name="metaTitle" />
        </div>

        <div className="md:col-span-3">
          <label className="text-xs font-bold text-gray-700 uppercase">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded min-h-[100px]"
          />
        </div>
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-gray-700 uppercase">
            Meta Description
          </label>
          <textarea
            {...register("metaDescription")}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="md:col-span-3 flex gap-6 py-4 bg-teal-50 px-4 rounded">
          {["featured", "bestseller", "newArrival"].map((f) => (
            <label
              key={f}
              className="flex items-center gap-2 font-semibold text-teal-800 capitalize"
            >
              <input type="checkbox" {...register(f)} /> {f}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="md:col-span-3 bg-teal-600 text-white font-bold py-3 rounded hover:bg-teal-700 transition"
        >
          Save Book to Store
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
