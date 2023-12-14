import { NextResponse } from "next/server"
import { createUser, loginUser } from "@/context/AuthCotext"




export const GET = async () => {
    return NextResponse.json("Hola mundo")
}

export const POST = async (request) => {
    const data = await request.json()
    
    // crear registro, modificar algo, BD, etc.
    

    return NextResponse.json("OK")
}

