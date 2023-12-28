import React, { createContext, useEffect, useState } from 'react'
export const CryptoContext = createContext()

export const CryptoContextProvider = ({children}) => {
 const [currency, setCurrency] = useState("INR")
const [symbol, setSymbol] = useState("₹")

useEffect(()=>{

    if(currency === "INR")setSymbol("₹")
    else if (currency === "USD") setSymbol("$")
},[currency])


  return <CryptoContext.Provider value={{currency, setCurrency, symbol }}>{children}</CryptoContext.Provider>
  
}

