import { useState } from "react";
import { ProductList } from "../components/ProductList";
import "../styles/homeApp.css";
import { InputNumber } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";

const HomeApp = () => {
  const [limitNumber, setLimitNumber] = useState(20);
  const [searchProduct, setSearchProduct] = useState("");
  const { Search } = Input;

  const onChangeLimit = (integerLimit) => {
    setLimitNumber(integerLimit);
  };

  const onSearch = (product) => {
    setSearchProduct(product);
  };

  console.log("Limit: ", limitNumber);

  return (
    <>
      <header>
        <h1>FakeStore API - Productos</h1>
      </header>

      <div className="box-search-limit">
        <div className="limit-products">
          <h3>Limitar cantidad de Producto: </h3>
          <InputNumber
            min={1}
            max={100}
            defaultValue={20}
            onChange={onChangeLimit}
          />
        </div>

        <div className="search-products">
          <Search
            placeholder="Introduce tu búsqueda"
            allowClear
            enterButton="Buscar"
            size="large"
            onSearch={onSearch}
          />
        </div>

        <div className="button-products">
          <Button type="primary" size="large">
            <Link to={"/src/pages/NewProduct.jsx"}>Añadir Producto</Link>
          </Button>
          <Button type="primary" size="large">
            Actulizar Producto
          </Button>
        </div>
      </div>

      <ProductList limit={limitNumber} searchProduct={searchProduct} />
    </>
  );
};

export default HomeApp;
