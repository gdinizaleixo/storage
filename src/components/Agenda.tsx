import { useEffect } from "react";

export default function Agenda() {
  return (
    <main className="mt-10">
      <div className="flex justify-center text-white">
        <section className="flex flex-col gap-10">
          <h1 className="text-5xl mt-20 decoration-double font-medium text-center ">Agenda</h1>
          <table className="tb_estoque">
            <thead>
              <tr>
                <th className="tb_estoque">Nome</th>
                <th className="tb_estoque">Dia</th>
                <th className="tb_estoque">Hora</th>
                <th className="tb_estoque">Serviços</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tb_estoque">sdfg</td>
                <td className="tb_estoque">asdfasdf</td>
                <td className="tb_estoque">asdfasdf</td>
                <td className="tb_estoque">asdf</td>
              </tr>
            </tbody>
            ))
          </table>
          <div>
            <div className="flex items-center justify-center">
              <button className="border rounded-full px-3 py-4 bg-white text-black font-bold hover:scale-110 ">
                Adicionar Um Produto
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
