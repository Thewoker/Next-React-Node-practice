"use client"
import React from 'react'
import Link from "next/link"
import Image from "next/image";
import banner from "./../../public/images/cybermonday-banner.jpg"

export default function Banner() {
  return (
    <div className="py-1">
      <Link href="/" className="flex w-screen h-[60vh]">
        <Image
          src={banner}
          className=""
          
        />
      </Link>
    </div>
  )
}
