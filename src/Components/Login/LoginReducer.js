const EMAIL = 0;
const PASSWORD = 1;
var inputType = {
  email: 0,
  password: 1,
};

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

function updateCasillero(state, action) {
  const newState = {
    ...state,
  };
  // value del casillero (input)
  const value = action.payload.value;
  // identificador del input: 0 es email y 1 es password
  const tipo = inputType[action.payload.tipo];
  // guarda el value
  newState.data[tipo].value = value;
  // guarda el estilo del mensaje de error
  newState.data[tipo].errorStyle = (newState.data[tipo].value.length)
    ? "invisible"
    : "text-danger visible fw-bold";
  // prueba : validando el formato del texto escrito // 
  newState.data[EMAIL].errorStyle = (validateEmail(newState.data[EMAIL].value))
  ? "invisible"
  : "text-danger visible fw-bold";
  // chequea si existe un error: si no son ambos invisibles hay un error
  newState.isError = !(
    newState.data[EMAIL].errorStyle == "invisible" &&
    newState.data[PASSWORD].errorStyle == "invisible"    
  ); 
 

  return newState;
}

function setIsLoading(state, value) {
  const newState = {
    ...state,
  };
  newState.isLoading = value;  
  return newState;
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "LOGIN_UPDATE":
      newState = updateCasillero(state, action);
      return newState;
    case "LOGIN_START":
      newState = setIsLoading(state, true);
      return newState;
    case "LOGIN_END":
      newState = setIsLoading(state, false);
      return newState;
    default:
      throw new Error(`${action.type} is not a valid action`);
  }
}

export default reducer;
