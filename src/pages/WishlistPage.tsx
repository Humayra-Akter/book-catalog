import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addBook,
  updateBookStatus,
  removeBook,
} from '../redux/features/wishlist/wishlistSlice';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WishlistPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const books = useSelector((state: RootState) => state.wishlist.books);
  const dispatch = useDispatch();

  const handleAddBook = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newBook = {
      _id: '',
      title,
      author,
      statuss: 'wishlist' as 'wishlist' | 'reading' | 'finished',
    };
    dispatch(addBook(newBook));
    setTitle('');
    setAuthor('');
  };

  const handleUpdateStatus = (id: string, statuss: 'reading' | 'finished') => {
    dispatch(updateBookStatus({ id, statuss }));
  };

  const handleRemoveBook = (id: string) => {
    dispatch(removeBook(id));
  };

  return (
    <div>
      <div>
        <h1
          className="text-2xl uppercase text-center
          pb-14 pt-7 text-blue-900 font-bold"
        >
          My Wishlist
        </h1>
      </div>{' '}
      <div className="col-span-3 z mx-96 space-y-5 border rounded-2xl border-blue-200/80 bg-blue-100 p-5 self-start sticky top-16 pb-24">
        <form className="space-y-3 py-3" onSubmit={handleAddBook}>
          <Input
            id="title"
            className="border-blue-800"
            placeholder="title of the book"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoCorrect="off"
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="author of the book"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            autoCorrect="off"
          />
          <Button
            onClick={handleAddBook}
            className="items-center bg-blue-800 w-full h-8"
            type="submit"
          >
            Add to wishlist
          </Button>
        </form>
      </div>
      <ul>
        {books.map((book) => (
          <li
            key={book._id}
            className="text-xl font-bold py-9 text-center uppercase"
          >
            {book.title} by {book.author}
            {book.statuss === 'wishlist' && (
              <div className="flex mx-28 pt-7 space-x-24">
                <Button
                  className="items-center bg-blue-800 w-full h-8"
                  onClick={() => handleUpdateStatus(book._id, 'reading')}
                >
                  Start Reading
                </Button>
                <Button
                  className="items-center bg-red-800 w-full h-8"
                  type="submit"
                  onClick={() => handleRemoveBook(book._id)}
                >
                  Remove
                </Button>
              </div>
            )}
            {book.statuss === 'reading' && (
              <div className="flex  mx-28 pt-7 space-x-24">
                <Button
                  className="items-center bg-blue-800 w-full h-8"
                  onClick={() => handleUpdateStatus(book._id, 'finished')}
                >
                  Finish Reading
                </Button>
                <Button
                  className="items-center bg-red-800 w-full h-8"
                  onClick={() => handleRemoveBook(book._id)}
                >
                  Remove
                </Button>
              </div>
            )}
            {book.statuss === 'finished' && (
              <Button
                className="items-center bg-red-800 space-x-1 w-1/2 h-8"
                onClick={() => handleRemoveBook(book._id)}
              >
                Remove
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
