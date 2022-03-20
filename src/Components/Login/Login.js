import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect, useReducer } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Casillero from "./Casillero";
import reducer from "./LoginReducer.js";

const axios = require("axios");
const API = process.env.REACT_APP_API || "http://challenge-react.alkemy.org/";

function Login(props) {
 
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [values, setValues] = useState({ email: "", password: "" });
  // const [errors, setErrors] = useState({
  //   email: "invisible",
  //   password: "invisible",
  // });
  const navigate = useNavigate();
  // const set = (name) => {
  //   return ({ target: { value } }) => {
  //     setValues((oldValues) => ({ ...oldValues, [name]: value }));
  //   };
  // };

  const [loginData, dispatchLogin] = useReducer(reducer, 
    {
      inputData: [
        { name: "email", value: "", error: "invisible" },
        { name: "password", value: "", error: "invisible" },
      ],
      isLoading: false,
    },
  );  
  const controller = new AbortController();

  async function myFetch() {
    let response = null;
    try {
      response = await axios(
        {
          method: "post",
          url: API,
          data: {
            email: loginData.inputData[0].value,
            password: loginData.inputData[1].value,
          },
        },
        { signal: controller.signal }
      );
      // setIsLoading(false);
    } catch (error) {
      console.warn(error.response.status);
      console.warn("error", "Acceso no autorizado");
      alert("acceso no autorizado");
      // console.log(response.statusText);
      dispatchLogin({type: 'SET_ISLOADING_FALSE'});
    }

    if (response != null) {
      props.apiTokenHandler(response.data.token);
      props.userHandler(loginData.inputData[0].value);
      // dispatchLogin({type: 'INIT'});
      // setValues({ password: "", email: "" });
      // setErrors({ password: "invisible", email: "invisible" });
      // setIsLoading(false);
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    if (loginData.isLoading) {
      console.log("fetch data");
      myFetch();
      console.log("useEffect");
    }

    return function cleanup() {
      console.log("Cancel Clean Effect");
      controller.abort();
    };
  }, [loginData.isLoading]);

  const submitForm = () => {

    dispatchLogin({type: 'SET_ISLOADING_TRUE'});

    // if (values.email == "")
    //   setErrors((oldValues) => ({
    //     ...oldValues,
    //     email: "text-danger visible fw-bold",
    //   }));
    // else {
    //   setErrors((oldValues) => ({ ...oldValues, email: "invisible" }));
    // }
    // if (values.password == "")
    //   setErrors((oldValues) => ({
    //     ...oldValues,
    //     password: "text-danger visible fw-bold",
    //   }));
    // else {
    //   setErrors((oldValues) => ({ ...oldValues, password: "invisible" }));
    // }
    // if (values.password != "" && values.email != "") setIsLoading(true);
  };

  return (
    <React.Fragment>
      <div className="login_body text-center">
        <br />
        <Container className="login_form_container">
          <Form className="w-50 shadow p-3 mb-5 bg-white rounded">
            <Casillero
              key="1"
              texto="correo electronico"
              tipo="email"
              value={loginData.inputData[0].value}
              error={loginData.inputData[0].error}
              dispatch={dispatchLogin}
            />
            <Casillero
              key="2"
              texto="contraseña"
              tipo="password"
              value={loginData.inputData[1].value}
              error={loginData.inputData[1].error}
              dispatch={dispatchLogin}
            />
            <Button
              variant="primary"
              size="lg"
              disabled={loginData.isLoading}
              onClick={!loginData.isLoading ? submitForm : null}
            >
              Enviar
            </Button>
            <br></br>
            <Form.Group>
              <Form.Text>
                {loginData.isLoading
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
