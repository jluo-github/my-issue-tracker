"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa6";
import logo from "@/public/bug1.png";
import Image from "next/image";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <Image src={logo} alt='logo' width={40} height={40} />
      </Link>

      <ul className='flex space-x-6'>
        {links.map((link) => (
          <Link
            key={link.label}
            // className={` ${
            //   link.href === currentPath ? "text-gray-900" : "text-gray-500"
            // } hover:text-gray-800 transition-colors`}

            className={classNames({
              "text-gray-900": link.href === currentPath,
              "text-gray-500": link.href !== currentPath,
              "hover:text-gray-800": true,
              "transition-colors": true,
            })}
            href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
