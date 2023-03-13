import React, { useState, useEffect,useRef ,useContext} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import CustomToast from "./react-bootstrap-component/customToast";
import {DataContext} from "./context/AppWithProvider"



export default function Login(props) {
  const {serverApi}=useContext(DataContext)

  const toastRef=useRef()

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
    setFormState('login')
  }
 

  async function addUser(data){

    let newUser={
      name:data.user,
      email:data.email,
      password:data.password,
      products:[]
    }
   

    if(await serverVaildation(data.email)){
      //don't add user to server and display error message
      setError("email",{
        type:"custom",
        message:"email existed in the database"}
      )
    }else{
      //add user to server
      await axios.post(`${serverApi}/users`,newUser)
      //notification about success registration 
      toastRef.current.click()
      //back to login
      setTimeout(()=>{setFormState('login')},2500)
    }

  }


  async function serverVaildation(emailValue){
    // const response=await axios.get("http://localhost:3001/users")
    // const users=response.data;

    // let isUserExist=!users.every(user => {
    //   if(user.email===emailValue){

    //     return false;
    //   }
    //   return true;
    // })


    // if(isUserExist){
    //   return true
    // }else{
    //   return false
    // }
    const response=await axios.get(`${serverApi}/users?email=${emailValue}`)
    const user=response.data;
    if(user.length!==0){
      return true
    }else{
      return false
    }
  }


  return (
    <>
      <CustomToast 
        bg='success'
        body={
          <>
            <i className="fa-solid fa-circle-check text-light" ></i>
            <span className=" ms-2 text-light text-wrap">Registration successfully completed</span> 
          </>
        }
      >
        <button ref={toastRef} type="button" className="btn btn-primary d-none" ></button>
      </CustomToast>
      <div className="container mt-4">

        <div className="rounded-4  overflow-hidden bg-white mx-auto" style={{maxWidth: "500px", boxShadow : " 0 2px 30px #0000001a"}}>
          <div className="login-head bg-dark text-light p-4">
            <h3 className="text-center text-uppercase m-0">Signup</h3>
          </div>
          <div className="login-body p-4 p-md-5">
            <div className="login-body-wrapper mx-auto" style={{maxWidth: "400px"}}>

              <form
                onSubmit={handleSubmit((data) => {
                  addUser(data)   
                })}
              >
                <div className="form-group">
                  <label htmlFor="user">User Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="user" 
                    aria-describedby="helpId"  
                    {...register("user", { required: "user name is required!" })} 
                  />
                </div>
                <p className="text-danger fs-8">{errors.user?.message}</p>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    id="email" 
                    aria-describedby="helpId"  
                    {...register(
                      "email", 
                      { 
                        required: "email is required!"
                       
                      })
                      
                    }
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
                </div>

                <button type="submit" className="btn btn-primary mt-1">Submit</button>   
                <p className="text-muted text-center">Already have an account? <a href="#!" onClick={handleFormState}>Login</a></p>

              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}



