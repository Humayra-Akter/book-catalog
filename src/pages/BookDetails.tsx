import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();

  //! Temporary code, should be replaced with redux
  const [data, setData] = useState<IBook[]>([]);
  useEffect(() => {
    fetch('../../public/data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const book = data?.find((item) => item._id === Number(id));

  //! Temporary code ends here

  return (
    <>
      <div className="max-w-7xl mx-auto items-center border-b border-gray-300 pt-12 pb-12">
        <div className="w-[50%] space-y-3">
          <h1 className="text-2xl text-blue-900 font-extrabold">
            {book?.title}
          </h1>
          <p className="font-semibold">Rating: {book?.rating}</p>
          <ul className="space-y-1">
            <small className="text-base text-blue-800 font-bold">
              Features:
            </small>
            {book?.features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button className="w-full h-6 bg-blue-800">Add to cart</Button>
        </div>
      </div>
      <BookReview />
    </>
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
