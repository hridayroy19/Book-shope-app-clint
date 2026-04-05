/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { BookFormData, TBook } from "../../type";

const CATEGORIES: Record<string, string[]> = {
  Fiction: ["Fantasy", "Mystery", "Romance", "Sci-Fi"],
  Academic: ["Math", "Physics", "Biology"],
  Religious: ["Islam", "Christianity", "Hinduism"],
  Children: ["Comics", "Story Book"],
  "Self-Help": ["Productivity", "Mindset"],
};

const LANGUAGES = [
  "English",
  "Bengali",
  "Arabic",
  "Hindi",
  "Urdu",
  "French",
  "Spanish",
];

const AddBook = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>();

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = import.meta.env.VITE_IMAGE_API_KEY;
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${key}`,
        formData,
      );
      setValue("image", res.data.data.display_url);
      Swal.fire("Success", "Image uploaded!", "success");
    } catch {
      Swal.fire("Error", "Upload failed!", "error");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: BookFormData) => {
    const payload: TBook = {
      ...data,
      publicationDate: data.publicationDate
        ? new Date(data.publicationDate)
        : undefined,
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
      pages: Number(data.pages || 0),
      price: Number(data.price),
      originalPrice: Number(data.originalPrice || 0),
      discountPercentage: Number(data.discountPercentage || 0),
      quantity: Number(data.quantity),
      inStock: Number(data.quantity) > 0,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/products/create-book",
        payload,
      );
      Swal.fire("Success", "Book Added!", "success");
      reset();
    } catch {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-teal-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">📚 Add New Book</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Title"
              register={register("title", { required: true })}
              error={errors.title}
            />
            <Input
              label="Author"
              register={register("author", { required: true })}
              error={errors.author}
            />
            <Input label="Publisher" register={register("publisher")} />

            {/* Language Select */}
            <Select
              label="Language"
              register={register("bookLanguage")}
              options={LANGUAGES}
            />

            <Input label="Pages" type="number" register={register("pages")} />
            <Input label="Edition" register={register("edition")} />
            <Input
              label="Publication Date"
              type="date"
              register={register("publicationDate")}
            />
          </div>

          {/* Category */}
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              label="Category"
              register={register("category", { required: true })}
              options={Object.keys(CATEGORIES)}
              error={errors.category}
            />

            <Select
              label="Sub Category"
              register={register("subCategory")}
              options={selectedCategory ? CATEGORIES[selectedCategory] : []}
              disabled={!selectedCategory}
            />

            <Input
              label="Tags (comma separated)"
              register={register("tags")}
              className="md:col-span-2"
            />
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Price"
              type="number"
              register={register("price", { required: true })}
              error={errors.price}
            />
            <Input
              label="Original Price"
              type="number"
              register={register("originalPrice")}
            />
            <Input
              label="Discount %"
              type="number"
              register={register("discountPercentage")}
            />
            <Input
              label="Quantity"
              type="number"
              register={register("quantity", { required: true })}
              error={errors.quantity}
            />
          </div>

          {/* Image */}
          <div>
            <label className="font-semibold block mb-2">Cover Image</label>
            <input type="file" onChange={handleImageUpload} />
            <input type="hidden" {...register("image", { required: true })} />
            {uploading && (
              <p className="text-sm text-indigo-500">Uploading...</p>
            )}
          </div>

          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full border rounded-xl p-3"
            rows={4}
          />

          {/* Flags */}
          <div className="flex gap-6">
            <Checkbox label="Featured" register={register("featured")} />
            <Checkbox label="Bestseller" register={register("bestseller")} />
            <Checkbox label="New Arrival" register={register("newArrival")} />
          </div>

          {/* SEO */}
          <Input label="Meta Title" register={register("metaTitle")} />
          <textarea
            {...register("metaDescription")}
            placeholder="Meta Description"
            className="w-full border rounded-xl p-3"
            rows={2}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 rounded-2xl font-bold text-lg"
          >
            {isSubmitting ? "Saving..." : "💾 Save Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

/* 🔹 Reusable Components */

const Input = ({
  label,
  register,
  error,
  type = "text",
  className = "",
}: any) => (
  <div className={className}>
    <label className="font-semibold block mb-1">{label}</label>
    <input
      type={type}
      {...register}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
    />
    {error && <p className="text-red-500 text-sm">Required</p>}
  </div>
);

const Select = ({ label, register, options, disabled = false, error }: any) => (
  <div>
    <label className="font-semibold block mb-1">{label}</label>
    <select
      {...register}
      disabled={disabled}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((o: string) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">Required</p>}
  </div>
);

const Checkbox = ({ label, register }: any) => (
  <label className="flex items-center gap-2 font-semibold">
    <input type="checkbox" {...register} />
    {label}
  </label>
);
