import { React } from "react";
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"
import { Link } from "@nextui-org/react";
import Register from "@/components/register-or-login/Register"



export default function page() {

  return (
    <div  >
      <div className="" >
        <Register />

      </div>
      {/* <div className="gap-5" style={iconContainerStyles}>
        <div><Link href="/"><FcGoogle className="text-4xl" /></Link></div>
        <div><Link href="/"><FaFacebook className="text-4xl" /></Link></div>
        <div><Link href="/"><AiFillTwitterCircle className="text-4xl" /></Link></div>
      </div> */}
    </div>
  );


}
