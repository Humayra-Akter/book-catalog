import { Button } from '@/components/ui/button';
import { usePostBookMutation } from '../redux/features/book/bookApi';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import loginImg from '../../src/assets/images/banner.png';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';

export const AddBookForm = () => {
  // const book = useSelector((state) => state.book);
  const [postBook, { isLoading, isError, error }] = usePostBookMutation();

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('');
  const [features, setFeatures] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBook = {
      title,
      author,
      genre,
      publication_date: publicationYear,
      price: Number(price),
      rating: Number(rating),
      status: status === 'true',
      features: features.split(','),
      quantity: Number(quantity),
    };

    try {
      const response = await postBook(newBook).unwrap();
      toast({
        description: 'Book added successfully',
      });
    } catch (error) {
      toast({
        description: 'Error adding book',
      });
    }
  };

  return (
    <div
      style={{
        background: `url(${loginImg})`,
        backgroundSize: 'cover',
      }}
    >
      <div>
        <h1
          className="text-2xl uppercase text-center
          pb-14 pt-7 text-blue-900 font-bold"
        >
          Add Books
        </h1>
      </div>
      <div className="col-span-3 z mx-96 space-y-5 border rounded-2xl border-blue-200/80 bg-blue-100 p-5 self-start sticky top-16 h-[calc(100vh-80px)] ">
        <form className="space-y-3 py-3" onSubmit={handleSubmit}>
          <Input
            id="title"
            className="border-blue-800"
            placeholder="title of the book"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoCorrect="off"
            required
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="author of the book"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            autoCorrect="off"
            required
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="publication year of the book"
            max={2023}
            min={1800}
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            autoCorrect="off"
            required
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="genre of the book"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            autoCorrect="off"
            required
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="price of the book 30-150"
            type="number"
            value={price}
            max={150}
            min={30}
            onChange={(e) => setPrice(e.target.value)}
            autoCorrect="off"
            required
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="Rate the book from 0-5"
            type="number"
            max={5}
            min={0}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            autoCorrect="off"
            required
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="in stock? yes or no"
            type="boolean"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            autoCorrect="off"
            required
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="features of the book"
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            autoCorrect="off"
            required
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="quantity of the book"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            autoCorrect="off"
            required
          />
          <div className="flex gap-5">
            <Button
              type="submit"
              className="items-center bg-blue-800 w-full h-8"
            >
              Add Book
            </Button>
            <Button
              className="items-center bg-blue-800 w-full h-8"
              type="submit"
            >
              Edit Book
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
