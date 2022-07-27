import { FormEvent, useRef } from "react";
import { supabase } from "../utils/supabase";
export default function Login() {
  const session = supabase.auth.session();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function signIn(evt: FormEvent) {
    evt.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    console.log(emailInputRef.current?.value);
    console.log(passwordInputRef.current?.value);

    const { session, error, user } = await supabase.auth.signIn({
      email,
      password,
    });
    console.log(session);
    console.log(error);
    console.log(user);
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    console.log(session?.access_token);
  }
  // async function signUp(params: FormEvent) {
  //   const { user, error } = await supabase.auth.signUp({
  //     email: "gdiniz0011@gmail.com",
  //     password: "Teste12345",
  //   });
  // }
  return (
    <main className="bg-gray-700">
      {session?.access_token !== undefined && (
        <div className="login">
          <section className="container">
            <h1>Deseja sair?</h1>
            <button onClick={signOut}>Log Out</button>
          </section>
        </div>
      )}
      {session?.access_token === undefined && (
        <div className="login">
          <section className="container">
            <h1>Login</h1>
            <div>
              <form onSubmit={signIn} className="form">
                <label htmlFor="userEmail">Email:</label>
                <input type="text" ref={emailInputRef} />
                <label htmlFor="userPassword">Senha</label>
                <input type="password" ref={passwordInputRef} />
                <button type="submit">LogIn</button>
              </form>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
