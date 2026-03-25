import { useState } from 'react'
import { useAuth } from '../../context/AuthContext';

export default function RegisterComponent () {
    
    const { register } = useAuth;

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
        <form onSubmit={handleSumit}>
            <h3>Create an account</h3>
            <label>Username</label>
            <input value={formData.email} onChange={handleChange} placeholder="Enter your username" type="text"/>
            <label>Password</label>
            <input value={formData.password} onChange={handleChange} placeholder="Enter your password" type="password"/>
            <label>Email</label>
            <input value={formData.password} onChange={handleChange} placeholder="Enter your email" type="text"/>

            <button>Submit</button>
        </form>
  )
}
