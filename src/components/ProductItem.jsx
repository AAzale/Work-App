import { useEffect, useState } from "react";
import "../styles/productItem.css";

const ProductItem = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating: { rate, count },
}) => {
  function truncPrice() {
    return Math.fround((price * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
  }

  return (
    <>
      <div key={id} className="product-card">
        <h3 className="product-title">{title}</h3>
        <div className="product-image">
          <img src={image} />
        </div>

        <span className="bold-text">Descripcion:</span>
        <p className="product-description">{description}</p>

        <div>
          <p className="product-category">
            Categoría: <span className="bold-text">{category}</span>
          </p>
          <p>
            Precio: <span className="bold-text">{truncPrice()}</span>
          </p>
          <div className="product-rate-count">
            <span>
              Calificación: <span className="bold-text">{rate}</span>
            </span>
            <span>
              Cantidad: <span className="bold-text">{count}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
