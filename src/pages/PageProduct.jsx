import { URL_API } from "../utils/constants";
import { useParams } from "react-router-dom";
import { Rate, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import useProduct from "../hooks/useProduct";
import popError from "../utils/popError";
import "../styles/pageProduct.css";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

const PageProduct = () => {
  const { productID } = useParams();
  const { data } = useFetch(`${URL_API}/products/categories`);
  const { dataProduct, dataRating, isLoading, onError } = useProduct(
    `${URL_API}/products/${productID}`
  );

  const [isEditing, setIsEditing] = useState(false);

  function truncPrice() {
    return Math.fround(
      (dataProduct.price * Math.pow(10, 2)) / Math.pow(10, 2)
    ).toFixed(2);
  }

  function changeEditState() {
    setIsEditing(!isEditing);
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

          <Button
            className="bt-red-color"
            type="primary"
            size="large"
            onClick={changeEditState}
          >
            {isEditing ? "Cerrar Actulización" : "Actulizar Producto"}
          </Button>
        </div>

        {isLoading ? null : (
          <div key={data.id} className="pg-product-box">
            <header>
              <h1 className="pg-product-title">{dataProduct.title}</h1>
            </header>

            <div className="pg-product-img">
              <img src={dataProduct.image} />
            </div>

            <span className="pg-product-descripcion">
              Descripción: <span className="">{dataProduct.description}</span>
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
                  Categoría<span className="">{dataProduct.category}</span>
                </div>

                <span className="pg-product-count pg-flex-col">
                  Cantidad<span className="">{dataRating.count}</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {isEditing ? (
          <div className="up-product-box">
            <header>
              <h1>Actualizar Producto</h1>
            </header>

            <form key={dataProduct.id} className="up-product-form">
              <div className="up-item-form">
                <label className="up-label-form" htmlFor="product-title">
                  Nombre:
                </label>
                <div className="div-input">
                  <input
                    className="up-input-form"
                    type="text"
                    id="product-title"
                    name="product-title"
                    defaultValue={dataProduct.title}
                    required
                  />
                </div>
              </div>

              <div className="up-item-form">
                <label className="up-label-form" htmlFor="product-description">
                  Descripción:
                </label>
                <div className="div-input">
                  <textarea
                    className="up-input-form"
                    type="text"
                    id="product-description"
                    name="product-description"
                    defaultValue={dataProduct.description}
                    required
                  />
                </div>
              </div>

              <div className="up-item-form">
                <label className="up-label-form" htmlFor="product-price">
                  Precio:
                </label>
                <div className="div-input">
                  <input
                    className="up-input-form"
                    type="number"
                    id="product-price"
                    name="product-price"
                    defaultValue={truncPrice()}
                    required
                  />
                </div>
              </div>

              <div className="up-item-form">
                <label className="up-label-form" htmlFor="product-cat">
                  Categoría:
                </label>
                <div className="div-input">
                  <select
                    className="up-input-form"
                    id="product-cat"
                    name="product-cat"
                    defaultValue={dataProduct.category}
                    required
                  >
                    {data.map((categories) => {
                      return (
                        <option
                          className="up-input-option"
                          key={categories}
                          value={categories}
                        >
                          {categories.charAt(0).toUpperCase() +
                            categories.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="up-item-form">
                <label className="up-label-form" htmlFor="product-image">
                  URL Imagen:
                </label>
                <div className="div-input">
                  <input
                    className="up-input-form"
                    type="text"
                    id="product-image"
                    name="product-image"
                    defaultValue={dataProduct.image}
                    required
                  />
                </div>
              </div>

              <div className="up-product-navbtt">
                <button type="reset">Reiniciar formulario</button>
                <button type="submit">Enviar formulario</button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PageProduct;
