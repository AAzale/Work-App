import { notification } from "antd";
import { useEffect, useState } from "react";

const useFetch = (url, initialState) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const [onError, setOnError] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);
        const info = await fetch(url);
        const parseo = await info.json();

        if (parseo.length > 0) {
          setData(parseo);
          setIsLoading(false);
        }
      })();
    } catch (error) {
      setOnError(true);
      notification.error({
        message: "Error",
        description: "Ocurrio un error al obtener los productos",
        onClick: () => {
          console.log("Notificacion Clicked!");
        },
      });
    }

    return () => {};
  }, [url]);

  return { data, isLoading, onError };
};

export default useFetch;
