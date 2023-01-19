﻿import { useState, useEffect } from "react";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { useAppContext } from "../context";
import finnHub from "../apis/finnHub";

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const { watchList, setWatchList } = useAppContext();
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
  }, [watchList]);

  const changeColor = (change) => {
    return change > 0 ? "success" : change < 0 ? "danger" : "";
  };

  const renderIcon = (change) => {
    return change > 0 ? (
      <BsFillCaretUpFill />
    ) : change < 0 ? (
      <BsFillCaretDownFill />
    ) : (
      ""
    );
  };

  const data = useAppContext();
  console.log(data);

  return (
    <div>
      <table className='table table-hover table-striped m5-5'>
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Chg</th>
            <th scope='col'>Chg%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            return (
              <tr
                className='table-row'
                style={{ cursor: "pointer" }}
                key={stockData.symbol}
              >
                <th scope='row'>{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d} {renderIcon(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp} {renderIcon(stockData.data.dp)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
