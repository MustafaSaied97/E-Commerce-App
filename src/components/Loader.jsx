import React from "react";

const Loader = () =>(
    <div  className=" d-flex justify-content-center align-items-center" style={{paddingTop: "100px"}} >
        <div className=" spinner-border text-secondary" role="status" >
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
   
);

export default Loader;
