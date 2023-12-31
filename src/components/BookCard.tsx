import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { addBook } from '@/redux/features/wishlist/wishlistSlice';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const dispatch = useDispatch();

  const handleAddBook = (book: IBook) => {
    dispatch(addToCart(book));
    toast({
      description: 'Book Added',
    });
  };

  const handleAddWishlist = (book: IBook) => {
    const wishlistBook = {
      _id: book._id,
      title: book.title,
      author: book.author,
      statuss: 'wishlist' as 'wishlist' | 'reading' | 'finished',
    };
    dispatch(addBook(wishlistBook));
    toast({
      description: 'Book Added to Wishlist',
    });
  };

  return (
    <div>
      <div className="rounded-2xl h-[300px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2 bg-gray-50">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <h1 className="text-xl text-blue-900 font-bold">{book?.title}</h1>
        </Link>
        <p>Rating: {book?.rating}</p>
        <p className="text-sm font-bold">Author: {book?.author}</p>
        <p className="text-sm">Genre: {book?.genre}</p>
        <p className="text-sm">Publication date: {book?.publication_date}</p>
        <p className="text-sm">
          Availability: {book?.status ? 'In stock' : 'Out of stock'}
        </p>
        <p className="text-sm">Price: {book?.price}</p>
        <Button
          className="w-full h-6 bg-blue-800"
          variant="default"
          onClick={() => handleAddBook(book)}
        >
          Add to cart
        </Button>
        <Button
          className="w-full h-6 bg-blue-800"
          variant="default"
          onClick={() => handleAddWishlist(book)}
        >
          Add to wishlist
        </Button>
      </div>
    </div>
  );
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
