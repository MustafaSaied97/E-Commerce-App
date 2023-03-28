// -------------react libraries----------------------------------------------------------------------------------------------
import React,{useContext,useRef } from 'react'
import {Link, NavLink,useNavigate} from 'react-router-dom'
import axios from "axios"
import Tippy from '@tippyjs/react';
import CustomToast from "./react-bootstrap-component/customToast";
// -------------components----------------------------------------------------------------------------------------------
import { DataContext } from './context/AppWithProvider';


function  NavBar () {
   const {serverApi,control,user,setUser}=useContext(DataContext)
   const toastRef=useRef()
   const delRef=useRef()

   let productsInCart=user.products
   let navigate= useNavigate()
   function handleLogut(){
      localStorage.removeItem('user')
      setUser({name:'anonymous',email:'',password:'',products:[],id:''})
      navigate('/',{replace:true})

   }


   function warningMessage(){
      delRef.current.click()
   }
   async function handleDeleteAccount(){
     
         await axios.delete(`${serverApi}/users/`+user.id)
         localStorage.removeItem('user')
         setUser({name:'anonymous',email:'',password:'',products:[],id:''})
         toastRef.current.click()
      

   }
   
 
   return (  
   <>
     <nav  className="navbar navbar-expand-sm bg-dark sticky-top h-1  " data-bs-theme="dark">
      <div className="container-fluid navbar-dark ">

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>

           {/* ----------------------1------------- */}
           <div className=" navbar-brand p-0 text-white bg-opacity-25 rounded  fs-3">
            <Link to='/' style={{textDecoration:'none'}}>
               <span className=" text-info fw-bold ">e</span>
              <span className=" text-secondary fw-bold ">Commerce App</span>
            </Link>
          
            </div>
            {/* ----------------------2------------- */}
            
            {user.id==""&&user.name==""? 
            ""
            : 
            <Tippy content="Cart">     
              <NavLink   className="navbar-brand  d-block d-lg-none d-md-none d-sm-none " to="/cart">
                  {productsInCart.filter((p)=>p.messageFromAdmin=='').length==0?
                    <span className=" p-1">
                       <i className="fa-solid fa-cart-arrow-down  fs-5 "></i>
                    </span>
                    :
                    <span className=" btn btn-secondary position-relative ms-1 p-1"style={{fontSize:".6rem"}}>
                     <i className="fa-solid fa-cart-arrow-down me-1 fs-6 "></i>
      
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary "style={{fontSize:".6rem"}}>
                      {productsInCart.filter((p)=>p.messageFromAdmin=='').length}
      
                      </span>
                    </span>
                  }
              </NavLink>
            </Tippy>
            }

           {/* ----------------------3------------- */}
           <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  ms-lg-5 ps-lg-5 mt-3 mt-lg-0 ">
                {/* ----------------------3_1------------- */}
                <li className="nav-item">
                  {control=='admin'?
                   <NavLink className="nav-link" to="/setting">Setting</NavLink>
                   :
                   <NavLink className="nav-link" to="/setting">
                     Admin
                        <span className="  position-relative ms-1 p-0 fs-6">
                           <i className="fa-regular fa-circle-user"></i>
                        <span className="position-absolute top-0 start-100 translate-middle rounded-pill "style={{fontSize:".5rem"}}>
                           <i className="fa-sharp fa-solid fa-crown"style={{transform:"rotateZ(30deg)"}}></i>
                        </span>
                        </span>
                   </NavLink>
                  }
               </li>
         
               {/* ----------------------3_2------------- */}
               {
                  user.name==""||user.name=="anonymous"?
                  ""
                  :
                  <li className="nav-item dropdown " style={{cursor:"pointer"}} >
                     <a className="nav-link  dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                        User
                        <i className="ms-1 fa-regular fa-id-card fs-5"></i>
                     </a>
                     <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark ">
                       <li><span className="dropdown-item badge text-bg-secondary fs-6" >User Info </span></li>
                       <li><span className="dropdown-item" ><span className='badge text-bg-dark'>Name</span> {user.name}</span></li>
                       <li><span className="dropdown-item" ><span className='badge text-bg-dark'>Email</span> {user.email}</span></li>
                       <li><span className="dropdown-item" ><span className='badge text-bg-dark'>Password</span> {user.password}</span></li>
                       <li><hr className="dropdown-divider"/></li>
                       <li>
                          <span className='dropdown-item'>
                          <button className="btn btn-danger fs-6" onClick={warningMessage}>Delete Account</button>
                          </span>
                          <span className='dropdown-item'>
                             <button className="btn btn-success fs-6 d-flex justify-content-center align-items-center"onClick={handleLogut}>
                                 logout 
                                 <i className="fa-solid fa-door-open ps-1"></i>
                                 <i className="fa-solid fa-arrow-right"style={{fontSize:".5rem"}}></i>
                              </button>
                          </span>
                       </li>
                     </ul>
                  </li>

               }
    
               {/* ----------------------3_3------------- */}
               <li className="nav-item">
                  <NavLink className="nav-link" to="/">

                       
                  Store <i className="fa-solid fa-store fs-5"></i> 

                  </NavLink>
               </li>
        
               {/* ----------------------3_4------------- */}
               <li className="nav-item">
                  {
                     user.id==""?
                     <NavLink className="nav-link" to="/form">
                        Login
                        <Tippy content="Login">
                           <i className="fa-solid fa-right-to-bracket ms-1"></i>
                        </Tippy>
                     </NavLink>  
                     :
                     ""
                  }
               </li>

            </ul>
            </div>

            {user.id==""&&user.name==""? 
            ""
            : 
            <Tippy content="Cart">  
              <NavLink   className="  d-none d-lg-block d-md-block d-sm-block   text-secondary" to="/cart">
                  {productsInCart.filter((p)=>p.messageFromAdmin=='').length==0?
                    <span className=" ps-1 pe-1 border border-2 border-secondary  rounded ">
                       <i className="fa-solid fa-cart-arrow-down  fs-6 "></i>
                    </span>
                    :
                    <span className=" btn btn-secondary position-relative ms-1 p-1"style={{fontSize:".6rem"}}>
                     <i className="fa-solid fa-cart-arrow-down me-1 fs-6 "></i>
      
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary "style={{fontSize:".6rem"}}>
                      {productsInCart.filter((p)=>p.messageFromAdmin=='').length}
      
                      </span>
                    </span>
                  }
              </NavLink>
            </Tippy>
            }
    

        </div>
            
      </nav> 
      {/* modal message whrn user click on delete accout */}
            <button ref={delRef} type="button" className="btn btn-danger fs-6 d-none" data-bs-toggle="modal" data-bs-target="#WarningForDeleteAccount" > </button>         
      <div className="modal fade" id="WarningForDeleteAccount" tabIndex="-1" aria-labelledby="WarningForDeleteAccount" aria-hidden="true">
         <div className="modal-dialog">
           <div className="modal-content">
             <div className="modal-header">
               <h1 className="modal-title fs-5" id="WarningForDeleteAccount">{"are you sure about deleting your account"} </h1>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div className="modal-footer">
               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">no</button>
               <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteAccount}>yes</button>
             </div>
           </div>
         </div>
      </div>
      <CustomToast 
           bg='success'
           body={
             <>
               <i className="fa-solid fa-circle-check text-light" ></i>
               <span className=" ms-2 text-light text-wrap"> Account was deleted successfully</span> 
             </>
           }
         >
           <button ref={toastRef} type="button" className="btn btn-primary d-none " ></button>
      </CustomToast> 
   </>
      
   );
       
}
export default NavBar;



