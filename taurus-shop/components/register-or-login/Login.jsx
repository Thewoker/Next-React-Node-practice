"use client"
import { React, useState } from 'react'
import Boton from '@/components/ui/Boton';

const inputStyles = {
    display: 'block',
    padding: '2px',
    border: '1px solid',
    margin: '2px'
}

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        action: ''
    })
    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:3000/api/Register", {
            method: 'POST',
            body: JSON.stringify(values)
        }).then(r => r.json())

        console.log(response)
    }

    return (
        <div className="flex justify-center align-middle">
            <form onSubmit={handleSubmit}>
                Email
                <input
                    type="email"
                    value={values.email}
                    placeholder="Tu email"
                    name="email"
                    className="p-2 border mx-2"
                    style={inputStyles}
                    onChange={handleInputChange}
                />
                Password
                <input
                    type="password"
                    value={values.password}
                    placeholder="Tu Contraseña"
                    name="password"
                    className="p-2 border mx-2"
                    style={inputStyles}
                    onChange={handleInputChange}
                />
                <Boton onClick={values.action = "ingresar"} type="submit" className="m-1" key="ingresar" >Ingresar</Boton>
            </form>
        </div>
    )
}

export default Login