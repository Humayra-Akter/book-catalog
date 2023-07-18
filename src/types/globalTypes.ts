export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  price: number;
  rating: number;
  status: boolean;
  statuss?: 'wishlist' | 'reading' | 'finished' | undefined;
  features: string[];
  quantity?: number;
}
/**"_id": 15,
    "title": "The Chronicles of Narnia",
    "author": "C.S. Lewis",
    "genre": "Fantasy",
    "publication_date": "1950-1956",
    "price": 14.99,
    "status": false,
    "rating": 4.6,
    "features": [
      "Imaginative fantasy world",
      "Christian allegory and moral themes",
      "Adventure and memorable characters"
    ] */
