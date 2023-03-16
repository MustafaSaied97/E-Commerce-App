// libraries
import React,{useContext,useRef,useState,useMemo,useEffect}  from "react";
import axios from 'axios';
// components
import { DataContext } from './context/AppWithProvider';
import { Link, Outlet } from 'react-router-dom';


function Store (){
  const {serverApi,user,setUser,state,setState}=useContext(DataContext)
  const [productNameInput,setProductNameInput]=useState('')
  const [showSearchList,setShowSearchList]=useState(true)

  const [productName,setProductName]=useState('')
  const [productPrice,setProductPrice]=useState({min:'',max:''})
  const [productCategory,setProductCategory]=useState('Choose...')
  
  const filteredProducts=useMemo(()=>genericFiltration([...state.products],productPrice,productCategory,productName,productNameInput) , [productPrice,productCategory,productName])



 //control what user see for products if use filtering system
  const allProducts=[...state.products]
  let products;
  if(productName==''&&productPrice.min==''&&productPrice.max==''&&productCategory=='Choose...'){
    products=allProducts
  }else{
    products=filteredProducts
  } 


 

  const [showSearchNotFound,setShowSearchNotFound]=useState(false)
  const [prevState_showSearchNotFound,setPrevState_showSearchNotFound]=useState(false)//for stroing previouse state of showSearchNotFound 

  let searchNotFoundRef=useRef()
    //control if user click in serah bar and didnit find any results
  useEffect(()=>{
    if(productName!==''&&filteredProducts.length==0){
      setShowSearchNotFound(true)
    }
  },[productName])


 function value(prev){
  setPrevState_showSearchNotFound(prev)
  return false
 }
 useEffect(()=>{
  //make comaraison between previouse and current state of showSearchNotFound 
  if(showSearchNotFound!==prevState_showSearchNotFound){
    searchNotFoundRef.current.click()
  }
},[showSearchNotFound])
  

//add from all product to user products
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



  function isUserProductInCart(product){
    for (const userProduct of user.products) {
      if(userProduct.id==product.id){
        return true
      } 

    }
    return false
  }
     
  const warning=useRef()
  function warningMessage(){
    warning.current.click()
  }

    return ( 
        <>
      {/* filteration */}
      
       <div ref={searchNotFoundRef} role='button' data-bs-toggle="collapse" data-bs-target="#searchNotFound" aria-expanded='true'aria-controls="searchNotFound" >
        </div> 
        <div className=" collapse" id="searchNotFound">
          <div className="container d-flex flex-lg-nowrap flex-wrap gap-1  w-50 mt-5 "  >
            No results !<br/>
            Try checking your spelling or use more general terms
          </div>
      
        </div>


        <div  className=" container mt-5 d-flex justify-content-center align-items-center gap-5 " >
          
          <div className=" d-flex flex-column position-relative " style={{width:"800px"}} >

            <div className="input-group  "style={{height:'36px'}} >
              <input type="text" className="form-control" placeholder="Search..." aria-label="Productname" aria-describedby="basic-addon1" value={productNameInput} onChange={(e)=> {setProductNameInput(e.target.value);setShowSearchList(true);setShowSearchNotFound(value)}}  />
              <span 
                className="input-group-text  btn btn-secondary opacity-50 " 
                id="basic-addon1" 
                onClick={()=>{ setProductName(productNameInput)}}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>

            </div >
         
              {  showSearchList?
            
                <ul className="list-group  list-group-flush border border-2 border-top-0 rounded  border-top-0 position-absolute  w-100" style={{zIndex:'1',marginTop:'36px',maxHeight: "400px",overflow:"auto",textOverflow:"ellipsis"}} onBlur={(e)=>setShowSearchList(false)}>
                     
                  { allProducts.map((product)=>{  
                     if(product.name.toLocaleLowerCase().includes(productNameInput.toLocaleLowerCase()) && productNameInput!==''){
                      return <li 
                        key={product.id}  
                        className="list-group-item list-group-item-action" 
                        onClick={(e)=>{setProductNameInput(product.name);setShowSearchList(false)}}
                        >
                         {product.name}
                       </li>
                     }
  
                   })}
           
                </ul>
               

                :

                ""  
              }
  
          </div>

          

          <div  data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"  >
            <span className="btn btn-secondary opacity-50  " id="basic-addon1" >
              filter 
              <i className="fa-solid fa-sliders ms-1"></i>
              </span> 
          </div>

        </div>

    
        <div className=" collapse" id="collapseExample">
          <div className="container d-flex flex-lg-nowrap flex-wrap    gap-1  mt-5   " style={{maxWidth:"800px"}} >
            <div className="input-group input-group-sm " >
              <span className="input-group-text "style={{padding:'5px'}}>Price Range $</span>
              <input 
                type="text" 
                aria-label="First name" 
                className="form-control" 
                placeholder="min"  
                value={productPrice.min} 
                onChange={(e)=> {setProductPrice({...productPrice ,min: e.target.value});}} 
              />
              <input 
                type="text" 
                aria-label="Last name" 
                className="form-control"  
                placeholder="max"   
                value={productPrice.max} 
                onChange={(e)=> {;setProductPrice({...productPrice ,max: e.target.value});}}
              />
            </div>
            <div className="input-group input-group-sm ">
              <label className="input-group-text " htmlFor="inputGroupSelect01">Category</label>
              <select className="form-select" id="inputGroupSelect01" onChange={(e)=>setProductCategory(e.target.value)  }>
                <option defaultValue>Choose...</option>
                {
                  [ 'Furniture',
                    'Clothes',
                    'Electronics'
                  ]
                  .map((Category,index)=> <option  key={index} defaultValue={index+1} onClick={()=>setProductCategory(Category)} >{Category}</option>)
                }

              </select>
            </div>

          </div>
      
        </div>

          
          <section className="main-content" style={{paddingTop: "50px",paddingBottom: "100px"}} >
		        <div className="container">
             <div className="row">
              {
                products.map((product)=>{
                  return(
                    <div className="col-lg-3 col-md-5 col-sm-6 mb-4  p-4 " key={product.id}>
                      
                      <div className=" rounded-5 shadow bg-white text-center h-100 d-flex flex-column justify-content-between">

                        {/* image */}
                        <div className="p-2">
                          <img src={product.imgSrc} alt="Card" className="card-img"  style={{maxHeight: "150px",objectFit: "contain"}} />
                        </div>

                        {/* other */}
                        <div className="p-4 pb-3 " >
                          {/* name */}
                          <div >
                            <Link to={`/product-details/${product.id}`} style={{textDecorationLine:'none ',color:'#2a3a49  '}}><h5 style={{maxHeight: "100px",overflow:"hidden",textOverflow:"ellipsis"}}>{product.name}</h5></Link>
                          </div>
                          
                          {/* stars&rating&views */}
                          <div className="rating-box d-flex flex-column">
							              <div className="rating-box__items">
							              	<span className="rating-stars text-warning">
                                {ratingStars(product.stars)}
							              	</span>
                              <span className="ml-1"><b>{product.stars}</b></span>
							              </div>
							              <a  className="text-muted">({product.ratings} ratings & {product.Reviews} Reviews)</a>
							            </div>
                       
                          {/* price */}
                          <p className="text-muted">price: {product.price} $</p>
                          {/* add tocart */}
                          <hr/>
                          {
                            user.name==""?
                            <div  onClick={warningMessage}>
                              
                                <span className="btn btn-secondary py-1 px-2">
                                Add to cart 
                                <i className="fa-solid fa-cart-plus ms-2 " ></i>
                                </span>
                              
                            </div>
                            :
                            <div  onClick={()=>{handleChangeInCart(product)}}>
                              
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
                      </div>
                   </div>
                  )
                })
              }
              
  
             </div>
            </div>
	        </section>

          {/* modal message when anonymous user click on add on cart */}
          <button ref={warning} type="button" className="btn btn-danger fs-6 d-none" data-bs-toggle="modal" data-bs-target="#Modal" > </button>         
          <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
             <div className="modal-dialog">
               <div className="modal-content">
                 <div className="modal-body">
                   <h1 className="modal-title fs-5 ms-5 text-secondary " id="ModalLabel">you need to login first !</h1>
                 </div>
  
               </div>
             </div>
          </div>  

         
        </>
        
        
    );
}
export default Store;



function genericFiltration(allProducts,productPrice,productCategory,productName,productNameInput){
  const filteration=allProducts.filter((product)=> {

   let price=parseInt(product.price)
   let minPrice=parseInt(productPrice.min)
   let maxPrice=parseInt(productPrice.max)



   let priceCond=(price>=minPrice && price<=maxPrice)||(isNaN(maxPrice)&&price>=minPrice)||(isNaN(minPrice)&&price<=maxPrice)
   let nameCond=product.name.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
   let categCond=product.category==productCategory

   let productPriceCond=productPrice.min!==''||productPrice.max!==''?'domy':''


   if(productNameInput!==''&& productPriceCond!==''&&productCategory!=='Choose...'){
      if(nameCond&&priceCond&&categCond)
      return true
   }else if(productNameInput==''&& productPriceCond!==''&&productCategory!=='Choose...'){
    if(priceCond&&categCond)
    return true
   }else if(productNameInput!==''&& productPriceCond==''&&productCategory!=='Choose...'){
    if(nameCond&&categCond)
    return true
   }else if(productNameInput!==''&& productPriceCond!==''&&productCategory=='Choose...'){
     if(nameCond&&priceCond)
     return true
   }else if(productNameInput!==''&& productPriceCond==''&&productCategory=='Choose...'){
    if(nameCond)
    return true
   }else if(productNameInput==''&&productPriceCond!==''&&productCategory=='Choose...'){
    if(priceCond)
    return true
   }else if(productNameInput==''&&productPriceCond==''&&productCategory!=='Choose...'){
    if(categCond)
    return true
  }

 
})

  return filteration
}


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