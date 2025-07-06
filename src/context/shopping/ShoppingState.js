import { useReducer, useEffect, useMemo } from "react";
import ShoppingContext from "./shoppingContext";
import  { shoppingReducer } from "./shoppingReducer" ;
import { auth } from "../../Firebase"; // Firebase auth

const initialState = { basket: [], user: null };

const ShoppingState = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  // Sync Firebase user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({ type: "SET_USER", payload: authUser || null });
    });
    return () => unsubscribe();
  }, []);

  // Actions
  const addToBasket = (item) => {
    dispatch({ type: "ADD_TO_BASKET", payload: item });
  };

  const removeFromBasket = (item) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: item });
  };

  const emptyBasket = () => {
    dispatch({ type: "EMPTY_BASKET" });
  };

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => amount + Number(item.price || 0), 0);

  };

  // Memoized context value
  const contextValue = useMemo(() => ({
    basket: state.basket,
    user: state.user,
    addToBasket,
    removeFromBasket,
    emptyBasket,
    setUser,
    getBasketTotal,
  }), [state]);

  return (
    <ShoppingContext.Provider value={contextValue}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingState;
