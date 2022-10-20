import React, { useEffect, useState } from "react";
import Inventory from "./Inventory";
import Cart from "./Cart";
import { Provider } from "react-redux";
import store from "./store";
import BuyNow from "./BuyNow";
import { location } from "components/NavigationHooks";

export default View;

function View() {
  const [isBuying, setIsBuying] = useState(false);
  const [doEditCart, setDoEditCart] = useState(false);
  useEffect(componentDidUpdate, [location]);

  return (
    <>
      <Provider store={store}>
        {!isBuying && <Cart />}
        {!isBuying && <Inventory />}
        {isBuying && <BuyNow editCart={handleEdit} />}
        {doEditCart && (
          <Cart
            hideIcon={true}
            hideCart={false}
            disableBuyButton={true}
            onClose={handleClose}
          />
        )}
      </Provider>
    </>
  );

  function componentDidUpdate() {
    if (location.pathname === "/skill7-buy") setIsBuying(true);
  }
  function handleEdit() {
    setDoEditCart(true);
  }
  function handleClose() {
    setDoEditCart(false);
  }
}
