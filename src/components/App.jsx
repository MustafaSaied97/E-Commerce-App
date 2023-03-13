// -------------react libraries----------------------------------------------------------------------------------------------
import React ,{useState, useEffect ,useContext}from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
//------------------components----------------------------------------------------------------------------------------------------------
import {DataContext} from "./context/AppWithProvider"



import  ShoppingCart from './shoppingCart'
import  ProductDetails from './productDetails'
import  NavBar from './navbar'

import NotFound from './notFound';
import Store from './store';
import Form from './form';
import Setting from './setting';
import ProductForm from './productFrom';

function App () {
  // const [state,setState]=useState({products:[]} )
  const {state,setState}=useContext(DataContext)

  function handleChangeInCart(product){
    //clone
    let products=[...state.products]
    //deep clone
    let index=products.indexOf(product)
    //edit
    products[index].inCart=!products[index].inCart

    //update -with setState
    setState({products: products}) //or  setState({products})
  }

  

  
    return (
      <React.Fragment>

        <NavBar
          products={ state.products}
        />

        <main className="container">
        <Routes>
          <Route path='/form' element={<Form/>}/>

          <Route  path='/store/:who?'  element={<Store />} />


          <Route  path='/setting'  element={<Setting /> } />
          <Route  path='/productform/:id'  element={<ProductForm />}/>

          <Route  path='/cart'  element={<ShoppingCart />}/>
          <Route  path='/product/:id'  element={<ProductDetails/>} />
          
          {/* for wrong URL  */}
          
          <Route  path='/notfound'  element={<NotFound/>} />
          <Route  path='*'  element={<Navigate to="/notfound" replace/>} />
          <Route  path='/'  element={<Navigate to="/store" replace/>} />
         

        </Routes>
        </main>
     
      </React.Fragment>
    );
  }

export default App;
