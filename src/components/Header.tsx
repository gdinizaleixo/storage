import Router from "next/router";

export default function Header() {
  return (
    <header className="h-30">
      <nav className="bg-neutral-800 h-30">
        <ul className="flex flex-row justify-around col text-white">
          <li>
            <a>Agenda</a>
          </li>
          <li>
            <a href="app">Estoque</a>
          </li>
          <li>
            <a href="/">Sair</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
