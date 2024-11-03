import React from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const AdminPanel=()=>{
    const user=useSelector(state=>state?.user?.user)
    return(
        <div className="min-h-[85vh] md:flex hidden">
            <aside className="bg-white min-h-full w-full max-w-80">
                <div className="h-32 flex justify-center items-center flex-col">
                    <div className="text-6xl cursor-pointer relative flex justify-center">
                        {
                            user?.profilePic ?(
                                <img src={user?.profilePic} className="w-20 h-20 rounded-full " alt={user?.name}/>
                            ):(
                                <FaRegUserCircle />
                            )

                        }
                    </div>
                    <p className="text-lg font-semibold">{user?.name}</p>
                    <p className="text-sm">{user?.role}</p>
                </div>


                {/* navigation */}
                <div>
                    <nav className="grid p-4" >
                        <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">All Users</Link>
                        <Link to={"all-products"} className="px-2 py-1  hover:bg-slate-100">All Products</Link>
                    </nav>
                </div>
                
            </aside>
            <main className="w-full h-full p-2">
                <Outlet/>
             </main>
        </div>
    )
}

export default AdminPanel;