import React ,{useContext,useRef }from "react";
import {useParams} from 'react-router-dom';
import { DataContext } from './context/AppWithProvider';
import CustomToast from "./react-bootstrap-component/customToast";
import axios from 'axios';

// import CustomToast from "../react-bootstrap-component/customToast";

const ProductDetails = () => {
    let {id}=useParams()
    const {serverApi,user,setUser,state,setState}=useContext(DataContext)
    let product= state.products.length!==0?

    state.products.filter((product)=>product.id==id)[0]
    :
    {name: "",price: "", count: 1,imgSrc: "",inCart: false,category: "",stars: "",ratings: 31,Reviews: 18,messageFromAdmin: "",id:''}

    function isUserProductInCart(product){
        for (const userProduct of user.products) {
          if(userProduct.id==product.id){
            return true
          } 
    
        }
        return false
      }
 
      async function handleChangeInCart(product){
        let UseBeforeEdit={...user}
        //changes in all products
        //clone
        let products = [...state.products];
        let userProducts = [...user.products];
        //deep clone
        let index = products.indexOf(product);
        let productcloning={...products[index]}
        //edit
        productcloning.inCart = !productcloning.inCart;
    
        let userProduct=userProducts.filter((userProduct)=>userProduct.id==productcloning.id)[0]
        if(userProduct==undefined){
          userProducts.push(productcloning)
        }else{
          userProducts.splice(userProducts.indexOf(userProduct),1)
    
        }
        //update -with setState
        setState({ products : products }); //or  setState({products})
    
        //changes in user products by add all products that have incart equal true
        //i am using optimistic update to make the app faster
        //1-update UI
        localStorage.setItem('user',JSON.stringify({...user,products:userProducts}))
        setUser({...user,products:userProducts})
        try{
          //2-then update server
          if(user.name!=='anonymous'&&user.id!==''){
            await axios.put(`${serverApi}/users/${user.id}`,{...user,products:userProducts})
          }
        }catch{
          //3-protectin if serevr faild update ui with old data 
          localStorage.setItem('user',JSON.stringify({...UseBeforeEdit}))
          setUser({...UseBeforeEdit})
        }
    
      }
     const orderRef=useRef()
     function orderMessage(){
       orderRef.current.click()
    }
         

  return (
    <>
    <div className="container  mt-5">
      <div className="row">
        <div className=" col-sm-3  mt-3 d-flex justify-content-center align-items-center">
           <img data-bs-toggle="modal" data-bs-target="#ModalImg"   src={product.imgSrc}  style={{maxHeight: "150px",objectFit: "contain",cursor:'pointer'}} />  
           {/* modal for full picture */} 
            <div className="modal fade" id="ModalImg" tabIndex="-1" aria-labelledby="ModalLabelImg" aria-hidden="true">
               <div className="modal-dialog modal-dialog-centered">
                 <div className="modal-content">
                 
                 <img src={product.imgSrc}  style={{ maxHeight: "500px",objectFit: "contain", padding:'10px'}}/> 
                  
                 </div>
               </div>
            </div>
        </div>

        <hr className="d-lg-none mt-2"/>
        
        <div className=" col-sm-9 d-flex flex-column justify-content-around align-items-centre text-center">
          <div className="row">
            <div className="col-3 col-sm-6 fs">
              <h5>category</h5>
            </div>
            <div className="col-8 col-sm-6">
              {product.category}
            </div>
          </div>
          
          <hr />

          <div className="row">
            
            <div className="col-3 col-sm-6">
                <h5>name</h5>
            </div>
            <div className="col-8 col-sm-6">
              {product.name}
            </div>
          </div>

          <hr/>
          <div className="row">
           
           <div className="col-3 col-sm-6">
               <h5>Price</h5>
           </div>
           <div className="col-8 col-sm-6">
             {product.price}$
           </div>
         </div>

         <hr/>

          <div className="row ">
            
            <div className="col-6 col-sm-6">
               <a  className="text-muted text-nowrap">({product.ratings} ratings & {product.Reviews} Reviews)</a>
            </div>
            <div className="col-6 col-sm-6">
                <span className="rating-stars text-warning">
                   {ratingStars(product.stars)}
			    </span>
                {product.stars}
            </div>
          </div>

          <hr/>



          <div className="row">
                
                <div className="col-6 col-sm-6">
                {
                     user.id==""&&user.name==""?
                     <>
                    <div  data-bs-toggle="modal" data-bs-target="#Modal-Warning">
                    
                        <span className="btn btn-secondary py-1 px-2">
                        Add to cart 
                        <i className="fa-solid fa-cart-plus ms-2 " ></i>
                        </span>

                    </div>
                    
                    {/* modal message when no user click on add on cart */}
                    <div className="modal fade" id="Modal-Warning" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                       <div className="modal-dialog">
                         <div className="modal-content">
                           <div className="modal-body">
                             <h1 className="modal-title fs-5 ms-5 text-secondary " id="ModalLabel">you need to login first !</h1>
                           </div>
                         </div>
                       </div>
                    </div> 
                    </>
                    :
                    <div   onClick={()=>{handleChangeInCart(product)}} >
                    
                      {
                        // product.inCart?
                        isUserProductInCart(product)?

                    
                        <span className="btn btn-primary py-1 px-2 ">
                        in cart 
                        <i className="fa-solid fa-turn-down ms-2" ></i>
                        </span>
                        :
                        <span className="btn btn-secondary py-1 px-2">
                        Add to cart
                        <i className="fa-solid fa-cart-plus ms-2 " ></i>
                        </span>
                      }

                    </div>


                }

                </div>
                <div className="col-6 col-sm-6">
                   
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
                                      delay="4000"
                                    >
                                        <button  ref={orderRef}type="button" className="btn btn-primary d-none" >Submit Order</button>
                                    </CustomToast>
                                  </div>
                              </form>
                       
                            </div>
                          </div>
                        </div> 
    
                   
                </div>
          </div>


        </div>
      </div>
    </div>



    


 
    </>
  );
};

































export default ProductDetails;
function ratingStars(n){
    let arry=[]
    let num=parseInt(n)
    let x=Math.floor(n)
    for (let index = 0; index < 5; index++) {
      if(x!=0){
        // arry.push("fa-solid fa-star")
        arry.push(<i key={index}className="fa-solid fa-star"></i>)
        // arry.push("-1-")
        x--
      }else if(num-x!==0){
        // arry.push("fa-regular fa-star-half-stroke")
        arry.push(<i key={index} className="fa-regular fa-star-half-stroke"></i>)
        // arry.push("-5-")
        num=0
      }else{
        // arry.push("fa-regular fa-star")
        arry.push(<i key={index} className="fa-regular fa-star"></i>)
        // arry.push("-0-")
      }
      
    }
    return arry
  }