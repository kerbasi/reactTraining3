import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

const formatData = (data) => {
  if (data.t) {
    return data.t.map((t, index) => {
      return {
        x: t * 1000,
        y: Math.floor(data.c[index]),
      };
    });
  }
  return null;
};

export const StockDetailPage = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const date = new Date();
      const today = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = today - 24 * 60 * 60 * 2;
      } else if (date.getDay() === 0) {
        oneDay = today - 24 * 60 * 60 * 3;
      } else {
        oneDay = today - 24 * 60 * 60;
      }
      const oneWeek = today - 24 * 60 * 60 * 7;
      const oneYear = today - 24 * 60 * 60 * 365;
      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              resolution: 30,
              from: oneDay,
              to: today,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              resolution: 60,
              from: oneWeek,
              to: today,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              resolution: "W",
              from: oneYear,
              to: today,
            },
          }),
        ]);
        if (isMounted) {
          setStockData({
            day: formatData(responses[0].data),
            week: formatData(responses[1].data),
            year: formatData(responses[2].data),
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);

  return (
    <div>
      {stockData && (
        <div>
          <StockChart stockData={stockData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </div>
  );
};
