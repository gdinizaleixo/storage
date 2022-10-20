import { FormEvent, useRef } from "react";
import { supabase } from "../utils/supabase";

export default function SignAdm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cpfInputRef = useRef<HTMLInputElement>(null);

  async function signIn(evt: FormEvent) {
    evt.preventDefault();
    console.log("teste");
    const userData = {
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      name: nameInputRef.current?.value,
      phone: phoneInputRef.current?.value,
      cpf: cpfInputRef.current?.value,
    };
    console.log(userData);
    if (!userData.email) {
      emailInputRef.current?.focus();
    }
    if (!userData.password) {
      passwordInputRef.current?.focus();
    }
    if (!userData.name) {
      nameInputRef.current?.focus();
    }
    if (!userData.phone) {
      phoneInputRef.current?.focus();
    }
    if (!userData.cpf) {
      cpfInputRef.current?.focus();
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
    <main className="flex justify-center text-white">
      <div>
        <section>
          <h1 className="text-4xl mt-20 decoration-double font-medium">Criar outra Conta</h1>
          <div>
            <form onSubmit={signIn} className="flex flex-col gap-5 text-xl">
              <label className="mt-20">Nome:</label>
              <input className=" border-black border-2 text-black" type="text" ref={nameInputRef} />
              <label>Telefone:</label>
              <input
                className="border-black border-2 text-black"
                type="number"
                ref={phoneInputRef}
              />
              <label>Cpf:</label>
              <input className="border-black border-2 text-black" type="number" ref={cpfInputRef} />
              <label>Email:</label>
              <input
                className=" border-black border-2 text-black"
                type="text"
                ref={emailInputRef}
              />
              <label>Senha:</label>
              <input
                className=" border-black border-2 text-black"
                type="password"
                ref={passwordInputRef}
              />
              <button
                className="bg-white rounded-md text-black border-none mt-5 hover:bg-neutral-200"
                type="submit"
                onClick={signIn}
              >
                Log In
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
