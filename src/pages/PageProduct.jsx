import { useEffect, useState } from "react";
import { URL_API } from "../utils/constants";

const PageProduct = (id) => {
  const { dataProduct, isLoading, onError } = usefetch(
    `${URL_API}/products/${id}`
  );

  return <></>;
};

export default PageProduct;
