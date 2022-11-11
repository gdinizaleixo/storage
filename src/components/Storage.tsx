import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Product } from "../types/Product";
import { supabase } from "../utils/supabase";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Storage() {
  const productNameRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);
  const [tableData, setTableData] = useState<Product[] | null>(null);
  const [value, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [itemId, setItemId] = useState<number | undefined>();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
    <main className="mt-10">
      <div className="flex justify-center text-white">
        <section className="flex flex-col gap-10">
          <h1 className="text-5xl mt-20 decoration-double font-medium text-center ">
            Estoque
          </h1>
          <table className="tb_estoque">
            <thead>
              <tr>
                <th className="tb_estoque">Nome do produto</th>
                <th className="tb_estoque">Preço</th>
                <th className="tb_estoque">Quantidade</th>
              </tr>
            </thead>

            {tableData?.map((tableData) => (
              <tbody key={tableData.product_id}>
                <tr>
                  <td className="tb_estoque">{tableData.product_name}</td>
                  <td className="tb_estoque">
                    {formatter.format(tableData.product_price)}
                  </td>
                  <td className="tb_estoque">{tableData.product_quantity}</td>
                  <td className="tb_estoque">
                    <button className="px-2">
                      <AiFillEdit />
                    </button>
                    <button
                      className="px-2"
                      onClick={() => {
                        openModalDelete();
                        setItemId(tableData.product_id);
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div>
            <div className="flex items-center justify-center">
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
          </div>
        </section>
      </div>
    </main>
  );
}
