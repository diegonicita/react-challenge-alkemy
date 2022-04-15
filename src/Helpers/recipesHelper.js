// array con 4 recetas hardcodeadas //
const recipes = [
  {
    id: 1000,
    title: "Pistachio Sea Bass with Crab Salad",
    servings: 6,
    image: "https://spoonacular.com/recipeImages/1000-556x370.jpg",
    readyInMinutes: 45,
    vegan: true,
    healthScore: 28,
    pricePerServing: 519.62,
  },
  {
    id: 1001,
    title: "Wild Striped Bass with Scallions and Herb Salad",
    servings: 4,
    image: "https://spoonacular.com/recipeImages/1001-556x370.jpg",
    readyInMinutes: 45,
    vegan: true,
    healthScore: 37,
    pricePerServing: 492.91,
  },
  {
    id: 1002,
    title: "Sea Bass with Tomatoes and Olives",
    servings: 4,
    image: "https://spoonacular.com/recipeImages/1002-556x370.jpg",
    readyInMinutes: 30,
    vegan: false,
    healthScore: 39,
    pricePerServing: 744.66,
  },
  {
    id: 1003,
    title: "Grilling: Striped Bass with Roasted Salsa",
    servings: 2,
    image: "https://spoonacular.com/recipeImages/1003-556x370.jpg",
    readyInMinutes: 45,
    vegan: false,
    healthScore: 100,
    pricePerServing: 1934.28,
  },
  {
    id: 1004,
    title: "Salt-Baked Branzino with Citrus, Fennel and Herbs",
    servings: 8,
    image: "https://spoonacular.com/recipeImages/1004-556x370.jpg",
    readyInMinutes: 105,
    vegan: true,
    healthScore: 39,
    pricePerServing: 639.12,
  },
  {
    id: 1008,
    title: "Spicy Butter-Steamed Bass",
    servings: 4,
    image: "https://spoonacular.com/recipeImages/1008-556x370.jpg",
    readyInMinutes: 30,
    vegan: true,
    healthScore: 23,
    pricePerServing: 331.94,
  },
  {
    id: 1006,
    title: "Grilled Sea Bass",
    servings: 6,
    image: "https://spoonacular.com/recipeImages/1006-556x370.jpg",
    readyInMinutes: 40,
    vegan: false,
    healthScore: 11,
    pricePerServing: 251.59,
  },
  {
    id: 1007,
    title: "Catalan Roasted Sea Bass",
    servings: 4,
    image: "https://spoonacular.com/recipeImages/1007-556x370.jpg",
    readyInMinutes: 38,
    vegan: true,
    healthScore: 56,
    pricePerServing: 357.98,
  },
];

// funcion para obtener el endpoint de una receta por su ID
const getRecipeEndPointById = (num) => {
  let apiStart = "https://api.spoonacular.com/recipes/";
  let apiEnd = "/information?apiKey=982dbb59956d442983181d47be5b7349";
  return apiStart + num + apiEnd;
};

const fetchRecipes = async (flag, dispatch, setIsFetching) => {
  setIsFetching(true);
  // flag para habilitar o no la llamda a la API (para no agotar las llamadas/dia durante los test)
  let callApi = flag;
  // para almacenar las recetas traidas de la API.
  // En otra variable, recipesHardCoded, estan las recetas hardcodeadas.
  let recipesFetched = undefined;

  try {
    // obtener datos de la API si callAPI es true sino obtener los datos hardcodeados //
    if (callApi) {
      let [recipe1, recipe2, recipe3, recipe4] = await Promise.all([
        fetch(getRecipeEndPointById(1000)),
        fetch(getRecipeEndPointById(1001)),
        fetch(getRecipeEndPointById(1002)),
        fetch(getRecipeEndPointById(1003)),
      ]);
      recipesFetched = [
        await recipe1.json(),
        await recipe2.json(),
        await recipe3.json(),
        await recipe4.json(),
      ];
    }

    // console.log(recipesFetched);
    // console.log(recipesFetched[0].code);
    // console.log(recipesFetched[1].code);
    // console.log(recipesFetched[2].code);
    // console.log(recipesFetched[3].code);
    // // console.log("fetch data: " + recipesFetched);
    // console.log("hardcoded data: " + recipesHardCoded);
    // console.log(recipesFetched[0].code);

    // si fallo el fetch, es decir, recipesFetched code != 400 use recipesHardCoded en su lugar
    const recetas =
      recipesFetched && recipesFetched.length > 0 ? recipesFetched : recipes;
    // extrae y almacena en newRecipes los datos que mapeamos de r //
    // console.log(recetas);
    const newRecipes = recetas.map((r) => {
      return {
        id: r.id,
        title: r.title,
        servings: r.servings,
        image: r.image,
        time: r.readyInMinutes,
        vegan: r.vegan,
        health: r.healthScore,
        price: r.pricePerServing,
        description: "noness",
        group: "found"
      };
    });

    setTimeout(() => {
      setIsFetching(false);

      dispatch({
        type: "addDishes",
        data: newRecipes,
      })

    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

export { getRecipeEndPointById, recipes, fetchRecipes };
