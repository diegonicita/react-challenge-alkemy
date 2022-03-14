// import { useState, useEffect } from "react";
// import { useContext } from "react";
// import { DataContext } from "../Context/DataContext";

// const fetchRecipes = async() => {
//   try {
//     let [recipe1, recipe2, recipe3, recipe4] = await Promise.all([
//       fetch("https://api.spoonacular.com/recipes/1000/information?apiKey=982dbb59956d442983181d47be5b7349"),
//       fetch("https://api.spoonacular.com/recipes/1001/information?apiKey=982dbb59956d442983181d47be5b7349"),
//       fetch("https://api.spoonacular.com/recipes/1002/information?apiKey=982dbb59956d442983181d47be5b7349"),
//       fetch("https://api.spoonacular.com/recipes/1003/information?apiKey=982dbb59956d442983181d47be5b7349"),
//     ]);
//     const recipesFetched = [await recipe1.json(), await recipe2.json(), await recipe3.json(), await recipe4.json(),
//     ];
//     const recipes = recipesFetched.map(
//       ({id, title, servings, image, readyInMinutes, vegan, healthScore, pricePerServing}) => 
//           {
//           return { id, title, servings, image, readyInMinutes, vegan, healthScore, pricePerServing };
//           }
//       );
//     return recipes;
//   } catch (e) {
//     console.log(e);
//   }
// }

// function HomeFetch() {
//   const [isFetching, setIsFetching] = useState(true);
//   const { dispatch } = useContext(DataContext);  

//   useEffect(() => {
    
//     fetchDishesJSON().then((res) => {
//       console.log(res);
//       sessionStorage.setItem("data", JSON.stringify(res));
//       setIsFetching(false);
//       res.forEach( item => dispatch({
//         type: "addPlato",
//         data: {
//           title: item.title,
//           image: item.image,
//           description: "none",
//           price: 10,
//           health: 2,
//           time: 10,
//         }
//       }))
      
//     });
//   }, []);

//   return <></>;
// }

// export default HomeFetch;
