"use client";
import Link from "next/link";
import { GiBullHorns } from "react-icons/gi";
import { HiOutlineUserCircle, HiOutlineShoppingCart, HiOutlineHeart, } from 'react-icons/hi'


const Header = () => {
  return (
    <header className="w-full bg-[#CFB9A5] justify-center">
      <div className="grid grid-cols-3 p-4 px-3">
        <div className="col-span-1 flex items-center justify-start">
          <Link href="/" className="flex items-center">
            <div className="fas fa-user fa-2x text-white bg-[#E9D6EC] rounded-full shadow p-3">
              <GiBullHorns className="" />
            </div>
            <p className="pl-1">Taurus</p>
          </Link>
        </div>
        <div className="col-span-1">
        </div>
        <div className="col-span-1 flex items-center justify-end gap-5 content-between pr-[2rem]">
          <Link href="/Register" className="flex items-center">
            <HiOutlineUserCircle className="w-[1.8rem] h-[1.8rem]"/>
          </Link>
          <Link href="/ShoppingCart" className="flex items-center">
            <HiOutlineShoppingCart className="w-[1.8rem] h-[1.8rem]"/>
          </Link>
          <Link href="/" className="flex items-center">
            <HiOutlineHeart className="w-[1.8rem] h-[1.8rem]"/>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
