"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa6";
import logo from "@/public/bug1.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  return (
    <nav className='border-b mb-5 px-5 h-14 py-3'>
      <Container>
        <Flex justify='between' align='center'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <Image src={logo} alt='logo' width={40} height={40} />
            </Link>

            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

// nav links
const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.label}>
          <Link
            // className={` ${
            //   link.href === currentPath ? "text-gray-900" : "text-gray-500"
            // } hover:text-gray-800 transition-colors`}

            className={classNames({
              "nav-link": true,
              "!text-violet-600": link.href === currentPath,
            })}
            href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// auth status
const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width='3rem' />;

  return (
    <Box>
      {status === "authenticated" && (
        // <Link href='/api/auth/signout'>Log Out</Link>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              className='cursor-pointer'
              size='2'
              radius='full'
              src={session.user?.image!}
              fallback=''
              referrerPolicy='no-referrer'
            />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content sideOffset={5}>
            <DropdownMenu.Label>
              <Text size='2'> {session.user?.email}</Text>
            </DropdownMenu.Label>

            <DropdownMenu.Item>
              <Link href='/api/auth/signout'>Log Out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}

      {status === "unauthenticated" && (
        <Link className='nav-link' href='/api/auth/signin'>
          Log In
        </Link>
      )}
    </Box>
  );
};
export default NavBar;
