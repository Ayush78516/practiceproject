import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";

const AllUsers=()=>{

    const[allUser,setAllUsers]=useState([])

    const fetchAllUsers=async()=>{
        const fetchData=await fetch(summaryApi.allUser.url,{
            method:summaryApi.allUser.method,
            credentials:"include"
        })


        const dataResponse=await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }   

    useEffect(()=>{
        fetchAllUsers()
    },[])


    return(
        <div>
            <table className="w-full userTable">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUser.map ((el,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{el?.name}</td> 
                                    <td>{el?.email}</td> 
                                    <td>{el?.role}</td> 
                                    <td>{moment(el?.createdAt)}</td> 

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers;