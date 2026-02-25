import { useState, useContext } from "react"
import { useAuth } from "../context/AuthContext.jsx";

import AuthContext from "../context/AuthContext.jsx";


export default function Login ({ }) {
    
    const authCtx = useContext(AuthContext);

    const [ formData, setFormData ] = useState({});
    const [ errors, setErrors ] = useState({});
    const [ loading, setLoading ] = useState();

    function handleChange(e) {
        
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSumit(e) {
        e.preventDefault();

        try {

        } catch (error) {
            setErrors({message: error.message})
        }
    }
    
    return (
        <>
        <form>
            <label>Email</label>
            <input value={formData.email} onChange={handleChange} placeholder="Enter your email" type="text"/>
            <label>Password</label>
            <input value={formData.password} onChange={handleChange} placeholder="Enter your password" type="password"/>

            <button>Submit</button>
        </form>
            
        </>
    )
}