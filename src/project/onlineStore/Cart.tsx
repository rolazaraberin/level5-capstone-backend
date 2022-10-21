import Icon from "components/Icon";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { state, item } from "./types";
import { generateKey } from "scripts/utilityFunctionsReact";
import { addItem, removeItem } from "./reducer";
import { matchValue, reduce } from "scripts/utilityFunctions";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ButtonGroup, Button } from "react-bootstrap";
//import { isEmpty } from "scripts/utilityFunctions";
import { navigateTo } from "components/NavigationHooks";
import { URL } from "renderers/MainNavbar";

export default Cart;

function Cart({
  hideIcon = false,
  hideCart = true,
  disableBuyButton = false,
  onClose: handleClose = () => {},
}) {
  const [cartComponent, setCartComponent] = useState<ReactNode>();
  const [itemCount, setItemCount] = useState<string>("empty");
  const [showCart, setShowCart] = useState(!hideCart);
  const [hideBuyButton, setHideBuyButton] = useState(true);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  useEffect(componentDidUpdate, [cart]);

  return (
    <>
      {!hideIcon && (
        <>
          <Icon name="cart" onClick={handleShowCart} /> {itemCount}{" "}
        </>
      )}
      <Modal show={showCart} onHide={handleShowCart} onExit={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="cart">
            <tbody>{cartComponent}</tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          {!hideBuyButton && <Button onClick={handleBuy}>Review Order</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );

  //**********************************************

  function componentDidUpdate() {
    let cartComponent = reduce(cart, toCart);
    let itemCount;
    switch (cart.length) {
      case 0:
        itemCount = `← add an item`;
        cartComponent = (
          <tr>
            <td>Cart is empty</td>
          </tr>
        );
        setHideBuyButton(true);
        break;
      case 1:
        itemCount = `1 item`;
        if (!disableBuyButton) setHideBuyButton(false);
        break;
      default:
        itemCount = `${cart.length} items`;
        if (!disableBuyButton) setHideBuyButton(false);
        break;
    }
    setCartComponent(cartComponent);
    setItemCount(itemCount);
  }
  function handleAdd(item: item) {
    return () => dispatch(addItem(item));
  }
  function handleBuy() {
    navigateTo(URL.onlineStoreBuy);
  }
  function handleRemove(item: item) {
    return () => dispatch(removeItem(item));
  }
  function handleShowCart() {
    setShowCart(!showCart);
  }
  function toCart(
    cart: ReactElement[],
    item: { name: string; price: number },
    index: number,
    array: {}[]
  ) {
    const itemCount = array.filter(matchValue(item)).length;
    if (index > array.findIndex(matchValue(item))) return cart;
    cart.push(
      <tr className="cart-item" key={generateKey()}>
        <td>
          {item.name} ${item.price}.00
        </td>
        <td>
          <ButtonGroup>
            <Button onClick={handleRemove(item)}>-</Button>
            <Button variant="outline-dark">{itemCount}</Button>
            <Button onClick={handleAdd(item)}>+</Button>
          </ButtonGroup>
          {/* <Icon name="remove-minus" onClick={handleRemove(item)} />
          <button className="btn-outline-dark">{itemCount}</button>
          <Icon name="add-plus" onClick={handleAdd(item)} /> */}
        </td>
      </tr>
    );
    return cart;
  }
}

function selectCart(state: state) {
  return state.cart;
}
