import { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = ({ symbol, stockData }) => {
  const { day, week, year } = stockData;
  const [dateFormat, setDateFormat] = useState("24h");

  const determinateDate = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
    }
  };

  const options = {
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determinateDate(),
    },
  ];

  const setButtonClass = (button) => {
    const classes = "btn m-1 ";
    if (dateFormat === button) {
      return classes + "btn-primary";
    }
    return classes + "btn-outline-primary";
  };

  return (
    <div className='mt-5 p-4 shadow-sm bg-white'>
      <Chart options={options} series={series} type='area' width='100%' />
      <div>
        <button
          className={setButtonClass("24h")}
          onClick={() => {
            setDateFormat("24h");
          }}
        >
          24h
        </button>
        <button
          className={setButtonClass("7d")}
          onClick={() => {
            setDateFormat("7d");
          }}
        >
          7d
        </button>
        <button
          className={setButtonClass("1y")}
          onClick={() => {
            setDateFormat("1y");
          }}
        >
          1y
        </button>
      </div>
    </div>
  );
};
