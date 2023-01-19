import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default ({ children }) => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  return (
    <AppContext.Provider value={{ watchList, setWatchList }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
