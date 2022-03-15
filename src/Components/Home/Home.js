import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DataContext } from "../Context/DataContext";
import "./Home.css";
import Dish from "../Dish/Dish";
import MyCards from "../Cards/MyCards";
import { useReducer, useEffect, useState } from "react";
import reducer from "./HomeReducer.js";
import recipesHardCoded from "./recipesHardCoded.js";

function Home() {
  // almacena los datos de las recetas y las cards (precio total, health score y tiempo de preparacion //
  const [{ platos, total, health, time }, dispatch] = useReducer(reducer, []);

  // para saber si se esta realizando el fetching //
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // flag para habilitar o no la llamda a la API (para no agotar las llamadas/dia durante los test)
    let callApi = false;
    // para almacenar las recetas traidas de la API.
    // En otra variable, recipesHardCoded, estan las recetas hardcodeadas.
    let recipesFetched = undefined;

    // dispatch({ type: "init" });
    const fetchRecipes = async () => {      

      try {
        // obtener datos de la API si callAPI es true sino obtener los datos hardcodeados //
        if (callApi) {
          setIsFetching(true);
          let [recipe1, recipe2, recipe3, recipe4] = await Promise.all([
            fetch(
              "https://api.spoonacular.com/recipes/1000/information?apiKey=982dbb59956d442983181d47be5b7349"
            ),
            fetch(
              "https://api.spoonacular.com/recipes/1001/information?apiKey=982dbb59956d442983181d47be5b7349"
            ),
            fetch(
              "https://api.spoonacular.com/recipes/1002/information?apiKey=982dbb59956d442983181d47be5b7349"
            ),
            fetch(
              "https://api.spoonacular.com/recipes/1003/information?apiKey=982dbb59956d442983181d47be5b7349"
            ),
          ]);
          recipesFetched = [
            await recipe1.json(),
            await recipe2.json(),
            await recipe3.json(),
            await recipe4.json(),
          ];
          setIsFetching(false);
        }

        console.log("fetch data: " + recipesFetched);
        console.log("hardcoded data: " + recipesHardCoded);
        // console.log(recipesFetched[0].code);

        // si fallo el fetch, es decir, recipesFetched code != 400 use recipesHardCoded en su lugar
        const r = (recipesFetched &&
          recipesFetched[0].code === 400 &&
          recipesFetched[1].code === 400 &&
          recipesFetched[2].code === 400 &&
          recipesFetched[3].code === 400)
            ? recipesFetched
            : recipesHardCoded;
        // extrae y almacena en newRecipes los datos que mapeamos de r //
        const newRecipes = r.map(
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
        newRecipes.forEach((item) =>
          dispatch({
            type: "addPlato",
            data: {
              id: item.id,
              title: item.title,
              image: item.image,
              description: "noness",
              price: 10,
              health: 2,
              time: 10,
            },
          })
        );
      } catch (e) {
        console.log(e);
      }
    };
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
          <MyCards />
          <Row>
            <Col sm={8} className="invisible">
              invisible
            </Col>
          </Row>
          {isFetching ? (
            <Row>
              <div
                style={{
                  fontSize: "2rem",
                  width: "30rem",
                  margin: "0 auto",
                  marginBottom: "1rem",
                }}
              >
                Conectandose a la API...
              </div>
            </Row>
          ) : (
            ""
          )}
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
               {isFetching?"":"No se encontraron platos"}
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
