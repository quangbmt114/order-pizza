import { Fragment, useContext,useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from "./CartItem.module.css";
import CartContext from "../../Store/Cart-context";
import Checkout from "./checkout";
import axios from "axios";

function Cart(props) {
  const [isCheckOut,setIsCheckOut]=useState(false);
  const [isSubmit,setIsSubmit]=useState(false);
  const [isRequesting,setIsRequesting]=useState(false)
  const CartCtx = useContext(CartContext);
  const hasOderCart = CartCtx.items.length > 0;
  const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const HandleClose = ()=>{
      setIsCheckOut(!isCheckOut)
  }
  //check out
  const handleCheckOut = ()=>{
    setIsCheckOut(!isCheckOut)
  }
  // trừ 1 amount sản phẩm trong cart
  const removeCartItem =(id)=>{
    CartCtx.removeItem(id)
  }
  // thêm sản phẩm vào giỏ hàng
  const addCartItem=(item)=>{
        CartCtx.addItem({...item,amount:1})
  }
 // xóa sản phẩm ra khỏi giỏ hàng
  const deleteCartItemIndex=(id)=>{
    CartCtx.deleteItem(id)
  }
  const handleSubmitForm=async(userData)=>{ 
    setIsSubmit(true)
    const newData = {
      user:userData,
      orderItems:CartCtx.items
    }
    const databaseURL = 'https://fir-f9113-default-rtdb.asia-southeast1.firebasedatabase.app/'; // Thay đổi URL của Firebase Realtime Database
     await axios.post(`${databaseURL}/order.json`, newData)
  .then(response => {
    console.log('Thêm dữ liệu thành công!', response.data);
  })
  .catch(error => {
    console.error('Đã xảy ra lỗi khi thêm dữ liệu:', error);
  });
  setIsSubmit(false)
  setIsRequesting(!isRequesting)
  console.log(true);
  }
  const cartItems = (
    <ul className={classes["cart-item"]} >
      {CartCtx.items.map((item) => {
        return (
          <li className="d-flex justify-content-between" key={item.id}>
            <div>
            <h2>{item.name}</h2>
            <div className={classes.summary}>
              <span className={classes.price}>${item.price}</span>
              <span className={classes.amount}>x{item.amount}</span>
            </div>
            </div>
            <div className={classes.actions} >
              <button onClick={()=>{removeCartItem(item.id)}}>-</button>
              <button onClick={()=>{addCartItem(item)}}>+</button>
            </div>
            <div className={classes.actions}>
              <button onClick={()=>{deleteCartItemIndex(item.id)}}>xóa</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
  const isModalRequesting = <p>THÔNG TIN ĐÃ ĐƯỢC GỬI ĐI .... !!</p>
  const isModalRequested = <p>THÔNG TIN ĐÃ ĐƯỢC GỬI ĐI THÀNH CÔNG !!</p>
  const formCart = 
      <Fragment>
         <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems}
          <div>
            <span className="fw-bold fs-4">Total Amount :</span>
            <span className="fw-bold fs-4">{totalAmount}</span>
          </div>
          {isCheckOut&&<Checkout onConfirm={handleSubmitForm} onHandleClose={HandleClose} />}
        </Modal.Body>
        {!isCheckOut&&<Modal.Footer>
          <Button variant="outline-secondary" onClick={props.onClose}>
            Close
          </Button>
          {hasOderCart && <Button variant="success" onClick={handleCheckOut} >Order</Button>}
        </Modal.Footer>}
      </Fragment>

  return (
    <>
      <Modal show={true} onHide={props.onClose} animation={true}>
        {!isSubmit&&!isRequesting&&formCart}
        {!isSubmit&&isRequesting&&isModalRequested}
        {isSubmit&&isModalRequesting}
        
      </Modal>
    </>
  );
}

export default Cart;
