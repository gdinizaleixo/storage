import { FormEvent, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../utils/supabase";
export default function Login() {
  const { user } = useAuth();
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
    console.log(session);
    console.log(error);
    console.log(user);
    if (error === null) {
      console.log("Bem vindo!");
    } else {
      console.log("Credenciais Invalidas");
    }
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  }
  // async function signUp(params: FormEvent) {
  //   const { user, error } = await supabase.auth.signUp({
  //     email: "gdiniz0011@gmail.com",
  //     password: "Teste12345",
  //   });
  // }
  return (
    <main className="flex justify-center">
      {user ? (
        <div>
          <section>
            <h1 className="text-3xl">Deseja sair?</h1>
            <button onClick={signOut}>Log Out</button>
          </section>
        </div>
      ) : (
        <div>
          <section>
            <h1 className="text-3xl">Login</h1>
            <div>
              <form onSubmit={signIn} className="flex flex-col gap-5">
                <label>Email:</label>
                <input type="text" ref={emailInputRef} />
                <label>Senha:</label>
                <input type="password" ref={passwordInputRef} />
                <button className="bg-neutral-200 rounded-md" type="submit">
                  Log In
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
