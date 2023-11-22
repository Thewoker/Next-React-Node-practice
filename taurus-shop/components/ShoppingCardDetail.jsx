import React from 'react'
import {Input} from "@nextui-org/react";

export default function ShoppingCardDetail() {
  return (
    <div className='card-detail'>
      <Input
              key='name'
              type="name"
              label="name"
              labelPlacement='name'
              description='outside'
            />
    </div>
  )
}
