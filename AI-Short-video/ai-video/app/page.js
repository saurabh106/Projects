import { Cards } from "./_components/Cards";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
export default function Home() {
  return (
    <div className="md:px-16 lg:px-24 xl:px=36">
    {/* <Header/> */}
    <Header/>

    {/* Hero */}
    <Hero/>

    <Cards/>

    <Footer/>
    </div>
  );
}
