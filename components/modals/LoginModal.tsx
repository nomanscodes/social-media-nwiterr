import React from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useState, useCallback } from "react";
import Input from "../Input";
import Modal from "@/components/Modal";
import { signIn } from 'next-auth/react';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onToggol = useCallback(() => {
    if (loading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [loading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await signIn('credentials', {
        email,
        password,
      });

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [loginModal, email, password]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={loading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        disabled={loading}
      />
    </div>
  );

  const footerContent = (
    <div className=" text-neutral-400 text-center mt-4">
      <p>
        First time using Nwitter?
        <span
          onClick={onToggol}
          className="px-[4px] text-white cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={loading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign-in"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default LoginModal;
