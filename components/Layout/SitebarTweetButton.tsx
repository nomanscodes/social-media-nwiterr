import React from "react";
import { FaFeather } from "react-icons/fa";
import { useCallback } from "react";
import useLoginModal from "@/hooks/useLoginModal";

const SitebarTweetButton = () => {

  const loginModal = useLoginModal();


  // console.log("loginModal",loginModal);



  const onClick = useCallback(() => {
    loginModal.onOpen()
  }, [loginModal]);

  return (
    <div>
      <div
        onClick={onClick}
        className="
    mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer
    "
      >
        <FaFeather size={24} color="white" />
      </div>

      <div
        onClick={onClick}
        className="
    mt-6 hidden lg:block rounded-full px-2 py-4 bg-sky-500 hover:bg-opacity-90 transition cursor-pointer
    "
      >
        <p className=" hidden lg:block text-center font-semibold text-white text-[20px]">
          Nweet
        </p>
      </div>
    </div>
  );
};

export default SitebarTweetButton;
