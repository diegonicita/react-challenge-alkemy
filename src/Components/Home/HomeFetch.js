import { useState, useEffect } from "react";

async function fetchDishesJSON() {
  try {
    let [item1, item2, item3, item4] = await Promise.all([
      fetch("https://api.spoonacular.com/recipes/1000/information"),
      fetch("https://api.spoonacular.com/recipes/1001/information"),
      fetch("https://api.spoonacular.com/recipes/1002/information"),
      fetch("https://api.spoonacular.com/recipes/1003/information"),
    ]);

    const recipes = [
      await item1.json(),
      await item2.json(),
      await item3.json(),
      await item4.json(),
    ];

    const newRecipes = recipes.map(
      ({
        id,
        title,
        servings,
        image,
        readyInMinutes,
        vegan,
        healthScore,
        pricePerServing,
      }) => {
        return {
          id,
          title,
          servings,
          image,
          readyInMinutes,
          vegan,
          healthScore,
          pricePerServing,
        };
      }
    );
    return newRecipes;
  } catch (e) {
    console.log(e);
  }
}

function HomeFetch() {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchDishesJSON().then((res) => {
      console.log(res);
      sessionStorage.setItem("data", JSON.stringify(res));
      setIsFetching(false);
    });
  }, []);

  return <></>;
}

export default HomeFetch;
