import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export default ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const watchListUpdate = (symbol) => {
    if (!watchList.includes(symbol)) {
      setWatchList([...watchList, symbol]);
    }
  };

  const deleteStock = (symbol) => {
    setWatchList(watchList.filter((stock) => stock !== symbol));
  };

  useEffect(() => {
    console.log(watchList);
  }, [watchList]);

  return (
    <AppContext.Provider value={{ watchList, watchListUpdate, deleteStock }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
