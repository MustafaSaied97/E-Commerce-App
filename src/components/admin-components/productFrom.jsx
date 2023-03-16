// libraries
import React, { useState, useEffect,useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams,useNavigate } from 'react-router-dom';
import axios from "axios";
// components
import { DataContext } from '../context/AppWithProvider';

function ProductForm() {
  const {serverApi,cloudApi,state,setState,user,setUser}=useContext(DataContext)
  const [image,setImage]=useState("")
  const[showLoading,setShowLoading]=useState(false)
  const {register,handleSubmit,watch,setValue,formState: { errors }} = useForm({name: "",price: ""});

  const navigate=useNavigate()
  function backToSetting(){ 
    return navigate('/setting',{replace:true})
  }

  const {id}=useParams()



  useEffect(() => {
    let currentProduct= {...state.products.filter((product)=>product.id==id?product:"") [0]}
    if(id!=="new"){
      setValue('name',currentProduct.name)
      setValue('price',currentProduct.price)
      setValue('category',currentProduct.category)
      setImage(currentProduct.imgSrc)
    } 
  }, [state]); 
  
  async function Add(data){
    //befor changes --->save data first 
    let oldData=[...state.products]

    //changes 
      //clone
      let products=[...state.products]
      //edit
      let newProduct={ 
        name: data.name,
        price: data.price,
        count: 1,
        imgSrc:image,
        inCart:false,

        category:data.category,
        stars:(Math.random()*5).toFixed(1),
        ratings:Math.floor(Math.random()*100),
        Reviews:Math.floor(Math.random()*100),
        messageFromAdmin:''
      }
  
      //update changes in backend server
    try{
      let res=await axios.post(`${serverApi}/products/`,{...newProduct})
      newProduct=res.data // get data after server generate new id to new product
      products.push(newProduct)
      localStorage.setItem("newProduct",JSON.stringify(newProduct))

      //update changes in UI
      setState({products: products}) //or  setState({products})
      
    }catch(e){
      alert(`error message: ${e.message}\ncant add database\nplease try again` )
      setState({products:oldData})
    }finally{
      backToSetting();
    }
  }

  async function Edit(data){    
    //befor changes --->save data first 
    let oldData=[...state.products]

    //changes
      //clone
      let products=[...state.products]
      //edit
      let index;
      products=products.map((product)=>{
        if(product.id==id){
          index=products.indexOf(product)
          product.category=data.category
          product.name=data.name;
          product.price=data.price;
          product.imgSrc=image
          // product.messageFromAdmin=product.messageFromAdmin
          
        } 
        return product;
      })
      //update changes in UI
      setState({products: products}) //or  setState({products})

      //update changes in backend server 
    try{
      await axios.put(`${serverApi}/products/`+id,{...products[index],id:''})

        //handle changes in users products
      const response=await axios.get(`${serverApi}/users`)
      const users=response.data;
      // let serverUserArr=users.filter((serverUser)=>serverUser.products.forEach())
      users.forEach((serverUser)=>{
        serverUser.products.forEach(async(userProduct)=>{
          if(userProduct.id==products[index].id){
            userProduct.category=products[index].category
            userProduct.name=products[index].name
            userProduct.price=products[index].price
            userProduct.imgSrc=products[index].imgSrc
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
          if(userProduct.id==id){
            userProduct.category=data.category
            userProduct.name=data.name;
            userProduct.price=data.price;
            userProduct.imgSrc=image
          } 
          return   userProduct
        })
        localStorage.setItem("user",JSON.stringify(user))
        setUser(user)
      }
   
    }catch{
      alert("cant edit database")
      setState({products: oldData})
    }finally{
      backToSetting();
    }
  }

  const formData=new FormData()
  function handlePreviewFile(e){
    const file =e.target.files[0]
    formData.append("file",file)
    formData.append("upload_preset","p6alrljs")



  }

  async function handleUplodaFile(){

    if(formData.has('file') && formData.get('file')!=='undefined'){

      setShowLoading(true)
      let res =await axios.post(cloudApi,formData)
      const src=res.data.secure_url
      setImage(src)
      setShowLoading(false)
      formData.delete("file")
    }
     
    

  }


  return (
    <>
      <h1 className="mb-3 badge text-bg-light fs-1">{id=="new"?"Add Product":"Edit Product"}</h1>
      <div className="d-flex flex-lg-row-reverse flex-md-row-reverse flex-wrap justify-content-around">


      <div className="col-lg-3 col-md-4 col-sm-6 mb-4 " >

        <div className=" rounded-5 shadow bg-white text-center h-100">

          <div className="  d-flex justify-content-center align-items-center">
            <img src={image} alt="Card" className="card-img"  style={{height: "150px",objectFit: "contain"}} />
          </div>

          <div className="p-4" >

            <h5>{watch('name')}</h5>

            <div className="rating-box d-flex flex-column">
              <div className="rating-box__items">
                <span className="rating-stars text-warning">
                  {ratingStars(0)}
                </span>
                <span className="ml-1"><b>{}</b></span>
              </div>
              <a  className="text-muted">({}ratings &  {}Reviews)</a>
            </div>

            <p className="text-muted">price:{watch('price')}  $</p>
            <hr/>           
            <span className="btn btn-secondary py-1 px-2">
              Add to cart 
              <i className="fa-solid fa-cart-plus ms-2 " ></i>
            </span>

          </div>

        </div>

        </div>

        <form onSubmit={handleSubmit(id=="new"?Add:Edit)}>
          <div className="input-group input-group mt-5 mb-3">
            <label className="input-group-text " htmlFor="inputGroupSelect01">Category</label>
            <select className="form-select" id="inputGroupSelect01"{...register("category", {required: "Category is required!"})}>
              <option defaultValue placeholder="Choose..." ></option>
              {
                [ 'Furniture',
                  'Clothes',
                  'Electronics'
                ]
                .map((Category,index)=> <option  key={index} defaultValue={index+1}  >{Category}</option>)
              }
            </select>
          </div>
          <p className="text-danger fs-8  mb-3">{errors.category?.message}</p>


          <div className="input-group input-group-default ">
            <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" {...register("name", {required: "name is required!"})} />   
          </div>
          <p className="text-danger fs-8  mb-3">{errors.name?.message}</p>

          <div className="input-group input-group-default ">
            <span className="input-group-text" id="inputGroup-sizing-default">Price</span>
            <input type="number" step="any" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" {...register("price", {required: "price is required!"})} />  
          </div>

          <p className="text-danger fs-8  mb-3">{errors.price?.message}</p>

          <div className="input-group mb-3">
            <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={handlePreviewFile} />
            <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={handleUplodaFile}>
                Upload
                {showLoading?<div className="spinner-border spinner-border-sm" role="status"></div>:''}
            </button>
          </div>

          <button type="submit" className="btn btn-primary d-block">
             {id=="new"?"Add":"Edit"}
          </button>
        </form>



      </div>
    </>
  );
}
export default ProductForm;



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