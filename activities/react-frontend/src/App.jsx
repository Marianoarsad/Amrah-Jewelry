import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

// COMPONENTS
import Login from './pages/Login.jsx';
import Inventory from './pages/Inventory.jsx';
import Landing from './pages/Landing.jsx';

// CONTEXT
import { AuthContextProvider } from './context/AuthContext';

function App() {

    const [ formData, setFormData ] = useState();

    async function handleLogin(e) {
        
        console.log(e.target)

        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {  
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

    }

    return (
        <BrowserRouter >
            <AuthContextProvider>
                    <Routes>
                        <Route path='/' element={<Landing/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/inventory" element={<Inventory/>}/>
                    </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App
