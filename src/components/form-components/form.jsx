// libraries
import React, { useState,useContext } from "react";
// components
import Login from "./login";
import Signup from "./signup";
import Loader from "../Loader";
import {DataContext} from "../context/AppWithProvider"

function Form() {
  const[formState,setFormState]=useState('login')
  const {state}=useContext(DataContext)

  return (
    <>
    {state.products.length==0?
        <Loader/>
        :
        <>
        {formState=='login'?<Login setFormState={setFormState}/>:<Signup setFormState={setFormState}/>}
        </>
    }
    </>
  );
}
export default Form;


