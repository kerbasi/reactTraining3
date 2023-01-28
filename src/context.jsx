import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const watchListUpdate = (symbol) => {
    if (!watchList.includes(symbol)) {
      setWatchList([...watchList, symbol]);
    }
  };

  const deleteStock = (symbol) => {
    setWatchList(watchList.filter((stock) => stock.symbol !== symbol));
  };

  return (
    <AppContext.Provider value={{ watchList, watchListUpdate, deleteStock }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
