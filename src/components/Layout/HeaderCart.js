import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import style from "./HeaderCart.module.css"
import { useContext } from 'react'
import CartContext from '../../Store/Cart-context'
function HeaderCart(props) {
  const cartCtx = useContext(CartContext)
  const numberLengthCart = cartCtx.items.reduce((curNumber,item)=>{
    return curNumber +item.amount
  },0);
  return(
    <button className={style.button} onClick={props.onClick} >
        <span className={style.icon}>
        <FontAwesomeIcon icon={faCartArrowDown} />
        </span>
        <span >YOUR CART</span>
        <span className={style.badge}>{numberLengthCart} </span>
    </button>
  )
}

export default HeaderCart;
