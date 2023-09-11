import React, { createContext, useReducer, useEffect, useState } from "react";
import { useGetDataByCollection } from "../../hooks";

const ProductsContext = createContext({});
 
const ProductsProvider = ({ children }) => {
  const [refreshProducts, setRefreshProducts] = useState(false);
 
  const [productTypes] = useGetDataByCollection("cuisines")

   

  const value = {
    refreshProducts,
    setRefreshProducts,
    productTypes
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
