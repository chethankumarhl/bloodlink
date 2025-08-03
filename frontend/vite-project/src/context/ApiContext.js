import { createContext, useContext } from 'react';

const ApiContext = createContext(null);

// Custom hook to use context
export const useApi = () => useContext(ApiContext);

export default ApiContext;
