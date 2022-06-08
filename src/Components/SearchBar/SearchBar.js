import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../Auth/DataContext";

// funcion para obtener el endpoint de una receta por su ID
const getRecipeEndPointByWord = (word) => {
  //https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2
  let apiStart = "https://api.spoonacular.com/recipes/complexSearch?query=";
  let apiEnd = "&addRecipeInformation=true&apiKey=982dbb59956d442983181d47be5b7349";
  return apiStart + word + apiEnd;
};

const SearchBar = () => {
  console.log("llamando a SearchBar");

  const { dishes, dispatch } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      console.log("useEffect");

      const myFetch = async () => {
        let result = undefined;
        let result2 = undefined;
        try {
          result = await fetch(getRecipeEndPointByWord(searchTerm));
        } catch (e) {
          console.log(e);
        }
        try {
          result2 = await result.json();
          console.log(result2);
          const newRecipes = result2.results.map((r) => {
            return {
              id: r.id,
              title: r.title,
              image: r.image,
              price: r.pricePerServing,
              servings: r.servings,
              time: r.readyInMinutes,              
              health: r.healthScore,                            
              vegan: r.vegan,              
              group: "found",              
              description: "noness"
            };
          });

          dispatch({
            type: "addDishes",
            data: newRecipes,
          });
        } catch (e) {
          console.log(e);
        }
      };
      myFetch();
      setIsSearching(false);
    }
  }, [isSearching]);

  // const submit = (e) =>
  // {
  //     e.preventDefault();
  //     const listado = dishes.filter( ({title}) => {const titulo = title.toLowerCase();
  //                                                  return titulo.includes(searchTerm.toLowerCase()) === true});
  //     const listadoId = listado.map( ({id}) => { return id});
  //     console.log(listadoId);
  // }

  const submit = (e) => {
    e.preventDefault();
    setIsSearching(true);
  };

  const changeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Form onSubmit={submit} className="py-3" autoComplete="off">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Buscar nuevos platos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa un texto"
            value={searchTerm}
            onChange={changeSearchTerm}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>
    </Container>
  );
};

export default SearchBar;
