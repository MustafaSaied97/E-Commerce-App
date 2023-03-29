// libraries
import React,{useContext,useRef,useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import CustomToast from "../react-bootstrap-component/customToast";
// components
import {DataContext} from "../context/AppWithProvider"
import Loader from "../Loader";

function Setting() {
  const {serverApi,state,setState,user,setUser}=useContext(DataContext)
  const[selectedProduct,setSelectedProduct]=useState()
  const toastRef=useRef()



  const iconStyle = (e) => {
    const target=e.target
    if(target.className.match("pen")){
        target.className = target.className.match("text-primary")? target.className.replace("text-primary", "") :`${target.className} text-primary` 

    }else if (target.className.match("trash")){
        target.className = target.className.match("text-danger")? target.className.replace("text-danger", "") : `${target.className} text-danger`
    }   
  };

  async function deleteProduct (product){

    //befor changes --->save data first 
    let oldData=[...state.products]
    //make changes
      //clone
      let products=[...state.products]
      //edit
      products=products.filter((p)=> p !==product)

    //change  in backend server ---to delete data
    try{
      // make changes in all products
  
      await axios.delete(`${serverApi}/products/`+product.id)

      setState({products: products}) //or  setState({products})


      //handle changes in users products
      const response=await axios.get(`${serverApi}/users`)
      const users=response.data;
      users.forEach((serverUser)=>{
        serverUser.products.forEach(async(userProduct)=>{
          if(userProduct.id==product.id){
            userProduct.messageFromAdmin='Sold Out'
            await axios.put(`${serverApi}/users/`+serverUser.id,serverUser)
            if(serverUser.id==user.id){
              localStorage.setItem("user",JSON.stringify(serverUser))
              setUser(serverUser)
            }
          }
          
        })
     
      })
     
      //handle changes in users products
      if(user.name=='anonymous'){
        user.products.map((userProduct)=>{
          if(userProduct.id==product.id){
            userProduct.messageFromAdmin='Sold Out'
            return   userProduct
          }
            else{
              return   userProduct
            } 
        })
        localStorage.setItem("user",JSON.stringify(user))
        setUser(user)
      }


      //notification about complete chnages
      toastRef.current.click()

    }catch{
      alert("cant delete data")
      setState({products: oldData})
    }
  }


  return (
    <>
      <CustomToast 
        bg='success'
        body={
          <>
            <i className="fa-solid fa-circle-check text-light" ></i>
            <span className=" ms-2 text-light text-wrap">product was deleted successfully</span> 
          </>
        }
      >
        <button ref={toastRef} type="button" className="btn btn-primary d-none " ></button>
      </CustomToast>
      {state.products.length==0?
        <Loader/>
        :
        <>
          <Link  to='/productform/new' className='btn btn-primary btn-sm mt-4 mb-5 p-1 fs-5'>
                Add New Product <i className="fa-solid fa-square-plus"></i>
          </Link>
          <div className="table-responsive">
            <table className=" table align-middle  ">
              <thead>
                <tr className="mb-5 text-primary">
                <th scope="col">Catagory</th>
                  <th scope="col">Picture</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Remove</th>
                </tr> 
              </thead>
              <tbody  className="align-middle">
                {state.products.map((product) => {
                  return (
                    <tr key={product.id} className="shadow bg-white  h-100 ">
                      <td>{product.category}</td>
                      <td><img src={product.imgSrc} className="rounded-3 "  style={{maxWidth: "50px"}}alt="..."/></td>
                      <td style={{maxHeight: "50px",overflow:"hidden"}}>{product.name}</td>
                      <td>{product.price} <i className="fa-solid fa-dollar-sign"></i></td>
                      <td>
                          <Link  to={`/productform/${product.id}`} className='text-secondary'>
                            <i
                              className="fa-solid fa-pen-to-square m-2 m-0"
                              style={{ cursor: "pointer" }}
                              onMouseOver={iconStyle}
                              onMouseOut={iconStyle}
                            ></i>
                          </Link>
                      </td>
                      <td>  
                  
                        {/* modal message whrn Admin user click on delete Product */}
                        <span  type="button" className=" fs-6 " data-bs-toggle="modal" data-bs-target="#WarningForDeleteProduct" > 
                          <i className="fas fa-trash m-2 m-0" style={{ cursor: "pointer" }} onMouseOver={iconStyle} onMouseOut={iconStyle} onClick={()=>setSelectedProduct(product)}></i>
                        </span> 
                        <div className="modal fade" id="WarningForDeleteProduct" tabIndex="-1" aria-labelledby="WarningForDeleteProduct" aria-hidden="false">
                           <div className="modal-dialog">
                             <div className="modal-content">
                               <div className="modal-header">
                                 <h1 className="modal-title fs-5" id="WarningForDeleteProduct">"are you sure about deleting this product" </h1>
                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                               </div>
                               <div className="modal-footer">
                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">no</button>
                                 <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>deleteProduct(selectedProduct)}>yes</button>
                  
                               </div>
                             </div>
                           </div>
                        </div> 
                  
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      }

 
    </>
  );
}
export default Setting;


