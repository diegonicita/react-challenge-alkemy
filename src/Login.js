import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const axios = require("axios");
const API = process.env.REACT_APP_API || "http://challenge-react.alkemy.org/";

function Login(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({
    correo: "invisible",
    password: "invisible",
  });

  const navigate = useNavigate();

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  async function myFetch() {
    let response = null;
    try {
      response = await axios({
        method: "post",
        url: API,
        data: {
          email: values.correo,
          password: values.password,
        },
      })
      setIsLoading(false);           
    } catch (error) {
      console.warn(error.response.status);
      console.warn("error", "Acceso no autorizado");
      alert("acceso no autorizado");
      // console.log(response.statusText);      
      setIsLoading(false);
    } 

    if (response != null)
    {
     // console.log(response.status);
     //console.log(response.statusText);
     // console.log(response.headers);
     // console.log(response.config);
     // console.log(response.data.token);

     props.apiTokenHandler(response.data.token);
     props.userHandler(values.correo);
     setValues({ password: "", correo: "" });
     setErrors({ password: "invisible", correo: "invisible" });
     navigate("/", { replace: true });
     setIsLoading(false);
    }
      
  }

  useEffect(() => {
    if (isLoading) {
      myFetch();
    }
  }, [isLoading]);

  const submitForm = () => {
    if (values.correo == "")
      setErrors((oldValues) => ({
        ...oldValues,
        correo: "text-danger visible fw-bold",
      }));
    else {
      setErrors((oldValues) => ({ ...oldValues, correo: "invisible" }));
    }
    if (values.password == "")
      setErrors((oldValues) => ({
        ...oldValues,
        password: "text-danger visible fw-bold",
      }));
    else {
      setErrors((oldValues) => ({ ...oldValues, password: "invisible" }));
    }
    if (values.password != "" && values.correo != "") setIsLoading(true);
  };

  return (
    <React.Fragment>
      <div className="login_body text-center">
        <Container className="login_form_container">
          <Form className="w-50">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold text-black">
                Correo Electronico:
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="correo electronico"
                value={values.correo}
                onChange={set("correo")}
                autoComplete="off"
              />
              <Form.Text className={errors.correo}>
                Debes escribir tu correo electronico
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold text-black">
                Contraseña:
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="contraseña"
                value={values.password}
                onChange={set("password")}
                autoComplete="off"
              />
              <Form.Text className={errors.password}>
                Debes escribir tu contraseña
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              size="lg"
              disabled={isLoading}
              onClick={!isLoading ? submitForm : null}
            >
              Enviar
            </Button>
            <br></br>
            <Form.Group>
              <Form.Text>
                {isLoading
                  ? "   Autenticando..."
                  : "Tranquilo, nunca compartiremos tus datos "}
              </Form.Text>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Login;
