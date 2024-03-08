import Link from "next/link";
import { FaBug } from "react-icons/fa6";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <FaBug />
      </Link>

      <ul className='flex space-x-6'>
        {links.map((link) => (
          <Link
            key={link.label}
            className='text-gray-500 hover:text-gray-800 transition-colors'
            href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
