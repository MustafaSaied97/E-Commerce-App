import React ,{useState,useEffect,useContext}from "react";
import App from '../App';
import axios from "axios"


export const DataContext=React.createContext({
  "serverApi":`https://e-commerce-server-sd3m.onrender.com`,
  "cloudApi":`https://api.cloudinary.com/v1_1/dqvmb3dkf/image/upload`
})

export function AppWithProvider() {
  const {serverApi,cloudApi}=useContext(DataContext)
    const [state,setState]=useState({products:[]} )
    const [user,setUser]=useState({name:'anonymous',email:'',password:'',products:[],id:''})
    const [control,setControl]=useState('user')


    useEffect(() => {
      

        async function fetchData() {

          try{

            const productsData= await axios.get(`${serverApi}/products`)
            setState({products:productsData.data})

            //get user id from local sotrage that i have sotred in it after login then call server to get user data
            
            if(localStorage.length!==0&&localStorage.getItem('user')!==null){
              let userInLocalStorage=JSON.parse(localStorage.getItem('user'))
              setUser(userInLocalStorage)
          
            }else{
              //reset local storage with default user 
              localStorage.setItem("user",JSON.stringify(user))

            }

          }catch(e){
            console.log("cant fetch data ",e)
            alert("cant fetch data\n"+e)
          }
         
        }
        fetchData()
        
      
      
      },[]); 


 
    return (
        <DataContext.Provider value={{serverApi,cloudApi,state,setState,user,setUser,control,setControl}}>
            <App/>
        </DataContext.Provider>
      );
}
 