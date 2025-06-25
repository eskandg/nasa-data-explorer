import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

/**
 * DataProvider component provides a context for managing and sharing data across the application.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the DataProvider.
 * @returns {ReactNode} The wrapped child components.
 */
export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={{}}>
      {children}
    </DataContext.Provider>
  );
};

export const useContextData = () => {
  return useContext(DataContext);
};
