import React from 'react'
import { useState } from 'react';

export default function App() {

    const [fullName, setFullName] = useState({
        fName: "",
        lName: ""
      });
    
    const [showGreeting,setState] = useState(false)

      function handleChange(event) {
        const { value, name } = event.target;
    
        setFullName(prevValue => {
          if (name === "fName") {
            return {
              fName: value,
              lName: prevValue.lName
            };
          } else if (name === "lName") {
            return {
              fName: prevValue.fName,
              lname: value
            };
          }
        });
      }
  
    const date = new Date();
    const currentTime = date.getHours();

    let greeting;

    if(currentTime < 12){
        greeting = "Good Morning"
    }  else if (currentTime < 18){
        greeting = "Good Afternoon"
    }else{
        greeting = "Good Night"
    }

    function displayGreeting(){
        setState(true);
    }
  
    return (
        <div>
        <h1>
          Hello
        </h1>

        { !showGreeting ? 

        <form onSubmit={displayGreeting}>
          <input
            name="fName"
            onChange={handleChange}
            placeholder="First Name"
            value={fullName.fName}
          />
          <input
            name="lName"
            onChange={handleChange}
            placeholder="Last Name"
            value={fullName.lName}
          />
          <button>Submit</button>
        </form> : <h1>{greeting} {fullName.fName} {fullName.lName}</h1>}
      </div> 
  );
}
