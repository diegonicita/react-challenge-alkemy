import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DataContext } from "../Context/DataContext";
import "./Home.css";
import Dish from "../Dish/Dish";
import CardsList from "../CardsList/CardsList";
import { useReducer, useEffect, useState } from "react";
import reducer from "./HomeReducer.js";
import recipes from "./recipes.js"

function Home() {

  const [{ platos, total, health, time }, dispatch] = useReducer(
    reducer, []
  );

  const [recipesFetched, setRecipesFetched] = useState({recipes: [], isFetching: false});

  useEffect(() => {
    // dispatch({ type: "init" });
    const fetchRecipes = async() => {
      try {
    
        setRecipesFetched({recipes: [], isFetching: true});
    
        // let [recipe1, recipe2, recipe3, recipe4] = await Promise.all([
        //   fetch("https://api.spoonacular.com/recipes/1000/information?apiKey=982dbb59956d442983181d47be5b7349"),
        //   fetch("https://api.spoonacular.com/recipes/1001/information?apiKey=982dbb59956d442983181d47be5b7349"),
        //   fetch("https://api.spoonacular.com/recipes/1002/information?apiKey=982dbb59956d442983181d47be5b7349"),
        //   fetch("https://api.spoonacular.com/recipes/1003/information?apiKey=982dbb59956d442983181d47be5b7349"),
        // ]);
        // const recipesFetched = [await recipe1.json(), await recipe2.json(), await recipe3.json(), await recipe4.json(),
        // ];

        // const newRecipe = recipesFetched = ...

        const newRecipes = recipes.map(
          ({id, title, servings, image, readyInMinutes, vegan, healthScore, pricePerServing}) => 
              {
              return { id, title, servings, image, readyInMinutes, vegan, healthScore, pricePerServing };
              }
          );
        
        console.log(newRecipes);

        setRecipesFetched({recipes: newRecipes, isFetching: false});
        recipes.forEach( item => dispatch({
                   type: "addPlato",
                   data: {
                     id: item.id,
                     title: item.title,
                     image: item.image,
                     description: "none",
                     price: 10,
                     health: 2,
                     time: 10,
                   }
                 }))
      } catch (e) {
        console.log(e);
        setRecipesFetched({recipes: [], isFetching: false});
      }
    }
    fetchRecipes();
  }, []);

  return (
    <DataContext.Provider value={{ total, health, time, dispatch }}>
      <div className="home_body">
        <Container fluid>
          {/* <HomeFetch /> */}
          <Row>
            <Col sm={8} className="invisible">
              invisible
            </Col>
          </Row>
          <CardsList />
          <Row>
            <Col sm={8} className="invisible">
              invisible
            </Col>
          </Row>
          <Row>
            {platos && platos.length > 0 ? (
              platos.map((item, index) => {
                return (
                  <Col sm key={new Date() + 100 + index}>
                    <Dish {...item} key={new Date() + index} />
                  </Col>
                );
              })
            ) : (
              <div
                style={{
                  fontSize: "2rem",
                  width: "30rem",
                  margin: "0 auto",
                  marginBottom: "1rem",
                }}
              >
                No se encontraron platos
              </div>
            )}
          </Row>
          {/* <Cards data={initialStateData}/> */}
        </Container>
      </div>
    </DataContext.Provider>
  );
}

export default Home;
