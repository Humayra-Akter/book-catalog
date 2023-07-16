import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.png';
import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto">
        <div className="relative -right-14">
          <img className="w-2/3 " src={banner} alt="" />
        </div>
        <div>
          <h1 className="text-6xl text-blue-900 font-black mb-2">
            HIAKO <br /> Book Catalog
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Effortless communication at your fingertips
          </p>
          <div className="text-primary mt-20">
            <p>Bluetooth 5.2 for easy, secure communication</p>
            <p>Precise 143 Amoled display for clear visuals</p>
          </div>
          <Button className="mt-5 bg-blue-800 w-full h-8">Learn more</Button>
        </div>
      </div>
      <div className="mb-96">
        <div>
          <img className="mx-auto" src={hero} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
            The house of knowledge is here
          </h1>
          <Button className="mt-10 bg-blue-800 w-1/3 h-8" asChild>
            <Link to="/books">Brows all books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
