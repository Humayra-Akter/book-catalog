import BookCard from '@/components/BookCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';

export default function Books() {
  const [data, setData] = useState<IBook[]>([]);
  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const { toast } = useToast();

  //! Dummy Data

  const status = true;
  const priceRange = 100;

  //! **

  const handleSlider = (value: number[]) => {
    console.log(value);
  };

  let booksData;

  if (status) {
    booksData = data.filter(
      (item) => item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    booksData = data.filter((item) => item.price < priceRange);
  } else {
    booksData = data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1
            className="text-xl uppercase text-center
          py-6 text-blue-900 font-bold"
          >
            Availability
          </h1>
          <div className="flex items-center space-x-2 mt-3">
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {booksData?.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
