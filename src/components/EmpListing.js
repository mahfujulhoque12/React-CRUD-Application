import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EmpListing = () => {
    const [emData,setEmData]=useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        fetch('http://localhost:8000/emploee').then((res)=>
        {
            return res.json()
        }
    )
    .then((resp)=>{
        console.log('resp-----------' ,resp)
        setEmData(resp)
    }).catch((err)=>{
        console.log(err,'this is the error')
    })
    },[])

    const LoadDetails = (id) =>{
        navigate("/employee/details/"+id)
    }
    
    const LoadRemove = (id) =>{
      if(window.confirm('Do you want to remove?')){
        fetch("http://localhost:8000/emploee/"+id,{
            method:"DELETE",
        }).then((res)=>{
            alert('removed Successfully')
            window.location.reload()
        }).catch((err)=>{
            console.log(err.message)
        })
       
      }
    }
    
    const LoadEdit = (id) =>{
        navigate("/employee/edit/"+id)
    }

    return (
        <div className='container'>
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className='float-left'>
                        <Link to="/employee/create" className='btn btn-success mb-3'>Add New (+)</Link>
                    </div>
                    <table className='table table-bordered'>
                    <thead className='bg-dark text-white'>
                    <tr >
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    <tbody>
                        {
                            emData && emData.length >0 ?(
                             emData.map((item)=>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <a href="" onClick={()=>{LoadEdit(item.id)}} className='btn btn-sm btn-success'>Edit</a>
                                        <a href="" onClick={()=>{LoadRemove(item.id)}} className='btn btn-sm btn-danger mx-2'>Remove</a>
                                        <a href="" onClick={()=>{LoadDetails(item.id)}} className='btn btn-sm btn-primary'>Details</a>

                                    </td>
                                    
                                </tr>
                            )
                            ):
                            <tr>
                                <td>No data here</td>
                            </tr>
                          
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmpListing;