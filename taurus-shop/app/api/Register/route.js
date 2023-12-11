import { NextResponse } from "next/server"
import { createUser } from "@/firebase/config"




export const GET = async () => {
    return NextResponse.json("Hola mundo")
}

export const POST = async (request) => {
    const data = await request.json()
    
    // crear registro, modificar algo, BD, etc.

    if (data.action === "registrarse") {
        createUser(data.email, data.password)
    } else if (data.action === "ingresar") {
        funcionY()
    }

    return NextResponse.json("OK")
}

