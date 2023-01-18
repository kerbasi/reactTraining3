﻿import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) =>
            finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            })
          )
        );

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        if (isMounted) {
          setStock(data);
        }
      } catch (err) {}
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return <div>StockList</div>;
};
