import { FormEvent, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../utils/supabase";
import Router from "next/router";
import { toast } from "react-toastify";

export default function Login() {
  const { user } = useAuth();
  useEffect(() => {
    if (user?.user_metadata.adm) {
      Router.push("/agenda");
      toast.success("Bem Vindo");
    } else {
      signOut;
      console.log("Sucumba daqui");
    }
  }, [user]);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  }

  async function signIn(evt: FormEvent) {
    evt.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (!email) {
      emailInputRef.current?.focus();
      return;
    }
    if (!password) {
      passwordInputRef.current?.focus();
      return;
    }

    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    console.log(error);
    if (error) toast.error("Login Invalido");
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  }
  return (
    <div className="flex md:flex-row flex-col font-bold md:justify-around w-full items-center gap-5 md:gap-0">
      <div className="flex justify-center items-center">
        <img className="w-[326px] md:w-[556px]" src="/Logo_inicial.svg" />
      </div>

      <form
        onSubmit={signIn}
        className="flex flex-col gap-4 text-xl bg-white md:h-[400px] md:w-[500px] border rounded-[20px] p-4 w-[300px] h-[350px]"
      >
        <h1 className="md:text-4xl text-[30px] decoration-double font-medium text-center mt-[10px]">
          Acessar sua Conta
        </h1>
        <label>Email:</label>
        <input className="  btn_class" type="text" ref={emailInputRef} />
        <label>Senha:</label>
        <input className="btn_class" type="password" ref={passwordInputRef} />

        <button className="btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
