import { createContext, useState, useContext } from "react";
import { auth } from "../config/firebase";
import { database } from "../config/firebase";

export const cartContext = createContext(null);
export const useCart = () => useContext(cartContext);
export const CartProvider = ({ children }) => {
  let [carts_array, setcarts_array] = useState({});

  const addCart = (product) => {
    alert("Cart added Successfully");
    database
      .ref("/ecommerce")
      .child("carts/" + auth.currentUser.uid)
      .push({
        edition: product.edition,
        company: product.company,
        price: product.price,
        picture: product.picture,
        gender: product.gender,
        quantity: 1,
        key: auth.currentUser.uid,
      });
  };

  const value = {
    carts_array: carts_array,
    setcarts_array,
    addCart,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
