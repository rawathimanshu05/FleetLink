import  { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../Util'

export default function Register() {

    const [Vehicle,setVehicle] = useState({
        name : '',
        capacityKg:'',
        tyres:''
    })

        const navigate = useNavigate()

    const handlechange = (e) =>{
           var name = e.target.name 
           var value = e.target.value 
           setVehicle((prev) =>{
            return{
                ...prev,
                [name] : value 
            }
           })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        // if(!name )
        const {name,capacityKg,tyres} = Vehicle 

        if(!name || !capacityKg || !tyres){
            return handleError("Please fill all the fields")
        }

        try{
            const url = "http://localhost:9000/api/createvehicel";
            const response = await fetch(url,{
                method : "POST",
                headers:{
                    "Content-Type" : "application/json" 
                },
                body : JSON.stringify(Vehicle)
            });

            const result = await response.json()
            const {success,message,error} = result
            if(success){
                handleSuccess(message)
                setTimeout(()=>{
                    navigate('/')
                },1000)
                setVehicle({
                    name:'',
                    capacityKg:'',
                    tyres:''
                })
            } else if(error){
                const details = error?.details[0].message 
                handleError(details)
            } else if (!success){
                handleError(error)
            } else {
                handleError(error)
            }

        } catch(error){
            console.log(error)
            handleError(error)
        }

    }


    return (
        <>
            <div className="register-container">
                <Link to="/SearchBook" className="submit-button-forward" style={{textDecoration:'none',marginTop:'10px'}}>Go to SearchBook </Link>
                <h2 className="register-title">Add Vehicle Page Form</h2>
                <form className="register-form" onSubmit={handlesubmit}>
                    <div className="form-group">
                        <input type="text" id="name" name="name" onChange={handlechange} value={Vehicle.name}  placeholder='Enter name' autoComplete='off' />
                    </div>

                    <div className="form-group">
                        <input type="text" id="capacityKg" name="capacityKg" onChange={handlechange} value={Vehicle.capacityKg}  placeholder='Enter capacityKg' autoComplete='off' />
                    </div>

                    <div className="form-group">
                        <input type="text" id="tyres" name="tyres" onChange={handlechange} value={Vehicle.tyres} placeholder='Enter tyres' autoComplete='off' />
                    </div>

                    <button type='submit' className="submit-button"> Submit </button>
                </form>
            </div>

            <ToastContainer />
        </>

    )
}
