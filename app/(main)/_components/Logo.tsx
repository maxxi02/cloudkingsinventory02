import Link from 'next/link';
import { motion } from 'motion/react';
import { RiBox3Fill } from 'react-icons/ri';

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white flex items-center gap-2"
      >
        <RiBox3Fill className="w-6 h-6 md:w-8 md:h-8" />
        <span>CloudKings</span>
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <RiBox3Fill className="w-6 h-6 md:w-8 md:h-8" />
    </Link>
  );
};
