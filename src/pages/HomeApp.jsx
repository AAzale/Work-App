import { ProductList } from "../components/ProductList";
import "../styles/homeApp.css";

const HomeApp = () => {
  return (
    <>
      <header>
        <h1>App Products with Fake Store API</h1>
      </header>

      <ProductList />
    </>
  );
};

export default HomeApp;
