export interface TBook {
  title: string;
  author: string;
  publisher?: string;
  bookLanguage?: string;
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
  description?: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}


export interface BookFormData {
  title: string;
  author: string;
  publisher?: string;
  bookLanguage?: string;
  pages?: number;
  edition?: string;
  publicationDate?: string;
  category: string;
  subCategory?: string;
  tags?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  quantity: number;
  image: string;
  description?: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}