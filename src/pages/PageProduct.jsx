import { useEffect, useState } from "react";
import { URL_API } from "../utils/constants";

export const PageProduct = (id) => {
  const { dataProduct, isLoading, onError } = usefetch(
    `${URL_API}/products/${id}`
  );

  return <></>;
};