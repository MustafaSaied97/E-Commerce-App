import React from 'react';
import {useRef }from "react";
import {useParams, useNavigate } from 'react-router-dom';
import CustomToast from "../react-bootstrap-component/customToast";



export default function UserProductDetails() {
    let user= JSON.parse(localStorage.getItem('user'))
    let {id}=useParams()
    let navigate= useNavigate()


    let product;
    if(user!==null){
        product=user.products.filter((product)=>id==product.id)[0]

    }else{
        product= []
        // backToCart()
    }

    function backToCart(){
        return navigate('/cart',{replace:true})
    }
    const orderRef=useRef()
    function orderMessage(){
      orderRef.current.click()
   }

    return (
        <React.Fragment>

            <div className="container col-lg-6 col-md-6 col-sm-6 rounded-5 shadow bg-white text-center h-100 mt-5">

            <div className="  d-flex justify-content-center align-items-center">
              <img src={product.imgSrc} alt="Card" className="card-img"  style={{height: "150px",objectFit: "contain"}} />
            </div>

            <div className="p-4" >

              <h5>{product.name}</h5>

              <div className="rating-box d-flex flex-column">
                <div className="rating-box__items">
                  <span className="rating-stars text-warning">
                    {ratingStars(product.stars)}
                  </span>
                  <span className="ml-1"><b>{}</b></span>
                </div>
                <a  className="text-muted">({product.Reviews}ratings &  {product.ratings}Reviews)</a>
              </div>

              <p className="text-muted">price:{product.price}  $</p>
              <hr/> 
              <div className='d-flex flex-wrap justify-content-around align-items-center gap-1'>
                {product.messageFromAdmin==''?<>
                    <span className="badge bg-gradient bg-secondary p-2">
                     items
                      <span className="ms-2 badge bg-gradient bg-primary" style={{fontSize:".7rem"}}>
                        {product.count} 
                        <i className="fa-solid fa-basket-shopping ms-1"></i>
                      </span>
                   </span> 
                   <span  data-bs-toggle="modal" data-bs-target="#Modal-Order" className="btn btn-primary py-1 px-2  "  >
                    order now
                    <i className="fa-solid fa-truck ms-2" ></i>
                  </span>
                  {/* modal message when user click on add on order */}
                  <div className="modal fade" id="Modal-Order" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">

                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">please fill out these fields to complete your order. </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>

                      <form className="modal-body" onSubmit={(e)=>{e.preventDefault(); orderMessage()}} >

                        <div className="mb-3">
                          <label htmlFor="recipient-name" className="col-form-label">Phone Number:</label>
                          <input type="number" className="form-control" id="recipient-name" required/>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="message-text" className="col-form-label">Adress:</label>
                          <input type="text" className="form-control" id="recipient-name" required/>
                        </div>

                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            <button type="submit" className="btn btn-primary"  >Submit Order</button>
                            <CustomToast
                              bg='success'
                              body={
                                <>
                                  <i className="fa-solid fa-circle-check text-light" ></i>
                                  <span className=" ms-2 text-light text-wrap ">
                                    your order is under consideration<br/> 
                                    we will contact you soon for confirmation
                                   <i className="fa-solid fa-truck-fast ms-2"></i>
                                   </span> 
                                </>
                              }
                              delay="3500"
                            >
                                <button  ref={orderRef}type="button" className="btn btn-primary d-none" >Submit Order</button>
                            </CustomToast>
                          </div>
                      </form>
                            
                    </div>
                  </div>
                  </div>                   
                   </>
                   :
                   <button className="btn btn-warning opacity-50" >Sold Out<i className="fa-solid fa-store-slash"></i></button>

                }
             
              </div>          


            </div>

            </div>       

        </React.Fragment>
    )
}
function ratingStars(n){
    let arry=[]
    let num=parseInt(n)
    let x=Math.floor(n)
    for (let index = 0; index < 5; index++) {
      if(x!=0){
        arry.push(<i key={index}className="fa-solid fa-star"></i>)
        x--
      }else if(num-x!==0){
        arry.push(<i key={index} className="fa-regular fa-star-half-stroke"></i>)
        num=0
      }else{
        arry.push(<i key={index} className="fa-regular fa-star"></i>)
      }
      
    }
    return arry
  }

  
  




// <CustomToast
//                       bg='success'
//                       body={
//                         <>
//                           <i className="fa-solid fa-circle-check text-light" ></i>
//                           <span className=" ms-2 text-light text-wrap ">
//                             your order is under consideration<br/> 
//                             we will contact you soon for confirmation
//                            <i className="fa-solid fa-truck-fast ms-2"></i>
//                            </span> 
//                         </>
//                       }
//                       delay="3000"
//                     >
//                    <span className="btn btn-primary py-1 px-2  " onClick={()=>setTimeout(backToCart,3000)} >
//                      order now
//                      <i className="fa-solid fa-truck ms-2" ></i>
//                    </span>
//                    </CustomToast>