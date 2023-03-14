import React from 'react';
import {useParams, useNavigate } from 'react-router-dom';



export default function ProductDetails() {
    let user= JSON.parse(localStorage.getItem('user'))
    let {id}=useParams()
    let product=user.products.filter((product)=>id==product.id)[0]

    let navigate= useNavigate()
    function handleSave(){
        //Banckend==>save
        //then go back to cart
        return navigate('/cart',{replace:true})
    }

    return (
        <React.Fragment>
            <span>id ={product.id} ,</span>
            <span>name ={product.name} ,</span>
            <span>count ={product.count}</span>  
            <button className='btn btn-outline-success p-1 mt-3 d-block' onClick={handleSave} >save</button>  
        </React.Fragment>
    )
}


  
  
  