import { useRef, useState } from "react";

function Checkout(props) {
  const [formSubmit,setFormSubmit]=useState ({})
  const nameInputValue = useRef();
  const phoneInputValue=useRef();
  const addressInputValue=useRef();
  
  const HandleSubmit=(prev)=>{
    const nameValue = nameInputValue.current.value;
  const phoneValue = phoneInputValue.current.value;
  const addressValue = addressInputValue.current.value;
      prev.preventDefault();
    props.onConfirm({
      name:nameValue,
      phone:phoneValue,
      address:addressValue,
    })
  }
    return ( <div>
        <form onSubmit={HandleSubmit}>
        <div className="col-md-12">
          <label htmlFor="nameInput" className="form-label">
            Tên
          </label>
          <input
            ref={nameInputValue}
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="tên của bạn ?"
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="phoneInput" className="form-label">
            Số điện thoại
          </label>
          <input
          ref={phoneInputValue}
            type="text"
            className="form-control"
            id="phoneInput"
            placeholder="số điện thoại của bạn ?"
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="addressInput" className="form-label">
            địa chỉ
          </label>
          <input
          ref={addressInputValue}
            type="text"
            className="form-control"
            id="addressInput"
            placeholder="địa chỉ đặt hàng ?"
            required
          />
        </div>
        <div className="col-12 mt-2">
          <button className="btn btn-primary me-2" type="submit">
            Cofirm
          </button>
          <button className="btn btn-primary" onClick={props.onHandleClose}>
            Close
          </button>
        </div>
      </form>
    </div> );
}

export default Checkout;