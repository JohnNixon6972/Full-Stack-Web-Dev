import React,{useEffect, useState} from 'react'
import axios from "axios"
import {useLocation} from "react-router"

export default function App() {
  const [models,setModels] = useState([]);
  const {search} = useLocation();

  useEffect(()=>{
    const fetchModels = async ()=>{
      const res = await axios.get("https://drf-dummy-server.herokuapp.com/ml-models/");
      setModels(res.data);
    }
    fetchModels()
  },[search])

  console.log(models);
  return (
    <div>
    
        hello
    </div>
  )
}
