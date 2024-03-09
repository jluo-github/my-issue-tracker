"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa6";
import logo from "@/public/bug1.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <Image src={logo} alt='logo' width={40} height={40} />
      </Link>

      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li key={link.label}>
            <Link
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
          </li>
        ))}
      </ul>

      <Box>
        {status === "authenticated" && (
          <Link href='/api/auth/signout'>Log Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href='/api/auth/signin'>Log In</Link>
        )}
      </Box>
    </nav>
  );
};
export default NavBar;
