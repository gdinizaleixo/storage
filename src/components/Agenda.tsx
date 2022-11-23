import { useEffect, useState } from "react";
import { Agended } from "../types/Agended";
import { supabase } from "../utils/supabase";
import { toast } from "react-toastify";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Spinner, ArrowDown, ArrowUp } from "phosphor-react";

export default function Agenda() {
  const [tableData, setTableData] = useState<any>();

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("agenda_user_name", {
      header: "Nome",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("agenda_day", {
      header: "Dia",
      cell: (info) => info.getValue().split("-").reverse().join("/"),
    }),
    columnHelper.accessor("agenda_time", {
      header: () => "Hora",
      cell: (info) => info.renderValue().substring(0, 5),
    }),
    columnHelper.accessor("agenda_user_phone", {
      header: () => "Telefone",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("agenda_service", {
      header: () => "Serviço",
      cell: (info) => info.renderValue(),
    }),
  ];

  //TABELA DE ESTOQUE COM PAGINAÇÃO

  function TabelaAgendamentos() {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });

    useEffect(() => {
      getAgendamentos()
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }, []);

    if (isLoading) {
      return <Spinner className="h-8 w-8 animate-spin" />;
    }

    return (
      <div className="p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (
                    header.id === "agenda_user_phone" ||
                    header.id === "agenda_service"
                  ) {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        <div className=" select-none px-5">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      </th>
                    );
                  } else
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        <button
                          type="button"
                          className="cursor-pointer select-none px-5"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ArrowUp className="w-4 h-4 ml-2 inline-block" />
                            ),
                            desc: (
                              <ArrowDown className="w-4 h-4 ml-2 inline-block" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </button>
                      </th>
                    );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    );
  }
  async function getAgendamentos() {
    const { data } = await supabase
      .from<Agended | null>("agenda")
      .select()
      .throwOnError();
    return data;
  }

  useEffect(() => {
    getAgendamentos()
      .then((data) => setTableData(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <main className="mt-10">
      <div className="flex justify-center text-white">
        <section className="flex flex-col gap-10">
          <h1 className="text-5xl mt-20 decoration-double font-medium text-center ">
            Agendamentos
          </h1>
          <TabelaAgendamentos />
        </section>
      </div>
    </main>
  );
}
