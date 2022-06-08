import React from "react";
import Message from "../Message/Message";
import Dish from "./Dish"

function Dishes({title, flag, isTrue, isFalse, dishes, group, children, buttonAdd, buttonDelete, buttonDetails}) {  

  let dishesGroup = undefined;
  if (dishes && dishes.length > 0)
  { 
    dishesGroup = dishes.filter( (item) => item.group == group)
  }

  return (
    <div className="row hidden-md-up justify-content-center">
      
      <h3 className="text-center">{title}</h3>  
      {children}    
      {dishesGroup && dishesGroup.length > 0 ? (
        dishesGroup.map((item, index) => {
          item.buttonAdd = buttonAdd;
          item.buttonDelete = buttonDelete;
          item.buttonDetails = buttonDetails;          
          return (
            <div className="col-md-4" key={new Date() + 100 + index}>
              <Dish {...item} key={new Date() + index} />
            </div>
          );
        })
      ) : (
        <Message
          flag={flag}
          isTrue=""
          isFalse={"No se encontraron platos"}
        />
      )}
     
    </div>
  );
}

export default Dishes;
