import useFetch from "../hooks/useFetch";
import { URL_API } from "../utils/constants";
import ProductItem from "./ProductItem";
import "../styles/productList.css";

export const ProductList = () => {
  const { data, isLoading, onError } = useFetch(`${URL_API}/products`);
  console.log("DATA: ", data);
  return (
    <>
      <h2>Lista de Productos</h2>
      {isLoading ? <h2>Cargando...</h2> : null}
      <div className="product-grip">
        {data.map((product) => {
          return (
            <ProductItem key={product.id} price={product.price} {...product} />
          );
        })}
      </div>
    </>
  );
};
