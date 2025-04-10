'use client';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/AceSidebar';
import { cn } from '@/lib/utils';
import { IconArrowLeft, IconSettings, IconUserBolt } from '@tabler/icons-react';
import { Logo, LogoIcon } from './_components/Logo';
import { useState } from 'react';
import { UseAuthContext } from '@/context/auth-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaBoxArchive } from 'react-icons/fa6';
import { MdWorkHistory } from 'react-icons/md';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import LogoutDialog from './_components/_common/LogoutDialogBox';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setIsOpen] = useState<boolean>(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);
  const { user } = UseAuthContext();
  const links = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: (
        <LuLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Products',
      href: '/products',
      icon: (
        <FaBoxArchive className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'History',
      href: '/history',
      icon: (
        <MdWorkHistory className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Logout',
      href: '#',
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onclick: () => {
        setLogoutDialogOpen(true);
        console.log('Clicked');
      },
    },
  ];
  return (
    <>
      <SidebarProvider>
        <div
          className={cn(
            'mx-auto flex w-full min-w-md flex-col items-center overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800',
            'h-[100vh]', // for your use case, use `h-screen` instead of `h-[60vh]`
          )}
        >
          <Sidebar open={open} setOpen={setIsOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col overflow-x-hidden overflow-y-auto">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div>
                <SidebarLink
                  email={user?.email}
                  link={{
                    label: `${user?.name}`,
                    href: '',
                    icon: (
                      <Avatar className="dark:bg-white dark:text-black text-black bg-zinc-900 h-8 w-8 rounded-lg flex items-center">
                        <AvatarFallback className="self-center place-items-center p-2">
                          {user?.name.split(' ')?.[0]?.charAt(0)}
                          {user?.name.split(' ')?.[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ),
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
          <div className="flex items-center justify-center w-full">
            {children}
          </div>
        </div>
      </SidebarProvider>
      <LogoutDialog isOpen={logoutDialogOpen} setIsOpen={setLogoutDialogOpen} />
    </>
  );
}
