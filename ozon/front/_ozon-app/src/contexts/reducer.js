export const initialState = {
    products:[],
    cart:[],
    purchases:[],
    buys:[[]]
};

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {
                products: action.payload
            }

        case 'GET_PRODUCT':
            return {
                products: action.payload
            }

        case 'GET_CART':
            return {
                cart: action.payload
            }
        case 'GET_PURCHASE':
            return {
                purchases: action.payload
            }
        case 'GET_BUYS':
            return {
                buys: action.payload
            }

        default:
            return state
    }
}