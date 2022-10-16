import { FormEvent, useRef } from "react";
import { supabase } from "../utils/supabase";

export default function SignAdm() {
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

    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
  }
  return (
    <main className="flex justify-center text-white">
      <div>
        <section>
          <h1 className="text-4xl mt-20 decoration-double font-medium">Criar outra Conta</h1>
          <div>
            <form onSubmit={signIn} className="flex flex-col gap-5 text-xl">
              <label className="mt-20">Email:</label>
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
              <button
                className="bg-white rounded-md text-black border-none mt-5 hover:bg-neutral-100"
                type="submit"
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
