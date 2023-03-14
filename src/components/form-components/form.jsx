// libraries
import React, { useState } from "react";
// components
import Login from "./login";
import Signup from "./signup";

function Form() {
  const[formState,setFormState]=useState('login')

  return (
    <>
      {formState=='login'?<Login setFormState={setFormState}/>:<Signup setFormState={setFormState}/>}

    </>
  );
}
export default Form;


