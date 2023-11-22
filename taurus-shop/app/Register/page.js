"use client";
import { React, useState } from "react";
import { Input } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"
import {Button} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { EyeFilledIcon } from "./../../public/images/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "./../../public/images/EyeSlashFilledIcon.jsx";


export default function page() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card className="max-w-[800px] w-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col w-full">
            <p className="text-md">Register</p>
            <Divider />
            <form className="grid grid-rows-1 w-full p-4">
              <Input
                type="email"
                variant="bordered"
                label="Email"
                placeholder="Enter your email"
                className="w-full py-2"
              />
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full py-2"
              />
              <Button color="primary" variant="ghost">
                Log-in
              </Button>
            </form>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
        <div className="flex flex-col w-full">
            <p className="text-md">Login</p>
            <Divider />
            <form className="grid grid-rows-1 w-full p-4">
            <Input
                variant="bordered"
                label="Full-Name"
                placeholder="Enter your full-name"
                className="w-full py-2"
            />
            <Input
                variant="bordered"
                label="Address"
                placeholder="Enter your Address"
                className="w-full py-2"
            />
              <div nameClass="grid grid-cols-2">
              <Input
                type="email"
                variant="bordered"
                label="Email"
                placeholder="Enter your email"
                className="col-span-1 py-2"
              />
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="col-span-1 py-2"
              />
              </div>
              <Button color="primary" variant="ghost">
                Register
              </Button>
            </form>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
            <div className="flex justify-center w-full gap-x-4">
                <div><Link href="/"><FcGoogle className="text-4xl"/></Link></div>
                <div><Link href="/"><FaFacebook className="text-4xl"/></Link></div>
                <div><Link href="/"><AiFillTwitterCircle className="text-4xl"/></Link></div>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
