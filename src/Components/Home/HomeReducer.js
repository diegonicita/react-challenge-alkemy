  
  function deleteDish(state, action) {
    console.log("delete plato " + action.id);
    let newPlatos = state.dishesFound.filter((item) => item.id != action.id);    
    return {
      ...state,
      dishesFound: newPlatos,
    };
  }
  
  function addDish(state, action) { 
    let newPlatos = [action.data];
    if (state.dishesFound)
    {
    newPlatos = [ ...state.dishesFound, action.data ];  
    }
    else 
    {
    newPlatos = [ action.data ];  
    }
    return {
      ...state,
      dishesFound: newPlatos,
    }     
  }

  function addDishes(state, action) {    
    let newPlatos = [action.data];
    if (state.dishesFound)
    {
    newPlatos = [ ...state.dishesFound, ...action.data ];  
    }
    else 
    {
    newPlatos = [ ...action.data ];  
    }
    return {
      ...state,
      dishesFound: newPlatos,
    }     
  }
  
  function reduceData(state) {
    if (state.dishesFound)
    {
    let prices = state.dishesFound.map((a) => a.price);
    let times = state.dishesFound.map((a) => a.time);
    let healths = state.dishesFound.map((a) => a.health);
    let sumaPrices = prices.reduce((a, b) => a + b, 0);
    let sumaTime = times.reduce((a, b) => a + b, 0);
    let sumaHealth = healths.reduce((a, b) => a + b, 0);
       
    return {
      ...state,
      total: sumaPrices,
      time: (sumaTime / times.length).toFixed(2),
      health: (sumaHealth / healths.length).toFixed(2),
    }}
    else{
      return {...state};
    };
  }
  
  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case "init":
        newState = reduceData(state);
        return newState;
      case "change":
        newState = reduceData(state);
        return newState;
      case "deleteDish":
        newState = deleteDish(state, action);
        return reduceData(newState);
      case "addDish":
        newState = addDish(state, action);
        return reduceData(newState);
      case "addDishes":
        newState = addDishes(state, action);
        return reduceData(newState);
      default:
        throw new Error(`${action.type} is not a valid action`);
    }
  }

  export default reducer;