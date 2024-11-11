// src/context/ParameterContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ParameterContextType {
  system: string | null;
  setParameter: (param: string | null) => void;
}

const ParameterContext = createContext<ParameterContextType | undefined>(undefined);

export const useParameter = () => {
  const context = useContext(ParameterContext);
  if (!context) {
    throw new Error("useParameter must be used within a ParameterProvider");
  }
  return context;
};

interface ParameterProviderProps {
  children: ReactNode;
}

export const ParameterProvider: React.FC<ParameterProviderProps> = ({ children }) => {
  const [system, setParameter] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('system'); 

    if (system === null && paramValue) {
      setParameter(paramValue);
    }
  }, [location.search, system]);

  return (
    <ParameterContext.Provider value={{ system, setParameter }}>
      {children}
    </ParameterContext.Provider>
  );
};
