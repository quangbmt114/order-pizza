import { useRef, useState ,useContext} from "react";
import Input from "./Input";
import classes from "./MealItem.module.css"
import CartContext from "../../../Store/Cart-context";

function MealItem({ props }) {
  const Cart = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const numberAmount = useRef();
    const handleSubmit = (prev)=>{
        prev.preventDefault();
        const readAmount = +numberAmount.current.value;
Cart.addItem({
        id:props.id,
        name:props.name,
        amount:readAmount,
        price:props.price
       });
    }
    
  return (
    <li className={classes.meal}>
      <div >
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Input props={props.id} ref={numberAmount}/>
          <button>+ ADD</button>
        </form>
      </div>
    </li>
  );
}

export default MealItem;
