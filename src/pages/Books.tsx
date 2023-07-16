import BookCard from '@/components/BookCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { setPriceRange, toggleState } from '@/redux/features/book/bookSlice';
import { IBook } from '@/types/globalTypes';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function Products() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  const { toast } = useToast();

  const { priceRange, status } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };
  let booksData;

  if (status) {
    booksData = data?.filter(
      (item: { status: boolean; price: number }) =>
        item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    booksData = data?.filter(
      (item: { price: number }) => item.price < priceRange
    );
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
          <div
            onClick={() => dispatch(toggleState())}
            className="flex items-center space-x-2 mt-3"
          >
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
        {booksData?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}