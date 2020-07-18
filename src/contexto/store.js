import React , { createContext , useContext , useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState , children }) =>(
    <StateContext.Provider value = { useReducer( reducer , initialState )}>
        { children }
    </StateContext.Provider>
);

//para tener acceso a todas la variables de sesion en el contexto.
export const useStateValue = () => useContext(StateContext);