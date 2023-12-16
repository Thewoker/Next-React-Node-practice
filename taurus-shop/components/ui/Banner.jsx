"use client"
import React from 'react'
import Link from "next/link"

export default function Banner() {
  return (
    <div className="py-1">
      <Link href="/" className="">
        <img src="/images/cybermonday-banner.jpg" alt="" className='flex w-screen h-[60vh]' />
      </Link>
    </div>
  )
}
