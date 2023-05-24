import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  //meals är arrayen som kommer med API
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      //gör en kopia av state som sedan skickar tillbaka den
      //delar upp meals arrayn i delar, de delarna blir lika med NewMeals
      var NewMeals = meals.slice();

      //ger ett värde till antalet målrätter / recept, används så att den slutar ge ut recept / måltider efter 10
      var RecipeAmount = 0;
      while(RecipeAmount < 10) {
        const Answer = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        const DataBase = await Answer.json();
        console.log(DataBase.meals[0].strCategory);

        //fixar till så att kopian av state ligger i rätt plats i arrayn
        //lägger till +1 till variablen så att loopen slutar vid 10
        NewMeals[RecipeAmount] = DataBase.meals[0];
        RecipeAmount++; 
      }
      //skickar iväg state kopian 
      setMeals(NewMeals);
    }

    fetchData();
  }, []);

  return (
    //olika div för styling
    <div class="header">
      <div class="test">
        <h1 class="header">Hej och välkommen till Din Måltid </h1>
        <p>
          Här får du 10 autogenerade maträtter med bilder och länkar till recept
        </p>
      </div>
      {/*går igenom varje värde i state:en*/}
      {meals.map((meal, index) => (
        <div class="item">
          {/*variablerna inom {} ger ett värde såsom string eller bild, det läggs till i sidan*/}
          <h2>{meal.Number}</h2>
          <h2>{meal.strMeal}.</h3>
          <p> Kategori: {meal.strCategory}</p>
          <p>
            Hela receptet :{" "}
            <a href={meal.strSource}>
              {meal.strMeal}
            </a>
          </p>
          <img
            src={meal.strMealThumb}
            alt={meal.Number}
            width="10%"
            height="10%"
          />
        </div>
      ))}
    </div>
  );
}

export default App;
