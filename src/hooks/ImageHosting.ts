import axios from "axios";

interface ImgBBResponse {
  data: {
    display_url: string;
    url: string;
    delete_url: string;
    id: string;
  };
  success: boolean;
  status: number;
}

export const usePhoto = async (imgFile: File): Promise<string> => {
  const key = import.meta.env.VITE_IMAGE_API_KEY as string;

  if (!key)
    throw new Error("Missing VITE_IMAGE_API_KEY in environment variables.");

  const formData = new FormData();
  formData.append("image", imgFile);

  const { data } = await axios.post<ImgBBResponse>(
    `https://api.imgbb.com/1/upload?key=${key}`,
    formData,
  );

  if (!data.success) throw new Error("Image upload failed.");

  return data.data.display_url;
};
