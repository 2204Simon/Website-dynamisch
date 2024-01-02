import React, { createContext, useState, useContext, ReactNode } from "react";

// Schnittstelle für den globalen Zustand
interface LoggedInState {
  loggedIn: boolean;
  changeLoggedIn: () => void;
}

// Erstelle ein Context-Objekt mit dem Typ des globalen Zustands
export const LoggedInContext = createContext<LoggedInState | null>(null);

// Benutzerdefinierter Hook für den globalen Zustand
export const useLoggedIn = (): LoggedInState => {
  const context = useContext(LoggedInContext);

  if (!context) {
    throw new Error(
      "useLoggedIn muss innerhalb des LoggedInProviders verwendet werden"
    );
  }

  return context;
};

// Provider-Komponente, um den globalen Zustand bereitzustellen
export const LoggedInProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true); // Initialer Wert für den globalen Zustand

  // Funktion, um den globalen Zustand zu ändern
  const changeLoggedIn = (): void => {
    setLoggedIn(!loggedIn);
  };

  // Rückgabe des globalen Zustands und der Funktion zum Ändern des Zustands
  const value: LoggedInState = {
    loggedIn,
    changeLoggedIn,
  };

  return (
    <LoggedInContext.Provider value={value}>
      {children}
    </LoggedInContext.Provider>
  );
};
