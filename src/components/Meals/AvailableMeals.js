import Card from '../UI/Card';
import MealItem from './MealItem';
import classes from './AvailableMeals.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
     async function fetchMeals() {
      try {
      const response = await axios.get('https://react-http-b51ad-default-rtdb.firebaseio.com/meals.json');
      const mealsArray = []

      for (const key in response.data) {
        mealsArray.push({...response.data[key], id: key})
      }
      setMeals(mealsArray);
      setIsLoading(false);

      } catch (error) {
        setErrorMessage(error.message)
        setIsLoading(false);
      }
    
    }
    fetchMeals();
  }, [])

  const mealsList = meals.map((meal) => {
    return (<MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  )});
  
  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && <ul>{mealsList}</ul>}
        {isLoading && <p className={classes.loading}>Loading</p>}
        {!isLoading && !!errorMessage && <p className={classes.error}>Error loading the meal: {errorMessage}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
