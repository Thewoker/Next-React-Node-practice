"use client";
import { React, useState } from "react";

import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"
import { Link } from "@nextui-org/react";
import Boton from '@/components/ui/Boton';



export default function page() {
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

  //Styles
  const inputStyles = {
    display: 'block',
    padding: '2px',
    border: '1px solid',
    margin: '2px'
  }
  const iconContainerStyles = {
    display: 'flex',
    justifyContent: 'center'
  }
  const containerStyles = {
    display: "block",
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
  };


  return (
    <div className="" style={containerStyles}>
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
          <Boton type="submit" className="m-1" key="ingresar" onSubmit={values.action = "ingresar"}>Ingresar</Boton>
          <Boton type="submit" className="m-1" key="registrar" onSubmit={values.action = "registrarse"}>Registrarse</Boton>
        </form>
      </div>
      <div className="gap-5" style={iconContainerStyles}>
          <div><Link href="/"><FcGoogle className="text-4xl" /></Link></div>
          <div><Link href="/"><FaFacebook className="text-4xl" /></Link></div>
          <div><Link href="/"><AiFillTwitterCircle className="text-4xl" /></Link></div>
        </div>
    </div>
  );


}
