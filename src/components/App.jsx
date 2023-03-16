// -------------react libraries----------------------------------------------------------------------------------------------
import React from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
//------------------components----------------------------------------------------------------------------------------------------------
import  NavBar from './navbar'
import NotFound from './notFound';
import Store from './store';
import ProductDetails from './ProductDetails';

import  ShoppingCart from './shopping-cart-components/shoppingCart'
import  UserProductDetails from './shopping-cart-components/userProductDetails'

import Form from './form-components/form';

import Setting from './admin-components/setting';
import ProductForm from './admin-components/productFrom';

function App () {


    return (
      <React.Fragment>

        <NavBar/>

        <main className="container">
        <Routes>
          <Route path='/form' element={<Form/>}/>

          <Route  path='/'  element={<Store />} />
          <Route  path='/product-details/:id?'  element={<ProductDetails/>} />


          <Route  path='/setting'  element={<Setting /> } />
          <Route  path='/productform/:id'  element={<ProductForm />}/>

          <Route  path='/cart'  element={<ShoppingCart />}/>
          <Route  path='/product/:id'  element={<UserProductDetails/>} />
          
          {/* for wrong URL  */}
          
          <Route  path='/notfound'  element={<NotFound/>} />
          <Route  path='*'  element={<Navigate to="/notfound" replace/>} />
          <Route  path='E-Commerce-App'  element={<Navigate to="/" replace/>} />
         

        </Routes>
        </main>
     
      </React.Fragment>
    );
  }

export default App;
