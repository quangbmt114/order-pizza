import axios from "axios";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./Meals.module.css";
import { useState, useEffect } from "react";

const MealList = [
  {
    id: "m1",
    name: "pizza 1",
    description: "pizza nhưng với nội dung chi tiết hơn",
    price: 22.99,
  },
  {
    id: "m2",
    name: "pizza 2",
    description: "pizza nhưng với nội dung chi tiết hơn",
    price: 25.99,
  },
  {
    id: "m3",
    name: "pizza 3",
    description: "pizza nhưng với nội dung chi tiết hơn",
    price: 19.99,
  },
  {
    id: "m4",
    name: "pizza 4",
    description: "pizza nhưng với nội dung chi tiết hơn",
    price: 33.99,
  },
];
const Meals = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let mealList;
  useEffect(() => {
    const callAPI = async () => {
      const mealList = [];
      const MealLists = await axios.get(
        "https://fir-f9113-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      for (const key in MealLists.data) {
        const element = MealLists.data[key];
        mealList.push({
          id: key,
          name: element.name,
          price: element.price,
          description: element.description,
        });
      }
      setList(mealList);
      setIsLoading(!isLoading);
    };
    callAPI();
  }, []);
  if (list.length > 0) {
    mealList = list.map((item, index) => {
      return <MealItem key={index} props={item} />;
    });
  }

  return (
    <section className={classes.meals}>
      {!isLoading && (
          <div className="d-flex justify-content-center align-items-center" style={{height:'40vh'}}>
            <div className="d-flex spinner-border text-primary justify-content-center align-" style={{maxWidth:'500px'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          </div>
        )}
      {isLoading&&<Card> 
        <ul>{mealList}</ul>
      </Card>}
    </section>
  );
};

export default Meals;
