import { useEffect, useReducer } from "react";
import { ProductsContext } from "./context";
import { reducer, initialState } from "./reducer";

export const BACKEND_URL = "http://127.0.0.1:8000";

export const ProductsProvider = ({children}) => {
    const [users, dispatch] = useReducer(reducer, initialState)

    return (
        <ProductsContext.Provider value={{ users, dispatch }}>
            {children}
        </ProductsContext.Provider>
    );
};


export function GetProducts() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`${BACKEND_URL}/product/`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_DATA', payload: data});
            })
    }, [])
    return state.products
}


export function GetOneProduct(product_id) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`${BACKEND_URL}/product/${product_id}/`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_PRODUCT', payload: data});
            })
    }, [])
    return state.products
}


export function GetCart(userID) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`${BACKEND_URL}/cart/?id_user=${userID}`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_CART', payload: data});
            })
    }, [])
    return state.cart
}


export function GetPurchases() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`${BACKEND_URL}/sell/`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_PURCHASE', payload: data});
            })
    }, [])
    return state.purchases
}


export function GetOnePurchase(userId) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`${BACKEND_URL}/sell/?user=${userId}`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_PURCHASE', payload: data});
            })
    }, [])
    return state.purchases
}


export function GetBuys() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`${BACKEND_URL}/status_info/`, {
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_BUYS', payload: data[0]});
            })
    }, [])
    return state.buys
}