import { supabase } from "../utils/supabase";

async function signOut() {
  const { error } = await supabase.auth.signOut();
  console.log(error);
}
export default function Header() {
  return (
    <header className="min-h-200">
      <nav className="bg-neutral-800 h-30">
        <ul className="flex flex-row justify-around col text-white text-lg p-2 decoration-double font-medium">
          <li>
            <a href="agenda">Agenda</a>
          </li>
          <li>
            <a href="app">Estoque</a>
          </li>
          <li>
            <a className="cursor-pointer" onClick={signOut}>
              Sair
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
