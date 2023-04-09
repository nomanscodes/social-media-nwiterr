import React from "react";
import { IconType } from "react-icons/lib";
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs'
import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";


interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert
}) => {

  const loginModal = useLoginModal()
  const { data: currentUser } = useCurrentUser()

  const { data: fetchedNotifications = [] } = useNotification(currentUser?.id)


  const router = useRouter()
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick()
    }

    if (auth && !currentUser) {
      loginModal.onOpen()
    } else if (href) {
      return router.push(href)
    }
  }, [router, href, onClick, loginModal, auth, currentUser])

  return (
    <div onClick={handleClick} className=" flex flex-row items-center ">
      <div className=" relative h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={28} color="white" />
        <p className=" hidden lg:block text-white text-4xl">{label}</p>
        {alert ? <BsDot className="text-sky-500 absolute -top-3 left-0" size={70} /> : null}
      </div>
    </div>
  );
};

export default SidebarItem;
