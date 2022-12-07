import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Product } from "../types/Product";
import { supabase } from "../utils/supabase";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Spinner, ArrowDown, ArrowUp } from "phosphor-react";

export default function Storage() {
  const productNameRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);
  const [tableData, setTableData] = useState<Product[] | null>(null);
  const [value, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [itemId, setItemId] = useState<number | undefined>();

  var formatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("product_name", {
      header: "Produto",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("product_price", {
      header: "Preço",
      cell: (info) => formatter.format(info.getValue()),
    }),
    columnHelper.accessor("product_quantity", {
      header: () => "Quantidade",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("product_edit", {
      header: () => "Editar",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("product_delete", {
      header: () => "Deletar",
      cell: (info) => info.renderValue(),
    }),
  ];

  //TABELA DE ESTOQUE COM PAGINAÇÃO

  function TabelaEstoque() {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });

    useEffect(() => {
      selectProduct()
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
      <div className="p-0 md:p-2 flex flex-col items-center justify-center">
        <table className="w-full md:w-fit border-white border-solid border-2 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (
                    header.id === "product_edit" ||
                    header.id === "product_delete"
                  ) {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="w-fit  border-solid border-white border-b-2 text-[12px] md:text-lg"
                      >
                        {/* Lugar aonde fica a tabela dos icones */}
                        <div className=" select-none px-0 md:px-5">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      </th>
                    );
                  } else
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="w-fit border-solid border-white border-b-2 text-[12px] md:text-lg"
                      >
                        {/* Lugar aonde fica a tabela dos campos, PRODUTO, PREÇO, QTD */}
                        <button
                          type="button"
                          className="cursor-pointer select-none px-0 md:px-5 md:w-[170px]"
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
            {table.getRowModel().rows.map((row, index: number) => {
              let tableBackground;
              if (index % 2 == 0) {
                tableBackground = "bg-zinc-800";
              } else {
                tableBackground = "bg-zinc-900";
              }
              return (
                <tr key={row.id} className={tableBackground}>
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id == "product_edit") {
                      return (
                        <td className=" text-center md:w-fit border-solid border-white border-b-2 text-[12px] md:text-lg ">
                          {/* Lugar aonde fica a tabela do icone de editar */}
                          <button
                            className=""
                            onClick={() => {
                              openModalUpdate();
                              setItemId(cell.row.original.product_id);
                            }}
                          >
                            <AiFillEdit />
                          </button>
                        </td>
                      );
                    } else if (cell.column.id == "product_delete") {
                      return (
                        <td className=" text-center md:w-fit border-solid border-white border-b-2 text-[12px] md:text-lg px-2 ">
                          <button
                            className=""
                            onClick={() => {
                              openModalDelete();
                              setItemId(cell.row.original.product_id);
                            }}
                          >
                            {/* Lugar aonde fica a tabela do icone excluir */}
                            <FaTrashAlt />
                          </button>
                        </td>
                      );
                    } else
                      return (
                        <td
                          key={cell.id}
                          className="text-center w-[15ch] md:h-[70px] border-solid border-white border-b-2 text-[12px] md:text-lg
                          "
                        >
                          {/* Lugar aonde fica as tabelas */}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                  })}
                </tr>
              );
            })}
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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalUpdate() {
    setIsOpenUpdate(false);
  }

  function openModalUpdate() {
    setIsOpenUpdate(true);
  }

  function closeModalDelete() {
    setIsOpenDelete(false);
  }

  function openModalDelete() {
    setIsOpenDelete(true);
  }

  var formatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  async function selectProduct() {
    const { data } = await supabase
      .from<Product>("product")
      .select()
      .throwOnError();
    return data;
  }

  function handleChange() {
    selectProduct()
      .then((data) => setTableData(data))
      .catch((err) => console.error(err));
  }

  async function insertProduct(e: FormEvent) {
    e.preventDefault();
    const productName = productNameRef.current?.value;
    const productPrice = productPriceRef.current?.valueAsNumber;
    const productQuantity = productQuantityRef.current?.valueAsNumber;

    if (!productName) {
      productNameRef.current?.focus();
      return;
    }
    if (!productPrice) {
      productPriceRef.current?.focus();
      return;
    }
    if (!productQuantity) {
      productQuantityRef.current?.focus();
      return;
    }

    const newProduct = {
      product_name: productName,
      product_quantity: productQuantity,
      product_price: productPrice,
    };

    try {
      const { data, error } = await supabase
        .from("product")
        .insert([newProduct]);
      productNameRef.current.value = "";
      productPriceRef.current.value = "";
      productQuantityRef.current.value = "";
      handleChange();
      closeModal();
      return toast.success("Produto Adicionado");
    } catch (error) {
      return toast.error("Algo deu Errado");
    }
  }

  async function updateProduct(product_id: number | undefined) {
    const modified = {
      product_name: productNameRef.current?.value,
      product_quantity: productQuantityRef.current?.value,
      product_price: productPriceRef.current?.value,
    };

    const { data, error } = await supabase
      .from("product")
      .update(modified)
      .match({ product_id });
    if (error) {
      return toast.error("Preencha algo valído");
    }
    toast.success("Produto editado com sucesso");
    handleChange();
    setIsOpenUpdate(false);
  }

  async function deleteProduct(product_id: number | undefined) {
    const { data, error } = await supabase
      .from("product")
      .delete()
      .match({ product_id });
    handleChange();
  }

  useEffect(() => {
    selectProduct()
      .then((data) => setTableData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="mt-20">
      <div className="flex justify-center text-white">
        <section className="flex flex-col gap-10 w-full">
          <h1 className="text-5xl mt-20 decoration-double font-medium text-center">
            Estoque
          </h1>
          <TabelaEstoque />
          <div>
            <div className="flex items-center justify-center mb-20">
              <button
                onClick={openModal}
                className="border rounded-full px-3 py-4 bg-white text-black font-bold hover:scale-110 "
              >
                Adicionar Um Produto
              </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-[700px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="md:text-left text-center font-bold text-[20px] "
                        >
                          Adicione Um Produto
                        </Dialog.Title>
                        <div className="mt-4 flex justify-center items-center font-bold">
                          <form
                            onSubmit={insertProduct}
                            className="flex justify-center flex-col gap-3"
                          >
                            <label>Nome:</label>
                            <input
                              className="btn_class"
                              type="text"
                              ref={productNameRef}
                            />
                            <label>Preço:</label>
                            <input
                              className="btn_class"
                              type="number"
                              min="0"
                              step="0.01"
                              ref={productPriceRef}
                            />
                            <label>Quantidade:</label>
                            <input
                              className="btn_class"
                              type="number"
                              min="1"
                              ref={productQuantityRef}
                            />
                            <button className="btn" type="submit">
                              Adicionar
                            </button>
                          </form>
                        </div>

                        <button
                          onClick={closeModal}
                          className="absolute top-1 right-1 hover:bg-red-400 rounded-xl flex items-center"
                        >
                          <Image
                            width={24}
                            height={24}
                            src="/Close.svg"
                            alt="Close modal"
                          />
                        </button>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            {/* SEPARA MODAISSSSSSSSSSSSSSSSSSSSS */}

            <Transition appear show={isOpenDelete} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={closeModalDelete}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-[700px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className=" text-center font-bold text-[20px] "
                        >
                          Realmente deseja excluir?
                        </Dialog.Title>
                        <div className="mt-4 flex justify-center items-center font-bold gap-3">
                          <button
                            className="w-[300px] rounded-[30px] border-[1px] h-[45px] px-3 py-1 bg-green-300 text-white font-bold"
                            onClick={() => {
                              deleteProduct(itemId);
                              closeModalDelete();
                              toast.success("Produto deletado com Sucesso!");
                            }}
                          >
                            Sim
                          </button>
                          <button
                            className="w-[300px] rounded-[30px] border-[1px] h-[45px] px-3 py-1 bg-red-300 text-white font-bold"
                            onClick={() => closeModalDelete()}
                          >
                            Não
                          </button>
                        </div>

                        <button
                          onClick={closeModalDelete}
                          className="absolute top-1 right-1 hover:bg-red-400 rounded-xl flex items-center"
                        >
                          <Image
                            width={24}
                            height={24}
                            src="/Close.svg"
                            alt="Close modal"
                          />
                        </button>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            {/* SEPARA MODAISSSSSSSSSSSSSSSSSSSSS */}

            <Transition appear show={isOpenUpdate} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={closeModalUpdate}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-[700px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className=" text-center font-bold text-[20px] "
                        >
                          Editar dados
                        </Dialog.Title>
                        <div className="mt-4 flex justify-center items-center font-bold">
                          <div className="flex justify-center flex-col gap-3">
                            <label>Nome:</label>
                            <input
                              className="btn_class"
                              type="text"
                              ref={productNameRef}
                            />
                            <label>Preço:</label>
                            <input
                              className="btn_class"
                              type="number"
                              min="0"
                              step="0.01"
                              ref={productPriceRef}
                            />
                            <label>Quantidade:</label>
                            <input
                              className="btn_class"
                              type="number"
                              min="1"
                              ref={productQuantityRef}
                            />
                            <button
                              className="btn"
                              onClick={() => updateProduct(itemId)}
                            >
                              Editar
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={closeModalUpdate}
                          className="absolute top-1 right-1 hover:bg-red-400 rounded-xl flex items-center"
                        >
                          <Image
                            width={24}
                            height={24}
                            src="/Close.svg"
                            alt="Close modal"
                          />
                        </button>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </section>
      </div>
    </main>
  );
}
