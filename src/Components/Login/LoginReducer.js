function updateEmail(state, value) {
  const newState = {
    ...state,
  };
  newState.inputData[0].value = value;
  console.log(newState.inputData[0].value);
  return newState;
}

function updatePassword(state, value) {
  const newState = {
    ...state,
  };
  newState.inputData[1].value = value;
  console.log(newState.inputData[1].value);
  return newState;
}

function reduceData(state) {
  return {
    ...state,
  };
}

function setIsLoading(state, value) {
  const newState = {
    ...state,
  };
  newState.isLoading = value;
  console.log(value);
  return newState;
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "INIT":
      newState = reduceData(state);
      return newState;
    case "email":
      newState = updateEmail(state, action.payload);
      return newState;
    case "password":
      newState = updatePassword(state, action.payload);
      return newState;
    case "SET_ISLOADING_TRUE":
      newState = setIsLoading(state, true);
      return newState;
    case "SET_ISLOADING_FALSE":
      newState = setIsLoading(state, false);
      return newState;
    default:
      throw new Error(`${action.type} is not a valid action`);
  }
}

export default reducer;
