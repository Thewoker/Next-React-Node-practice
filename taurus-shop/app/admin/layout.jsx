'use client'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from "@/contexts/AuthContext"
import { getDocs, collection, query, where } from "firebase/firestore"
import { db } from "@/firebase/config"
import { toast } from "react-toastify";


const AdminLayout = ({ children, login }) => {

    const { user } = useAuthContext()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const fetchAdmins = async () => {
            const adminsQuery = query(collection(db, "admin"), where("uid", "==", user.uid))
            const adminsSnapshot = await getDocs(adminsQuery)
            setIsAdmin(!adminsSnapshot.empty)
            if (!adminsSnapshot.empty) {
                toast.success("¡Bienvenido!")
            } else {
                toast.error("Acceso denegado")
            }
        }

        if (user?.logged) {
            fetchAdmins()
        }
    }, [user])


    return (
        <>
            {user?.logged && isAdmin ? children : login}
        </>
    )
}

export default AdminLayout