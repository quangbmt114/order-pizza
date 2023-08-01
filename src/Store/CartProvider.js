import CartContext from "./Cart-context";
import { useReducer } from "react";
function CartProvider(props) {
  const defaultCartState = {
    items: [],
    totalAmount: 0,
  };
  const CartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const checkItemCart = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const indexCartItem = state.items[checkItemCart];

      let updateItem;
      let updateItems;
      //check item into cart
      if (indexCartItem) {
        updateItem = {
          ...indexCartItem,
          amount: indexCartItem.amount + action.item.amount,
        };
        updateItems = [...state.items];
        updateItems[checkItemCart] = updateItem;
      } else {
        updateItem = action.item;
        updateItems = state.items.concat(updateItem);
      }
      return { items: updateItems, totalAmount: updateTotalAmount };
    }
    if (action.type === "REMOVE_ITEM") {
      const checkItemCart = state.items.findIndex(
        (item) => item.id === action.id
      );
      const indexCartItem = state.items[checkItemCart];
      let updateTotalAmount = state.totalAmount;
      let updateItems;
      if (indexCartItem.amount > 1) {
        updateTotalAmount = state.totalAmount - indexCartItem.price;
        const updateItem = {
          ...indexCartItem,
          amount: indexCartItem.amount - 1,
        };
        updateItems = [...state.items];
        updateItems[checkItemCart] = updateItem;
      } else {
        updateItems = [...state.items];
      }
      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    }
    if (action.type === "DELETE_ITEM") {
      const checkItemCart = state.items.findIndex(
        (item) => item.id === action.id
      );
      const indexCartItem = state.items[checkItemCart];
      let updateItems = state.items.filter((item) => item.id !== action.id);
      let updateTotalAmount =
        state.totalAmount - indexCartItem.amount * indexCartItem.price;
      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    }
    if (action.type === "CLEAR") {
      return defaultCartState;
    }
    return defaultCartState;
  };
  const [state, dispatchAction] = useReducer(CartReducer, defaultCartState);
  const addItemFromCart = (item) => {
    dispatchAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCart = (id) => {
    dispatchAction({ type: "REMOVE_ITEM", id: id });
  };
  const deleteItemFromCart = (id) => {
    dispatchAction({ type: "DELETE_ITEM", id: id });
  };
  const clearItemFromCart = () => {
    dispatchAction({ type: "CLEAR" });
  };
  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemFromCart,
    removeItem: removeItemFromCart,
    deleteItem: deleteItemFromCart,
    clearItem: clearItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
