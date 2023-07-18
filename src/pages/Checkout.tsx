import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';

export default function Checkout() {
  const { books, total } = useAppSelector((state) => state.cart);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10">
      <div className="max-w-lg w-full">
        <h1
          className="mb-2 text-2xl uppercase text-center
          py-6 text-blue-900 font-bold"
        >
          Order Summery
        </h1>
        <div className="border border-gray-300 rounded-md h-[60vh] p-10 flex flex-col">
          <div className="flex-grow  mb-2 space-y-2 overflow-auto">
            {books.map((book) => (
              <div className="flex justify-between items-center bg-gray-100 p-1 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={book.author}
                    className="h-[82px] rounded-md mr-2"
                    alt=""
                  />
                  <div>
                    <h1 className="text-lg mb-2">{book.title}</h1>
                    <p>Price: {book.price}</p>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl mr-5">{book.quantity}</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-lg">
              <p>Subtotal</p>
              <p> {total.toFixed(2)}$</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Delivery</p>
              <p>103$</p>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <p>Total</p>
              <p> {(total + 100).toFixed(2)} $</p>
            </div>

            <Button className="w-full bg-blue-700">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
