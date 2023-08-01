import classes from "./MealItem.module.css"
import React from 'react'
const Input = React.forwardRef( ({props},ref)=> {
    return ( <div className={classes.input}>
        <label htmlFor={props}>Amount</label>
        <input type="number" ref={ref} min={1} max={5} step={1} defaultValue={1} id={props}/>
    </div> );
})

export default Input;