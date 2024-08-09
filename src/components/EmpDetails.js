import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EmpDetails = () => {
    const {empid} = useParams()
    const [emData,setEmData]=useState({})
    console.log(emData,'emdata')

    useEffect(()=>{
        fetch('http://localhost:8000/emploee/'+empid).then((res)=>
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

    return (
        <div>
            {emData && 
                <div>
                          <h3>The employe name is: <b>{emData.name} <span className='text-info'>({emData.id})</span> </b>  </h3>
                          <h3> Contant: {emData.phone}</h3>
                          <h3>Email : {emData.email}</h3>
                          <Link to="/" className='btn btn-danger'>Back</Link>
                </div>
            }
           
        </div>
    );
};

export default EmpDetails;