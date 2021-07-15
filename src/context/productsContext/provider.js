import React, { createContext, useReducer, useEffect, useState } from "react";

const ProductsContext = createContext({});
 
const ProductsProvider = ({ children }) => {
  const [refreshProducts, setRefreshProducts] = useState(false);

  const value = {
    refreshProducts,
    setRefreshProducts,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
