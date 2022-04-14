  
  function deleteDish(state, action) {
    console.log("delete plato " + action.id);
    let newPlatos = state.dishes.filter((item) => item.id != action.id);    
    return {
      ...state,
      dishes: newPlatos,
    };
  }
  
  function addDish(state, action) { 
    let newPlatos = [action.data];
    if (state.dishes)
    {
    newPlatos = [ ...state.dishes, action.data ];  
    }
    else 
    {
    newPlatos = [ action.data ];  
    }
    return {
      ...state,
      dishes: newPlatos,
    }     
  }

  function addDishes(state, action) {    
    let newPlatos = [action.data];
    if (state.dishes)
    {
    newPlatos = [ ...state.dishes, ...action.data ];  
    }
    else 
    {
    newPlatos = [ ...action.data ];  
    }
    return {
      ...state,
      dishes: newPlatos,
    }     
  }
  
  function reduceData(state) {
    if (state.dishes)
    {
    let dishesInMenu = state.dishes.filter( (a) => a.group=="inMenu")
    let prices = dishesInMenu.map((a) => a.price?a.price:0);
    console.log(prices);
    let times = dishesInMenu.map((a) => a.time?a.time:0);
    console.log(times);
    let healths = dishesInMenu.map((a) => a.health?a.health:0);
    console.log(healths);
    let sumaPrices = prices.reduce((a, b) => a + b, 0);
    let sumaTime = times.reduce((a, b) => a + b, 0);
    let sumaHealth = healths.reduce((a, b) => a + b, 0);
       
    return {
      ...state,
      total: sumaPrices.toFixed(2),
      time: times.length?(sumaTime / times.length).toFixed(2):0,
      health: healths.length?(sumaHealth / healths.length).toFixed(2):0,
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