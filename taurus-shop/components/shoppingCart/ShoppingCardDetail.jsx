import React from "react";
import { Input } from "@nextui-org/react";

export default function ShoppingCardDetail() {
  return (
    <div className="card-detail">
      <form action="">
        <Input
          key="name"
          type="text"
          label="Name"
          labelPlacement="name"
          description="EJ: Joe Doe"
        />
        <Input
          key="dni"
          type="text"
          label="DNI"
          labelPlacement="DNI"
          description="EJ: 00000000 without '.'"
        />
        <Input
          key="card-number"
          type="text"
          label="Card number"
          labelPlacement="Card number"
          description="Visa, Mastercard, American Express, etc"
        />
        <Input
          key="date-card"
          type="text"
          label="expire card date"
          labelPlacement="Card date"
          description="EJ: 05/28"
        />

      </form>
    </div>
  );
}
