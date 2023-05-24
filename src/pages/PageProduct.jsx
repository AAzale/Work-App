import { URL_API } from "../utils/constants";
import { useParams } from "react-router-dom";
import { Rate, Button } from "antd";
import { HomeOutlined, DeleteOutlined } from "@ant-design/icons";
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
  const [onErrorUpload, setOnErrorUpload] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [onErrorDelete, setOnErrorDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  function truncPrice() {
    return Math.fround(
      (dataProduct.price * Math.pow(10, 2)) / Math.pow(10, 2)
    ).toFixed(2);
  }

  function changeEditState() {
    setIsEditing(!isEditing);
  }

  const onFinish = async (value) => {
    setIsLoadingUpload(true);

    const form = value.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const info = await fetch(`${URL_API}/products/${dataProduct.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: formJson.productTitle,
          price: formJson.productPrice,
          description: formJson.productDescription,
          image: formJson.productImage,
          category: formJson.productCat,
        }),
      });

      const parseo = await info.json();
      if (parseo != null) {
        setTimeout(setIsLoadingUpload(false), 8.0 * 1000);
      }
    } catch (error) {
      setOnErrorUpload(true);
    }
  };

  const deleteProduct = async () => {
    setIsLoadingDelete(true);
    try {
      const info = await fetch(`${URL_API}/products/${dataProduct.id}`, {
        method: "DELETE",
      });

      const parseo = await info.json();
      if (parseo != null) {
        setTimeout(setIsLoadingDelete(false), 8.0 * 1000);
        console.log("DELETE DATA: ", parseo);
      }
    } catch (error) {
      setOnErrorDelete(true);
    }
  };

  return (
    <>
      {onError || onErrorUpload || onErrorDelete ? popError() : null}
      <div className="page-product">
        <div className="pg-product-navbtt">
          <Button
            className="bt-red-color"
            type="primary"
            shape="circle"
            icon={<HomeOutlined />}
            href="/"
          ></Button>

          {isLoading || isLoadingUpload || isLoadingDelete ? (
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

        {isLoading || isEditing ? null : (
          <div key={dataProduct.id} className="pg-product-box">
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

            <form
              key={dataProduct.id}
              className="up-product-form"
              onSubmit={onFinish}
            >
              <div className="up-item-form">
                <label className="up-label-form" htmlFor="productTitle">
                  Nombre:
                </label>
                <div className="div-input">
                  <input
                    className="up-input-form"
                    type="text"
                    id="productTitle"
                    name="productTitle"
                    defaultValue={dataProduct.title}
                    required
                  />
                </div>
              </div>

              <div className="up-item-form">
                <label className="up-label-form" htmlFor="productDescription">
                  Descripción:
                </label>
                <div className="div-input">
                  <textarea
                    className="up-input-form"
                    type="text"
                    id="productDescription"
                    name="productDescription"
                    defaultValue={dataProduct.description}
                    required
                  />
                </div>
              </div>

              <div className="up-item-form">
                <label className="up-label-form" htmlFor="productPrice">
                  Precio:
                </label>
                <div className="div-input">
                  <input
                    className="up-input-form"
                    type="number"
                    id="productPrice"
                    name="productPrice"
                    defaultValue={truncPrice()}
                    required
                  />
                </div>
              </div>

              <div className="up-item-form">
                <label className="up-label-form" htmlFor="productCat">
                  Categoría:
                </label>
                <div className="div-input">
                  <select
                    className="up-input-form"
                    id="productCat"
                    name="productCat"
                    defaultValue={dataProduct.category}
                    required
                  >
                    {data.map((categories) => {
                      return (
                        <option key={categories} value={categories}>
                          {categories.charAt(0).toUpperCase() +
                            categories.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="up-item-form">
                <label className="up-label-form" htmlFor="productImage">
                  URL Imagen:
                </label>
                <div className="div-input">
                  <input
                    className="up-input-form"
                    type="text"
                    id="productImage"
                    name="productImage"
                    defaultValue={dataProduct.image}
                    required
                  />
                </div>
              </div>

              <div className="up-product-navbtt">
                <Button
                  className="bt-red-color"
                  type="primary"
                  htmlType="submit"
                >
                  Completar
                </Button>

                <Button htmlType="reset">Resetear</Button>

                <Button
                  className="bt-red-color"
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  href="/"
                  onClick={deleteProduct}
                ></Button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PageProduct;
