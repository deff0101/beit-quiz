import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  let isLoading = data == null ? true : false;
  useEffect(() => {
    console.log("useFetch called");
    let abort = false;
    if (`${url}`) {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          if (!abort) {
            setData(json);
          }
          return () => {
            abort = true;
          };
        });
    }
  }, [url]);

  return [data, isLoading];
}
