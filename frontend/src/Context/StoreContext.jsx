import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((pre) => ({ ...pre, [itemId]: 1 }));
    } else {
      setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }));
  };

  const getTotalCartAmmount = () => {
    let totalAmount = 0;
    for (let items in cartItems) {
      if (cartItems[items] > 0) {
        let itemInfo = food_list.find((product) => product._id === items);
        totalAmount += itemInfo.price * cartItems[items];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmmount,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
