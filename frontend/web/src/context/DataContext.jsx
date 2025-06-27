/**
 * @file Provides a React Context for managing and sharing global application data,
 * such as API URLs and Mars Rover data.
 */

import React, { createContext, useState, useContext } from 'react';

/**
 * React Context for application-wide data.
 * @type {React.Context<object>}
 */
const DataContext = createContext();

/**
 * DataProvider component provides a context for managing and sharing data across the application.
 * It holds the API URL and Mars Rover data, making them accessible to any consuming component.
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the DataProvider.
 * @returns {React.ReactNode} The wrapped child components with access to the data context.
 */
export const DataProvider = ({ children }) => {
  /**
   * The base URL for the API, retrieved from environment variables.
   * @type {string}
   */
  const apiUrl = process.env.REACT_APP_API_URL;
  
  /**
   * State to store Mars Rover data, including details about each rover and its cameras.
   * @type {[object, Function]}
   */
  const [marsRovers, setMarsRovers] = useState({}); // Initialize as an empty object

  return (
    <DataContext.Provider value={{ apiUrl, marsRovers, setMarsRovers }}>
      {children}
    </DataContext.Provider>
  );
};

/**
 * Custom hook to consume the DataContext.
 * Provides convenient access to `apiUrl`, `marsRovers`, and `setMarsRovers`.
 * @returns {object} The context value containing `apiUrl`, `marsRovers`, and `setMarsRovers`.
 */
export const useContextData = () => {
  return useContext(DataContext);
};
