import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

export const StockList = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (symbols) => {
      try {
        const responses = await Promise.all(
          symbols.map((item) =>
            finnHub.get("/quote", {
              params: {
                symbol: item,
              },
            })
          )
        );
        if (isMounted) {
          setStock(responses);
        }
      } catch (err) {}
    };

    fetchData(["GOOGL", "MSFT", "AMZN"]);
    return () => {
      isMounted = false;
    };
  }, []);

  return <div>StockList</div>;
};
