import React, { useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";



const Header=()=>{

    const user=useSelector(state=>state?.user?.user) //This retrieves the current user's data (state.user.user) from the Redux store.
    const dispatch=useDispatch()  //This provides the dispatch function, which is used to send an action to the Redux store.
    const [menuDisplay,setMenuDisplay]=useState(false)


    



    const handleLogout=async()=>{
        const fetchData=await fetch(summaryApi.logout_user.url,{
            method:summaryApi.logout_user.method,
            credentials:"include",
        })

        const data=await fetchData.json()

        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }

        if(data.error){
            toast.error(data.message)
        }
    }
    



    return(
                      //HEADER SECTION
        <header className="h-16 shadow-md bg-white">
            <div className="h-full mx-4 flex items-center px-4 justify-between">
                <div className="">
                    
                    <Link to={"/"} >
                        <Logo/>
                    </Link>
                    
                </div>

                 {/* SEARCH BOX */}

                <div className="flex items-center justify-between max-w-sm w-full border rounded-full pl-2 focus-within:shadow">
                    <input type="text" placeholder="search here..." className="w-full outline-none"/>
                    <div className="text-lg min-w-[40px] h-6 bg-yellow-400 flex items-center justify-center rounded-r-full text-white">
                    <GrSearch/>
                    </div>
                </div>

                {/* USER LOGO */}

                <div className="flex items-center gap-7">
                
                <div className="relative flex justify-center">
                <div className="text-2xl cursor-pointer relative flex justify center" onClick={()=>setMenuDisplay(a=>!a)}>
                        {
                            user?.profilePic ?(
                                <img src={user?.profilePic} className="w-10 h-10 rounded-full " alt={user?.name}/>
                            ):(
                                <FaRegUserCircle />
                            )

                        }
                    </div>
                    {
                        menuDisplay && (
                            <div className="absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded ">
                        <nav>
                            <Link to={"admin-panel"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2" onClick={()=>setMenuDisplay(a=>!a)}>Admin Panel</Link>
                        </nav>
                    </div>
                        )
                    }
                    
                </div>
                

                    {/* SHOPPING CART */}

                    <div className="text-2xl relative">
                        <span><FaShoppingCart/></span>
                        <div className="text-sm bg-red-600 text-white h-5 w-3 p-2 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                            0
                        </div>
                    </div>

                    {/* LOGIN & LOGOUT*/}

                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className="px-2 py-1 bg-red-600 rounded-full text-white hover:bg-red-700">Logout</button>
                            ):(
                                <Link to={"/login"} className="px-2 py-1 bg-red-600 rounded-full text-white hover:bg-red-700">Login</Link>
                            )
                        }
                        
                    </div>
                    
                </div>

            </div>
        </header>
    )
}

export default Header;