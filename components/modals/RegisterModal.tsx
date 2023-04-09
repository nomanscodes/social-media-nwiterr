import React from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { toast } from 'react-hot-toast'
import { signIn } from "next-auth/react"
import { useState, useCallback } from "react";
import Input from "../Input";
import Modal from "@/components/Modal";
import axios from 'axios';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post('/api/register', {
        email, password, name, username
      })
      toast.success("Account created.")
      signIn('credentials', {
        email,
        password
      })
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong")
    } finally {
      setLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const onToggol = useCallback(() => {
    if (loading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [loading, loginModal, registerModal]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={loading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={loading}
      />
      <Input
        placeholder="User Name"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={loading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loading}
      />
    </div>
  );

  const footerContent = (
    <div className=" text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggol}
          className="px-[4px] text-white cursor-pointer hover:underline"
        >
          Sign-in
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={loading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
