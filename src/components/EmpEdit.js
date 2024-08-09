import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EmpEdit = () => {
    const [id,idChange]=useState("")
    const [name,nameChange]=useState("")
    const [email,emailChange]=useState("")
    const [phone,phoneChange]=useState("")
    const [active,activeChange]=useState(true)
    const [validation,setValidation]=useState(false)

    const navigate=useNavigate()

const handleSubmit =(e) =>{
    e.preventDefault()
    const emData={id,name,email,phone,active}
   
    fetch("http://localhost:8000/emploee/"+empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(emData)
    }).then((res)=>{
        alert('saved Successfully')
        navigate('/')
    }).catch((err)=>{
        console.log(err.message)
    })
   
}
    const {empid} = useParams()
    // const [emData,setEmData]=useState({})
    // console.log(emData,'emdata')

    useEffect(()=>{
        fetch('http://localhost:8000/emploee/'+empid).then((res)=>
        {
            return res.json()
        }
    )
    .then((res)=>{
        console.log('resp-----------' ,res)
        idChange(res.id)
        nameChange(res.name)
        emailChange(res.email)
        phoneChange(res.phone)
        activeChange(res.active)
    }).catch((err)=>{
        console.log(err,'this is the error')
    })
    },[])
    return (
        <div className=''>
        <div className="offset-lg-3 col-lg-6 ">
            <form className="container" onSubmit={handleSubmit}>
                <div className="card" style={{"textAlign":"left"}}>
                    <div className="card-title">
                        <h2>Employee Edit</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label htmlFor="" >ID</label>
                                    <input value={id} disabled="disabled" type="text" className='form-control' name="" id="" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label htmlFor="">Name</label>
                                    <input required value={name} onMouseDown={e=>setValidation(true)} onChange={e=>nameChange(e.target.value)} type="text" className='form-control' name="" id="" />
                                    {name.length ==0 && validation && <span className='text-danger'>Enter your name</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label htmlFor="">Email</label>
                                    <input value={email} onChange={e=>emailChange(e.target.value)}  type="email" className='form-control' name="" id="" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label htmlFor="">Phone</label>
                                    <input value={phone} onChange={e=>phoneChange(e.target.value)}  type="number" className='form-control' name="" id="" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-check">
                                    <input checked={active} onChange={e=>activeChange(e.target.checked)}  type="checkbox" className='form-check-input' name="" id="" />
                                    <label htmlFor="" className='form-check-label'>is active</label>

                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                  <button className='btn btn-success'> save new</button>
                                  <Link to="/" className='btn btn-danger ms-2'>back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
    );
};

export default EmpEdit;