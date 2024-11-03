import { useContext, useState } from "react";
import React from "react";
import loginicon from "../assest/signin.gif"
import {FaEye} from "react-icons/fa"
import {FaEyeSlash} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login=()=>{
    const [showPassword,setShowPassword]=useState(true)
    const[data,setData]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate()
    const {fetchUserDetails}=useContext(Context)


    const handleOnChange=(e)=>{
        const{name,value}=e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const dataResponse=await fetch(summaryApi.signIn.url,{
            method:summaryApi.signIn.method,
            credentials:"include",
            headers:{ 
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })

        const dataApi=await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }



    return(
        <section>
            <div className="mx-auto p-4 ">
                <div className="bg-white p-4 max-w-sm mx-auto">
                    <div className="w-20 h-20 mx-auto">
                        <img src={loginicon} alt="login icon"/>
                    </div>


                    <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Email</label>
                            <div className="bg-slate-100 p-2" >
                                <input 
                                type="email" 
                                placeholder="enter email"
                                name="email"
                                value={data.email} 
                                onChange={handleOnChange}
                                className="w-full h-full outline-none bg-transparent"/>
                            </div>
                            
                        </div>


                        <div>
                            <label>Password</label>
                            <div  className="bg-slate-100 p-2 flex">
                                <input 
                                type={showPassword?"text":"password"} 
                                placeholder="enter password" 
                                name="password"
                                value={data.password}
                                onChange={handleOnChange}
                                className="w-full h-full outline-none bg-transparent"/>
                                <div className="cursor-pointer" onClick={()=>
                                    setShowPassword((pre)=>!pre)
                                }>
                                    {
                                        showPassword ? (
                                            <FaEye/>
                                        ):
                                        (
                                            <FaEyeSlash/>
                                        )
                                    }
                                    
                                    
                                </div>
                            </div>
                            <Link to={"/forgot-password"} className="ml-auto hover:underline hover:text-red-600">
                                Forgot password ?
                            </Link>
                            
                        </div>

                        <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 w-full max-w-[150px] rounded-full mt-3 hover:scale-110 transition-all mx-auto block">Login</button>
                    </form>

                    <p className="my-4">Don't have account?<Link to={"/sign-up"} className="hover:underline hover:text-red-600">Sign up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login;