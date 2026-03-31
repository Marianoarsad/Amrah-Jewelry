import { useState, useContext } from "react"
import { useAuth } from "../context/AuthContext.jsx";

import AuthContext from "../context/AuthContext.jsx";
import LoginComponent from "../components/auth/LoginComponent.jsx";
import RegisterComponent from "../components/auth/RegisterComponent.jsx";

export default function Login ({ }) {
    
    // const authCtx = useContext(AuthContext);

    // const [ formData, setFormData ] = useState({});
    // const [ errors, setErrors ] = useState({});
    // const [ loading, setLoading ] = useState();

    // function handleChange(e) {
        
    //     const { name, value } = e.target;

    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }))
    // }

    // async function handleSumit(e) {
    //     e.preventDefault();

    //     try {

    //     } catch (error) {
    //         setErrors({message: error.message})
    //     }
    // }
    
    return (
        <>
            <LoginComponent />
            <RegisterComponent />
        </>
    )
}