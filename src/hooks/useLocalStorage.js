import { useState } from "react";

const useLocalStorage = () => {
  const [value, setValue] = useState("");

  const getState = (stateName) => {
    try {
      const gettingLocalStorage = localStorage.getItem(stateName);
      const parsedValue = JSON.parse(gettingLocalStorage);
      setValue(parsedValue);
      return parsedValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  };

  const setState = (stateName, stateValue) => {
    try {
      localStorage.setItem(stateName, JSON.stringify(stateValue));
      setValue(stateValue);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
      setValue(stateValue);
    }
  };

  return {
    value,
    getState,
    setState,
  };
};

export default useLocalStorage;
