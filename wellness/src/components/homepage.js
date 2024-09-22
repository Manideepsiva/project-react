import { Link } from "react-router-dom"
import React, { useState } from 'react';


 function Homepage(){
    return(
        <div>
     
        <div>hello there </div>
        <Link to = {"/login"} href = {"/login"}> login </Link>
        <Link to = {"/register"}>register </Link>
        </div>

    )

}

export default Homepage;    