import React, { useState, useEffect ,useContext} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DataContext } from './context/AppWithProvider';
import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';



export default function Login(props) {
  const {serverApi,setUser,setControl}=useContext(DataContext)
  let navigate=useNavigate()

  const{setFormState}=props
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });
  function handleFormState(e){
    e.preventDefault();
    setFormState('signup')
  }


async function login(data){
  //server vaildation
  let serverResponse=await serverVaildation(data.email,data.password)

  if(serverResponse!==undefined){
    //if the user writes an email and password that matches with server 
    //server will respone wiht user data so tkae this data and put in UI:
      const user=serverResponse;
    //1- add data to local storage then update UI by setUser
      localStorage.setItem("user",JSON.stringify(user))
      setUser(user)
    //2- notification about success registration 
      
    //3- go to  store and add params
    setTimeout(()=>{navigate('/')},50)
    

  }else{
     //if the user didn't write an email and password that matches with server
     setError("password",{
       type:"custom",
       message:"please write correct  email and password"}
     )

    
  }

}
async function serverVaildation(emailValue,passwordValue){

  const response=await axios.get(`${serverApi}/users?email=${emailValue}&password=${passwordValue}`)
  const user=response.data;
  if(user.length==1){
    return user[0]
  }else{
    return undefined
  }

}

  return (
    <>
      <div className="container mt-4">

        <div className="rounded-4  overflow-hidden bg-white mx-auto" style={{maxWidth: "500px", boxShadow : " 0 2px 30px #0000001a"}}>
          <div className="login-head bg-dark text-light p-4">
            <h3 className="text-center text-uppercase m-0">Login</h3>
          </div>
          <div className="login-body p-4 p-md-5">
            <div className="login-body-wrapper mx-auto" style={{maxWidth: "400px"}}>

              <form
                onSubmit={handleSubmit((data) => {
                  login(data)
                })}
              >
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    id="email" 
                    aria-describedby="helpId"  
                    {...register("email", { required: "email is required!" })}
                  />
                </div>
                <p className="text-danger fs-8">{errors.email?.message}</p>
              
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input  
                    className="form-control form-control-lg" 
                    id="password" 
                    aria-describedby="helpId" 
                    {...register("password", {required: "password is required!",minLength: { value: 4, message: "min length is 4" },})}
                  />
                  <p className="text-danger fs-8">{errors.password?.message}</p>
                  <a href="#!" >Forgot password?</a>
                </div>

                <button type="submit" className="btn btn-primary mt-1">Login</button>   
                <p className="text-muted text-center">New to our platform? <a href="#!" onClick={handleFormState}>Signup</a></p>
                <Tippy content={<span className="btn btn-dark">Tooltip</span>}>
                  <button onClick={()=>setControl('admin')}>admin</button>
                </Tippy>

              </form>

            </div>
          </div>
        </div>
        
      </div>

    </>
  );
}





<>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
      ...
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" className="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>
</div>
</>
