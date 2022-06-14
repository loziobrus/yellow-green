import React, { useContext, useState } from "react";
import { FiboCoordinates } from "../utils/fibonacciHelper";
import { dataIncrement, dataReset, getMockData } from "../utils/dataHelper";

const DataContext = React.createContext<number[][]>([]);
const DataUpdateContext = React.createContext<Function>(() => {});
const DataResetContext = React.createContext<Function>(() => {});

export const useDataContext = () => {
  return useContext(DataContext);
}

export const useDataContextUpdate = () => {
  return useContext(DataUpdateContext);
}

export const useDataContextReset = () => {
  return useContext(DataResetContext);
}

export const DataProvider = ({ children }: any) => {
  const [data, setData] = useState<number[][]>(getMockData());

  const updateData = (i: number, j: number) => {
    dataIncrement(data, setData, i, j); 
  }

  const resetData = (fibo: FiboCoordinates[]) => {
    dataReset(data, setData, fibo); 
  }

  return (
    <DataContext.Provider value={data}>
      <DataUpdateContext.Provider value={updateData}>
        <DataResetContext.Provider value={resetData}>
          {children}
        </DataResetContext.Provider>
      </DataUpdateContext.Provider>
    </DataContext.Provider>
  );
}
