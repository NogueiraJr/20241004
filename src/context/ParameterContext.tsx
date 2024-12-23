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
  const [system, setSystem] = useState<string | null>(() => {
    // Carrega o valor inicial do localStorage, se existir
    return localStorage.getItem('system');
  });
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('system');

    // Atualiza o sistema apenas se ele estiver nulo e o parâmetro existir
    if (!system && paramValue) {
      setSystem(paramValue);
      localStorage.setItem('system', paramValue);
    }
  }, [location.search, system]);

  const setParameter = (param: string | null) => {
    setSystem(param);
    if (param) {
      localStorage.setItem('system', param);
    } else {
      localStorage.removeItem('system');
    }
  };

  return (
    <ParameterContext.Provider value={{ system, setParameter }}>
      {children}
    </ParameterContext.Provider>
  );
};
