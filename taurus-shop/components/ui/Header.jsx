"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GiBullHorns } from "react-icons/gi";
import { HiOutlineUserCircle, HiOutlineShoppingCart, HiOutlineHeart, HiLogout,} from 'react-icons/hi'
import { auth } from "@/firebase/config";
import { useAuthContext } from "@/contexts/AuthContext"


const Header = () => {
  const [isLogoutIconVisible, setLogoutIconVisible] = useState(true);
  const [isRegisterIconVisible, setRegisterIconVisible] = useState(false);
  const user = auth.currentUser;
  const { logout, getCart } = useAuthContext()

  auth.onAuthStateChanged(async user => {
    if (user) {
      setRegisterIconVisible(false);
      setLogoutIconVisible(true);
    }else {
      setRegisterIconVisible(true);
      setLogoutIconVisible(false);
      console.log("No user");
    }
  });



  return (
    <header className="w-full bg-[#CFB9A5] justify-center">
      <div className="grid grid-cols-3 p-4 px-3">
        <div className="col-span-1 flex items-center justify-start">
          <Link href="/" className="flex items-center">
            <div className={`fas fa-user fa-2x text-white bg-[#E9D6EC] rounded-full shadow p-3`}>
              <GiBullHorns className="" />
            </div>
            <p className="pl-1">Taurus</p>
          </Link>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1 flex items-center justify-end gap-5 content-between pr-[2rem]">
          <button className={`items-center ${isLogoutIconVisible ? 'flex' : 'hidden'}`} onClick={logout} id="LogOutIcon">
            <HiLogout className="w-[1.8rem] h-[1.8rem]" onClick={logout}/>
          </button>
          <Link href="/Register" className={`items-center ${isRegisterIconVisible ? 'flex' : 'hidden'}`} id="registerIcon">
            <HiOutlineUserCircle className="w-[1.8rem] h-[1.8rem]" />
          </Link>
          <Link href="/ShoppingCart" className="flex items-center">
            <HiOutlineShoppingCart className="w-[1.8rem] h-[1.8rem]" />
          </Link>
          <Link href="/" className="flex items-center">
            <HiOutlineHeart className="w-[1.8rem] h-[1.8rem]" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
