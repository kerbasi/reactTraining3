import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default ({ children }) => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  const watchListUpdate = (symbol) => {
    if (!watchList.includes(symbol)) {
      setWatchList([...watchList, symbol]);
    }
  };

  return (
    <AppContext.Provider value={{ watchList, watchListUpdate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
