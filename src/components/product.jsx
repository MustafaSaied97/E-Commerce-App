// -------------react libraries-------------------------------------------------------------------------------------------------
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./context/AppWithProvider";
import axios from 'axios'
import Tippy from '@tippyjs/react';

export default function Product(props) {
  const { serverApi,user,setUser } = useContext(DataContext);

  const { product } = props;

  //detrmine color of count number if 0 --> yellow other ---> blue
  const getclasses = () => {
    let classes;
    return (classes =
      product.count === 0
        ? "badge bg-warning m-2 p-1 fs-6"
        : "badge bg-primary m-2 p-1 fs-6");
  };

  async function handleIncrement(product) {
    let UseBeforeEdit={...user}

    //clone
    let userProducts = [...user.products];
    
    //deep clone
    let index = userProducts.indexOf(product);

    //edit
    userProducts[index].count++;
    //edit and update -with setUser
     //changes in user products by add all products that have incart equal true
     //i am using optimistic update to make the app faster
    //1-update UI
    localStorage.setItem('user',JSON.stringify({...user,products:userProducts}))
    setUser({...user,products:userProducts})
    try{
    await axios.put(`${serverApi}/users/${user.id}`,{...user,products:userProducts})
    }catch{
      //3-protectin if serevr faild update ui with old data 
      localStorage.setItem('user',JSON.stringify({...UseBeforeEdit}))
      setUser({...UseBeforeEdit})
    }
   
  }
  async function handleDecrement(product) {

    let UseBeforeEdit={...user}

    //clone
    
    let userProducts = [...user.products];

    //deep clone
    let index = userProducts.indexOf(product);

    //edit
    if(userProducts[index].count==1){return;}
    userProducts[index].count--;
    //edit and update -with setUser
    //changes in user products by add all products that have incart equal true
    //i am using optimistic update to make the app faster
      //1-update UI
      localStorage.setItem('user',JSON.stringify({...user,products:userProducts}))
      setUser({...user,products:userProducts})
      try{
        //2-then update server
        await axios.put(`${serverApi}/users/${user.id}`,{...user,products:userProducts})
      }catch{
       //3-protectin if serevr faild update ui with old data 
       localStorage.setItem('user',JSON.stringify({...UseBeforeEdit}))
       setUser({...UseBeforeEdit})
      }
    
  }


/// delete what is added in products of user
  async function handleChangeInCart(product){
    let UseBeforeEdit={...user}

    //changes in all products
    //clone
    let userProducts = [...user.products];
  

    //deep clone
    let index =userProducts.indexOf(product);

    //edit
    userProducts.splice(index,1)


    //changes in user products by add all products that have incart equal true
    //i am using optimistic update to make the app faster
    //1-update UI
    localStorage.setItem('user',JSON.stringify({...user,products:userProducts}))
    setUser({...user,products:userProducts})
    try{
      //2-then update server
      await axios.put(`${serverApi}/users/${user.id}`,{...user,products:userProducts})

    }catch{
      //3-protectin if serevr faild update ui with old data 
      localStorage.setItem('user',JSON.stringify({...UseBeforeEdit}))
      setUser({...UseBeforeEdit})
    }


  }



  

  return (
    <div className={product.messageFromAdmin==''?"row":"row opacity-50"}>
      <div className="col-lg-7 col-md-7 col-sm-12 mb-4 " key={product.id}>
        <div className=" d-flex rounded-5 shadow bg-white text-center h-100 justify-content-around align-items-center">
          <div className="rounded-5">
            <img
              className="rounded-5 ms-2"
              src={product.imgSrc}
              alt="Card"
              style={{ width: "150px", objectFit: "cover" }}
            />
          </div>

          <div className="p-4"  style={{ width: "75%", objectFit: "cover" }}>
                <h5>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-secondary mt-1 p-1"
                  >
                    <span>{product.name}</span>
                  </Link>
                </h5>
                <div className="rating-box d-flex flex-column">
							      <div className="rating-box__items">
							      	<span className="rating-stars text-warning">
                        {ratingStars(product.stars)}
							      	</span>
                      <span className="ml-1"><b>{product.stars}</b></span>
							      </div>
							      <a href="#!" className="text-muted">({product.ratings} ratings & {product.Reviews} Reviews)</a>
							    </div>
                          
                <p className="text-muted">price: {product.price} $</p>
                <hr />
                <div className="d-flex  justify-content-around align-items-center ">
                  
                    <div className=" bg-light rounded-2 ">
                      {product.messageFromAdmin==''?<>
                      
                        <button
                          onClick={() => handleDecrement(product)}
                          className=" input-group-prepend btn btn-outline-secondary minus-btn"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className={getclasses()}>{product.count}</span>
         
                        <button
                          onClick={() => handleIncrement(product)}
                          className="input-group-prepend btn btn-outline-secondary minus-btn  "
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </>
                           
                      :
                      <button className="btn btn-warning" >Sold Out<i className="fa-solid fa-store-slash"></i></button>

                      }
                    
           
                  </div>



                  <span onClick={() => handleChangeInCart(product)} className="btn btn-danger p-0 m-1">
                    <i
                      className="fas fa-trash m-2  m-0"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
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



