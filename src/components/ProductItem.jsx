import { useEffect } from "react";
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

  return (
    <>
      <div key={id} className="product-item">
        <h2 className="product-title">{title}</h2>
        <div className="product-image">
          <img src={image} />
        </div>

        <span className="bold-text">Descripcion:</span>
        <p className="product-description">{description}</p>

        <div className="product-others">
          <p>Categoría: <span className="bold-text">{category}</span></p>
          <p>Precio: <span className="bold-text">{price}</span></p>
          <div className="product-rate-count">
            <span>Calificación: <span className="bold-text">{rate}</span></span>
            <span>Cantidad: <span className="bold-text">{count}</span></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
