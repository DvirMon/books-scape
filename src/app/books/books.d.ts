export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publishedDate: string;
  imageLinks: ImageLinks,
  categories: string[];
}

export interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}
