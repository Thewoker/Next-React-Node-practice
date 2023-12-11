import { React } from "react";
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { AiFillTwitterCircle } from "react-icons/ai"
import { Link } from "@nextui-org/react";
import Register from "@/components/register-or-login/Register"
import Login from "@/components/register-or-login/Login"


export default function page() {
  //Styles
  const inputStyles = {
    display: 'block',
    padding: '2px',
    border: '1px solid',
    margin: '2px'
  }
  const iconContainerStyles = {
    display: 'flex',
    justifyContent: 'center'
  }
  const containerStyles = {
    display: "block",
    position: 'absolute;', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
  };


  return (
    <div  >
      <div className="gap-5" style={containerStyles}>
        <Register />
        <Login />
      </div>
      {/* <div className="gap-5" style={iconContainerStyles}>
        <div><Link href="/"><FcGoogle className="text-4xl" /></Link></div>
        <div><Link href="/"><FaFacebook className="text-4xl" /></Link></div>
        <div><Link href="/"><AiFillTwitterCircle className="text-4xl" /></Link></div>
      </div> */}
    </div>
  );


}
