import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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


