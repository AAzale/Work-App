import { URL_API } from "../utils/constants";
import { useParams } from "react-router-dom";
import { Rate, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import useProduct from "../hooks/useProduct";
import popError from "../utils/popError";
import "../styles/pageProduct.css";

const PageProduct = () => {
  const { productID } = useParams();
  const { data, dataRating, isLoading, onError } = useProduct(
    `${URL_API}/products/${productID}`
  );

  function truncPrice() {
    return Math.fround(
      (data.price * Math.pow(10, 2)) / Math.pow(10, 2)
    ).toFixed(2);
  }

  return (
    <>
      {onError ? popError() : null}
      <div className="page-product">
        <div className="pg-product-navbtt">
          <Button
            className="bt-red-color"
            type="primary"
            shape="circle"
            icon={<HomeOutlined />}
            href="/"
          ></Button>

          {isLoading ? (
            <Button className="bt-red-color" type="primary" loading>
              Cargando...
            </Button>
          ) : null}

          <Button className="bt-red-color" type="primary" size="large">
            Actulizar Producto
          </Button>
        </div>

        {isLoading ? null : (
          <div key={data.id} className="pg-product-box">
            <h1 className="pg-product-title">{data.title}</h1>
            <div className="pg-product-img">
              <img src={data.image} />
            </div>

            <span className="pg-product-descripcion">
              Descripción: <span className="">{data.description}</span>
            </span>

            <div className="pg-product-stats-box">
              <div className="pg-product-stats">
                <div className="pg-product-price pg-flex-col">
                  Precio<span className="">{truncPrice()} $</span>
                </div>
                <div className="pg-product-rate">
                  <span className="pg-flex-col">
                    Rate
                    <Rate disabled defaultValue={dataRating.rate} />
                  </span>
                </div>
              </div>

              <div className="pg-product-stats">
                <div className="pg-product-cat pg-flex-col">
                  Categoría<span className="">{data.category}</span>
                </div>

                <span className="pg-product-count pg-flex-col">
                  Cantidad<span className="">{dataRating.count}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PageProduct;
