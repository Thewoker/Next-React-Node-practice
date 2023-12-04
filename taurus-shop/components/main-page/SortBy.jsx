"use client";
import { React, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function SortBy() {
  const [selection, setSelection] = useState("Default");
  const handleSelection = (key) => setSelection(key);
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">Sort By</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="Default"
            onClick={() => handleSelection("Default")}
          >
            Default
          </DropdownItem>
          <DropdownItem key="Lower" onClick={() => handleSelection("Lower")}>
            Lower
          </DropdownItem>
          <DropdownItem key="Upper" onClick={() => handleSelection("Upper")}>
            Upper
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="px-4 inline">{selection}</div>
    </>
  );
}
