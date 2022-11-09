import { useRef } from "react";
import { supabase } from "../utils/supabase";

export default function SignAdm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cpfInputRef = useRef<HTMLInputElement>(null);

  async function signIn() {
    console.log("teste");
    const userData = {
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      name: nameInputRef.current?.value,
      phone: phoneInputRef.current?.value,
      cpf: cpfInputRef.current?.value,
    };
    console.log(userData);
    if (!userData.name) {
      nameInputRef.current?.focus();
    }
    if (!userData.phone) {
      phoneInputRef.current?.focus();
    }
    if (!userData.cpf) {
      cpfInputRef.current?.focus();
    }
    if (!userData.email) {
      emailInputRef.current?.focus();
    }
    if (!userData.password) {
      passwordInputRef.current?.focus();
    }
    console.log("teste2");
    const { error } = await supabase.auth.signUp(
      {
        email: userData.email,
        password: userData.password,
      },
      {
        data: {
          name: userData.name,
          phone: userData.phone,
          cpf: userData.cpf,
          adm: true,
        },
      }
    );
  }
  return (
    <div className="flex md:flex-row  md:justify-around items-center flex-col text-black font-bold ">
      <div className="flex justify-center items-center px-2 py-6 md:px-0 md:py-0 ">
        <img src="/Logo_inicial.svg" />
      </div>

      <form
        onSubmit={signIn}
        className="flex flex-col gap-3 text-xl bg-white  border rounded-[20px] p-[20px] w-[300px] h-[600px] mt-[50px] mb-[50px] md:h-[650px] md:w-[500px]"
      >
        <h1 className="md:text-4xl text-3xl text-center md:text-left decoration-double font-medium">
          Criar outra Conta
        </h1>
        <label className="">Nome:</label>
        <input className="btn_class" type="text" ref={nameInputRef} />
        <label>Telefone:</label>
        <input className="btn_class" type="number" ref={phoneInputRef} />
        <label>Cpf:</label>
        <input className="btn_class" type="number" ref={cpfInputRef} />
        <label>Email:</label>
        <input className=" btn_class" type="text" ref={emailInputRef} />
        <label>Senha:</label>
        <input className=" btn_class" type="password" ref={passwordInputRef} />
        <button className="btn" type="submit" onClick={signIn}>
          Log In
        </button>
      </form>
    </div>
  );
}
