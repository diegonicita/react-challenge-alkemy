  
  function deletePlato(state, action) {
    console.log("delete plato " + action.id);
    let newPlatos = state.platos.filter((item) => item.id != action.id);    
    return {
      ...state,
      platos: newPlatos,
    };
  }
  
  function addPlato(state, action) {    
    let newPlatos = [action.data];
    if (state.platos)
    {
    newPlatos = [ ...state.platos, action.data ];  
    }
    else 
    {
    newPlatos = [ action.data ];  
    }
    return {
      ...state,
      platos: newPlatos,
    }     
  }
  
  function reduceData(state) {
    if (state.platos)
    {
    let prices = state.platos.map((a) => a.price);
    let times = state.platos.map((a) => a.time);
    let healths = state.platos.map((a) => a.health);
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
      case "deletePlato":
        newState = deletePlato(state, action);
        return reduceData(newState);
      case "addPlato":
        newState = addPlato(state, action);
        return reduceData(newState);
      default:
        throw new Error(`${action.type} is not a valid action`);
    }
  }

  export default reducer;