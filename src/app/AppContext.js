// AppContext.js
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState(null);

  return (
    <AppContext.Provider value={{ alertMessage, setAlertMessage }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
