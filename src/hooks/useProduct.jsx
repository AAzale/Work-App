import { useEffect, useState } from "react";

const useProduct = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataRating, setDataRating] = useState([]);
  const [onError, setOnError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const info = await fetch(url);
        const parseo = await info.json();

        if (parseo != null || parseo != undefined) {
          setData(parseo);
          setDataRating(parseo.rating);
          setIsLoading(false);
        }
      } catch (error) {
        setOnError(true);
      }
    })();

    return () => {};
  }, [url]);

  return { data, dataRating, isLoading, onError };
};

export default useProduct;
