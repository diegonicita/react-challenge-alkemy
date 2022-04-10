import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { useContext } from "react";
import { DataContext} from "../Context/DataContext";


const SearchBar = () => {

console.log("llamando a SearchBar");

const { platos } = useContext(DataContext);  
const [searchTerm, setSearchTerm] = useState("");

const submit = (e) =>
{
    e.preventDefault();
    const listado = platos.filter( ({title}) => {const titulo = title.toLowerCase();
                                                 return titulo.includes(searchTerm.toLowerCase()) === true});
    const listadoId = listado.map( ({id}) => { return id});
    console.log(listadoId);
}

const changeSearchTerm = (e) =>
{
    setSearchTerm(e.target.value)
}

return (
<Container>
    <Form onSubmit={submit} className="py-3" autoComplete="off">
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Buscar nuevos platos</Form.Label>
        <Form.Control type="text" placeholder="Ingresa un texto" value={searchTerm} onChange={changeSearchTerm}/>    
    </Form.Group>
    <Button variant="primary" type="submit">
        Buscar
    </Button>
    </Form>
</Container>
)

}

export default SearchBar;