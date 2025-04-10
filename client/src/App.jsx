import BannerCategories from "./ui/BannerCategories";
import 'react-multi-carousel/lib/styles.css';
import Categories from "./ui/Categories";
import HomeBanner from "./ui/HomeBanner";
import Highlights from "./ui/Highlights";
import ProductList from "./ui/ProductList";
import DiscountBanner from "./ui/DiscountBanner";

function App() {
  return (
    <main>
      <BannerCategories />
      <HomeBanner />
      <Highlights />
      <Categories />
      <ProductList />
      <DiscountBanner />
    </main>
  );
}

export default App;
