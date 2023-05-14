import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [onError, setOnError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const info = await fetch(url);
        const parseo = await info.json();

        if (parseo.length > 0) {
          setData(parseo);
          setIsLoading(false);
        }
      } catch (error) {
        setOnError(true);
      }
    })();

    return () => {};
  }, [url]);

  return { data, isLoading, onError };
};

export default useFetch;
