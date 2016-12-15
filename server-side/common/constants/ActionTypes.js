import constants from 'flux-constants';

// constants plugin will return object in this format: { ROUTE_CHANGE: "ROUTE_CHANGE" }
// so I don't have to type out duped strings
export default constants([

    "ADD_TO_CART_REQUEST",
    "ADD_TO_CART_SUCCESS",
    "ADD_TO_CART_ERROR",

    "CART_CHECKOUT_REQUEST",
    "CART_CHECKOUT_SUCCESS",
    "CART_CHECKOUT_ERROR",

    "LOAD_ALL_PRODUCTS",
    "LOAD_ONE_PRODUCT",

    "READ_ALL_PRODUCTS_REQUEST",
    "READ_ALL_PRODUCTS_SUCCESS",
    "READ_ALL_PRODUCTS_ERROR",

    "READ_ONE_PRODUCT_REQUEST",
    "READ_ONE_PRODUCT_SUCCESS",
    "READ_ONE_PRODUCT_ERROR",
]);
