import React, { createContext, useContext, useState,useEffect } from 'react';

const Context = createContext();

const Contextprovider = ({ children }) => {
    const [user,setuser]=useState({});
    return  (
        <Context.Provider value={{user,setuser}}>
            {children}
        </Context.Provider>
    );
}
const useAppContext=()=>{
    return useContext(Context);
}

export { Contextprovider , useAppContext };