import { URL_API } from "../utils/constants";
import useFetch from "../hooks/useFetch";
import ProductItem from "./ProductItem";
import popError from "../utils/popError";
import { Button } from "antd";
import "../styles/productList.css";

export const ProductList = ({ limit, searchProduct }) => {
  const { data, isLoading, onError } = useFetch(
    `${URL_API}/products?limit=${limit}`
  );

  return (
    <>
      <div className="title-loading">
        <h2>Lista de Productos</h2>
        {isLoading ? (
          <Button type="primary" loading>
            Cargando...
          </Button>
        ) : null}
      </div>
      {onError ? popError() : null}
      <div className="product-grip">
        {data.map((product) => {
          if (
            product.title.toLowerCase().includes(searchProduct.toLowerCase())
          ) {
            return (
              <ProductItem
                key={product.id}
                price={product.price}
                {...product}
              />
            );
          }
        })}
      </div>
    </>
  );
};
