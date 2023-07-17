import { Button } from '@/components/ui/button';
import { usePostBookMutation } from '../redux/features/book/bookApi';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import loginImg from '../../src/assets/images/banner.png';

export const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [genre, setGenre] = useState('');

  const [postBook, { isLoading, isError, error }] = usePostBookMutation();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, publicationYear, genre }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Book added successfully');
      } else {
        console.error('Failed to add book:', data.error);
      }
    } catch (error) {
      console.error('Error adding book:', error);
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
          <Input
            id="title"
            className="border-blue-800"
            placeholder="publication year of the book"
            type="text"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            autoCorrect="off"
          />
          <Input
            id="title"
            className="border-blue-800"
            placeholder="publication year of the book"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            autoCorrect="off"
          />
          <Button className="items-center bg-blue-800 w-full h-8" type="submit">
            Add Book
          </Button>
        </form>
      </div>
    </div>
  );
};
