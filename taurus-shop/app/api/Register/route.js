import { NextResponse } from "next/server"
import { createUser, signIn } from "@/firebase/config"




export const GET = async () => {
    return NextResponse.json("Hola mundo")
}

export const POST = async (request) => {
    const data = await request.json()
    
    // crear registro, modificar algo, BD, etc.
    console.log(data.action)
    if (data.action === "registrarse") {
        createUser(data.email, data.password)
    } else if (data.action === "ingresar") {
        signIn(data.email, data.password)
        console.log("Ingresando...");
    }

    return NextResponse.json("OK")
}

