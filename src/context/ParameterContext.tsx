import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ParameterContextType {
  system: string | null;
  itemTypeId: string | null;
  userId: string | null;
  setParameter: (key: 'system' | 'userId', value: string | null) => void;
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
    return localStorage.getItem('system');
  });
  const [itemTypeId, setItemTypeId] = useState<string | null>(() => {
    return localStorage.getItem('itemTypeId');
  });
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('userId');
  });
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('system');
    const itemTypeIdValue = queryParams.get('itemTypeId');
    const userIdValue = queryParams.get('userId');

    if (!system && paramValue) {
      setSystem(paramValue);
      localStorage.setItem('system', paramValue);
    }

    if (!itemTypeId && itemTypeIdValue) {
      setItemTypeId(itemTypeIdValue);
      localStorage.setItem('itemTypeId', itemTypeIdValue);
    }

    if (!userId && userIdValue) {
      setUserId(userIdValue);
      localStorage.setItem('userId', userIdValue);
    }
  }, [location.search, system, itemTypeId, userId]);

  const setParameter = (key: 'system' | 'userId', value: string | null) => {
    if (key === 'system') {
      setSystem(value);
      if (value) {
        localStorage.setItem('system', value);
      } else {
        localStorage.removeItem('system');
      }
    } else if (key === 'userId') {
      setUserId(value);
      if (value) {
        localStorage.setItem('userId', value);
      } else {
        localStorage.removeItem('userId');
      }
    }
  };

  return (
    <ParameterContext.Provider value={{ system, itemTypeId, userId, setParameter }}>
      {children}
    </ParameterContext.Provider>
  );
};
