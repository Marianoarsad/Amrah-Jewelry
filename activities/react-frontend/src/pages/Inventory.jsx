import { useEffect, useState } from "react";

import TextArea from "../components/TextArea.jsx";

import { productService } from "../service/inventoryService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Inventory({ }) {
    
    const [ formData, setFormData ] = useState({});
    const [ errors, setErrors ] = useState({});
    const [ loading, setLoading ] = useState();

    const { user } = useAuth();
    const navigate = useNavigate();

    function handleChange (e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSubmit (e) {
        
        e.preventDefault();

        try {
            const response = await productService.create(formData);

            console.log(response);
        } catch (error) {
            setErrors({message: error.message})
        }

    }

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

    }, [])

    return (
        <>
            <h3>Create product</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input value={formData.name} type="text" id="name" placeholder="Enter product name" required/>

                    <label htmlFor="slug">Slug</label>
                    <input value={formData.slug} type="text" id="slug" disabled/>
                </div>
                <TextArea 
                    label={"Description"} 
                    name="description" 
                    onChange={handleChange} 
                    error={errors.description} 
                    rows={10} 
                    cols={50}
                >
                    {formData.description}
                </TextArea>
                <label htmlFor="price">Price</label>
                <input value={formData.price} type="number" id="price" name="price" required/>

                <button>Save product</button>
            </form>
        </>
    )
}