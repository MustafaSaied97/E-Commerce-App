// -------------react libraries----------------------------------------------------------------------------------------------
import React,{useContext} from 'react';
//------------------components----------------------------------------------------------------------------------------------------------
import Product from './product';
import { DataContext } from './context/AppWithProvider';


function ShoppingCart (){
  const {user,setUser}=useContext(DataContext)
  
  // const {products}=props
  const productsInCart=user.products

  let totalPrice=0;
  productsInCart.forEach(product => {
    if(product.messageFromAdmin==''){
      totalPrice+=totalPrice+(product.price*product.count)
    }
  });


  // function handleReset(){
  //   //clone
  //   let products=[...user.products]
  //   //edit
  //     products= products.map((product)=> {product.count=0;return product })
  //   //update -with setState
  //   setUser({products: products}) //or this.setState({products})
  // }


  return ( 
    
    <React.Fragment>

      <span className="badge bg-warning p-1 mt-2  text-dark">
        <span style={{fontSize:"1.1rem"}}>total price: </span>
        <span style={{fontSize:"1.5rem"}}>{totalPrice} <i className="fa-solid fa-dollar-sign"></i></span> 
      </span>
      <section className="main-content" style={{paddingTop: "50px",paddingBottom: "100px"}} >
		    <div className="container">
          {
            productsInCart.map((product,index)=>{
              return(
                <Product 
                  key={index} 
                  product={product} 
                >
                  {product.id}  
                </Product>
              ) 
            })
          }
        </div>
	    </section>
    </React.Fragment>              
  );

}
export default ShoppingCart;










