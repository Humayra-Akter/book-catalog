import BookCard from '@/components/BookCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { setYearOfPublish, toggleState } from '@/redux/features/book/bookSlice';
import { IBook } from '@/types/globalTypes';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setSearchQuery } from '@/redux/features/book/bookSlice';

export default function Books() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const { searchQuery } = useAppSelector((state) => state.book);
  const { toast } = useToast();

  const { publication_date, status } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchQuery));
  };

  const handleSlider = (value: number[]) => {
    const year = String(value[0]);
    dispatch(setYearOfPublish(year));
  };

  let booksData;

  if (status) {
    booksData = data?.data?.filter(
      (item: { status: boolean; publication_date: string }) =>
        item.status === true && item.publication_date < publication_date
    );
  } else if (publication_date !== '') {
    booksData = data?.data?.filter(
      (item: { publication_date: string }) =>
        item.publication_date < publication_date
    );
  } else {
    booksData = data?.data;
  }

  let filteredBooksData = booksData;
  if (searchQuery) {
    filteredBooksData = booksData?.filter((book: IBook) => {
      const { title, author, genre } = book;
      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }

  return (
    <div>
      <div>
        <h1
          className="text-2xl uppercase text-center
          pb-14 pt-7 text-blue-900 font-bold"
        >
          Books
        </h1>
      </div>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-blue-200/80 bg-slate-100 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
          <div>
            <h1
              className="text-2xl uppercase text-center
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
            <h1
              className="text-xl text-left
          pt-7 text-blue-900 font-bold"
            >
              Publication year
            </h1>
            <div className="max-w-xl">
              <Slider
                defaultValue={[2023]}
                max={2023}
                min={1800}
                step={1}
                onValueChange={(value) => handleSlider(value)}
              />
            </div>
            <div
              className="text-xs  text-center
           text-blue-900 font-bold"
            >
              From 1800 To {publication_date}$
            </div>
          </div>
          <div className="space-y-3 ">
            {/* Add the search bar */}
            <h1
              className="text-xl text-left
          pt-7 text-blue-900 font-bold"
            >
              Search
            </h1>
            <form onSubmit={handleSearch} className="flex space-x-2">
              <input
                type="text"
                placeholder="Search by title, author or genre"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="border border-gray-300 rounded-md px-4 py-2 h-7 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          </div>
        </div>

        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {filteredBooksData?.length ? (
            filteredBooksData.map((book: IBook) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
        {/* <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {booksData?.map((book: IBook) => (
            <BookCard book={book} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
