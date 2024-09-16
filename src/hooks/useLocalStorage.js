import { useState } from "react";

const useLocalStorage = () => {
  const [value, setValue] = useState("");

  const getState = (stateName) => {
    const gettingLocalStorage = localStorage.getItem(stateName);
    setValue(JSON.parse(gettingLocalStorage));
    return JSON.parse(gettingLocalStorage);
  };

  const setState = (stateName, stateValue) => {
    try {
      localStorage.setValue(stateName, JSON.stringify(stateValue));
    } catch (e) {
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
