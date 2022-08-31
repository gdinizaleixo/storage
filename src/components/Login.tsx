import { FormEvent, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../utils/supabase";
import Router from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      Router.push("/agenda");
    }
  }, [user]);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

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

    const { session, error, user } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error === null) {
      console.log("Bem vindo!");
    } else {
      console.log("Credenciais Invalidas");
    }
  }
  return (
    <main className="flex justify-center text-white">
      <div>
        <section>
          <h1 className="text-3xl mt-10">Login</h1>
          <div>
            <form onSubmit={signIn} className="flex flex-col gap-5">
              <label className="mt-6">Email:</label>
              <input
                className="border border-black border-2 text-black"
                type="text"
                ref={emailInputRef}
              />
              <label>Senha:</label>
              <input
                className="border border-black border-2 text-black"
                type="password"
                ref={passwordInputRef}
              />
              <button className="bg-white rounded-md text-black border-none" type="submit">
                Log In
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
