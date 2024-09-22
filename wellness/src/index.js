import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,redirect,RouterProvider,useNavigate,Navigate} from 'react-router-dom';
import Hoempage from './components/homepage';
import Auth from './components/authpage';
import Login from './components/login';
import Register from './components/register';
import Showerror from './components/showerror';
import Clientdashboard from './components/client-dashboard';
import clientstyle from './assets/css/style.module.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store,{persistor} from "./store"
import Clientshowrates from './components/client-showrates';
import Appointmentclient from './components/Appointment-client';



const logout = ()=>{
  localStorage.removeItem('token');
  return redirect("/login");

}
const checkauth = async ()=>{
  const token = window.localStorage.getItem('token');
  console.log(token);
  if(!token) {return redirect('/login');
    console.log("hello mama !token");
  }
  const response = await fetch('http://localhost:3001/api/verify-token',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 403) {
    console.log("hello mama !token 2");
    
    return { isAuthenticated: false, message: 'Forbidden: Access denied' };
  }

  if (!response.ok) {
    console.log("hello mama !token 3");
    return { isAuthenticated: false, message: 'something went wrong' };
  }
  console.log("hello mama !token 4")
  return {isAuthenticated : true};

  }


const router = createBrowserRouter([{
  path:"/",
  loader:async ()=>
    {const {isAuthenticated} = await checkauth();
      if(isAuthenticated) return redirect("/authpage"); 
      return null
    },
  element:<Hoempage/>,
 
  
},

{  path:'/register',
   element:<Register />,
   loader:async ()=>
    {const {isAuthenticated} = await checkauth();
      if(isAuthenticated) return redirect("/authpage"); 
      return null
    },
   action:async ({request})=>{

    const formdata = await request.formData();
    const usermail = formdata.get("loginId");
    const password = formdata.get("password");
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      body: JSON.stringify({ usermail, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok){
      return redirect('/login')
    }else{
      console.log("helo there");
      return redirect('/register?message=User%20already%20exists');
    }


   }

},
{
path :'/login',
element:<Login  />,
loader:async ()=>
{const {isAuthenticated} = await checkauth();
  if(isAuthenticated) return redirect("/authpage"); 
  return null
},
action : async({request})=>{
  const formdata = await request.formData();
  const usermail = formdata.get('loginId');
  const password = formdata.get('password');
  const response = await fetch("http://localhost:3001/api/login",{
    method:'POST',
    body:JSON.stringify({usermail,password}),
    headers:{'Content-Type':'application/json'},

  });
  if(response.ok){
    const data = await response.json();
     window.localStorage.setItem('token',data.token);
     return redirect('/authpage');

  }
  return redirect('/login?message=invalid%20credentials');
  

}
},{
  path :'/authpage',
  element:<Clientdashboard/>,
  loader:async ()=>{
    const {isAuthenticated } = await checkauth();
    if(!isAuthenticated) return  redirect("/");
    const token = window.localStorage.getItem('token');
    console.log(token);
    return "hello";
    

  },
  children:[
    {}
  ]
},
{
  path:'/logout',
  loader :async()=>{
    logout();
    return redirect('/');
  }
},{

  path :'/authpage/showrates',
  element:<Clientshowrates/>
},

{
  path : '/authpage/showrates/book',
  element:<Appointmentclient/>
}

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>  
    <PersistGate loading={null} persistor={persistor}>
  <RouterProvider router={router} />
  </PersistGate>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
