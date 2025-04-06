import BannerCategories from "./ui/BannerCategories";
import 'react-multi-carousel/lib/styles.css';
import Categories from "./ui/Categories";
import HomeBanner from "./ui/HomeBanner";
import Highlights from "./ui/Highlights";
import ProductList from "./ui/ProductList";

function App() {
  return (
    <main>
      <BannerCategories />
      <HomeBanner />
      <Highlights />
      <Categories />
      <ProductList />
    </main>
  );
}

export default App;
