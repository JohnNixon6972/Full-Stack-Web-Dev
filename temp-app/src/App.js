
import { useState } from 'react';
import './App.css';

function App() {
  const [fullName,setFullName] = useState({
    fName : "",
    lName : ""
  });

  const [showGreetings,setState] = useState(false);

  function handleChange(event){
    const {value,name} = event.target;

    setFullName(prevValue =>{
      if(name === "fName"){
        return {
          fName : value,
          lName : prevValue.lName
        }
      }
     else if(name === "lName"){
        return {
          fName : prevValue.fName,
          lName : value
        }
      }
    })
  }

  const date = new Date();
  const currentTime = date.getHours();

  let greetings;

  function displayGreetings(){
    setState(true);
  }

  if(currentTime < 12){
    greetings = "Good Morning"
  }else if(currentTime <18){
    greetings = "Good Afternoon"
  }
  else{
    greetings = "Good Night"
  }

  return (

    <div>
      <h1>Hello</h1>

    {showGreetings? 
    <h1>{greetings} {fullName.fName} {fullName.lName}</h1> 
    : 
      <form onSubmit={displayGreetings}>
        <input type="text" name="fName" placeholder='First Name' value={fullName.fName} onChange={handleChange} />
        <input type="text" name="lName" placeholder='Last Name' value={fullName.lName} onChange={handleChange}/>
        <button>Submit</button>
      </form>
    }
    </div>
  );
}

export default App;
