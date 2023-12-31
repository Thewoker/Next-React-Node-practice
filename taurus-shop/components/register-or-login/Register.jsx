"use client"
import { useState } from "react"
import Boton from "../ui/Boton"
import { useAuthContext } from "@/contexts/AuthContext"

const Register = () => {
    const { createUser, loginUser } = useAuthContext()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <div className=" w-screen h-[90vh] inset-0 flex justify-center items-center ">
            <form onSubmit={handleSubmit} className="bg-white py-4 px-6 rounded-xl max-w-md w-full">
                <h2>Login</h2>
                <input
                    type="email"
                    value={values.email}
                    required
                    placeholder="Tu email"
                    className="p-2 rounded w-full border border-blue-100 block my-4"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    value={values.password}
                    required
                    placeholder="Tu password"
                    className="p-2 rounded w-full border border-blue-100 block my-4"
                    name="password"
                    onChange={handleChange}
                />
                <Boton onClick={() => loginUser(values)} className="mr-4">Ingresar</Boton>
                <Boton onClick={() => createUser(values)}>Registrarme</Boton>
            </form>
        </div>
    )
}

export default Register
