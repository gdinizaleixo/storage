export default function Agenda() {
  return (
    <main className="mt-10">
      <div className="flex justify-center text-white">
        <section className="flex flex-col gap-10">
          <h1 className="text-5xl mt-20 decoration-double font-medium text-center ">
            Agenda
          </h1>
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
              <tr className="">
                <td className="tb_estoque">Guilherme Diniz</td>
                <td className="tb_estoque">10/11/2022</td>
                <td className="tb_estoque">09:00</td>
                <td className="tb_estoque">cabelo</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
