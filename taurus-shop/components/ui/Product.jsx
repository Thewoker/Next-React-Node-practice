import Link from 'next/link'
import React from 'react'
// import Image from "next/image";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default function Product() {
  return (
    <Link href="/" className='m-6'>
        <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Camara Cannon Paronamica</p>
        <small className="text-default-500">⭐ 4</small>
        <h4 className="font-bold text-large">200.000$</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/camera-product.jpg"
          width={270}
        />
      </CardBody>
    </Card>
    </Link>
  )
}
