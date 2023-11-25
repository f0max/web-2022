import {createContext} from "react";
import {initialState} from "./reducer";

export const ProductsContext = createContext(initialState);