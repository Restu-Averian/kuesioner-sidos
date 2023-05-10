import { createContext, useContext } from "react";

const SDContext = createContext({});

const useSDContext = () => useContext(SDContext);

export { useSDContext };
export default SDContext;
