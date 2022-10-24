import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "../types/Product";
import { supabase } from "../utils/supabase";
import { Disclosure, Menu } from "@headlessui/react";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

export default function Storage() {
  const productNameRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);
  const [tableData, setTableData] = useState<Product[] | null>(null);

  var formatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    const subscription = supabase
      .from("product")
      .on("INSERT", console.log)
      .on("UPDATE", console.log)
      .on("DELETE", console.log)
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

    const { data, error } = await supabase.from("product").insert([newProduct]);
    productNameRef.current.value = "";
    productPriceRef.current.value = "";
    productQuantityRef.current.value = "";
    function handleInsert() {
      const currentTableData = tableData ?? [];
      setTableData([
        ...currentTableData,
        { product_id: currentTableData[currentTableData.length - 1].product_id + 1, ...newProduct },
      ]);
    }
  }

  async function selectProduct() {
    const { data } = await supabase.from<Product>("product").select().throwOnError();
    return data;
  }

  async function deleteProduct(product_id: number) {
    const { data, error } = await supabase.from("product").delete().match({ product_id });
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
          <h1 className="text-5xl mt-20 decoration-double font-medium text-center ">Estoque</h1>
          <table className="border-collapse border border-white mt-10 text-xl">
            <thead>
              <tr className="border border-white text-center">
                <th className="border border-white text-center p-2">Nome do produto</th>
                <th className="border border-white text-center p-2">Preço</th>
                <th className="border border-white text-center p-2">Quantidade</th>
              </tr>
            </thead>
            {tableData?.map((tableData) => (
              <tbody key={tableData.product_id}>
                <tr>
                  <td className="border border-white text-center text-lg p-2">
                    {tableData.product_name}
                  </td>
                  <td className="border border-white text-center text-lg p-2">
                    {formatter.format(tableData.product_price)}
                  </td>
                  <td className="border border-white text-center text-lg p-2">
                    {tableData.product_quantity}
                  </td>
                  <td className="border text-center p-2">
                    <button className="px-2">
                      <AiFillEdit />
                    </button>{" "}
                    <button className="px-2" onClick={() => deleteProduct(tableData.product_id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <Disclosure>
            <Disclosure.Button className="py-2 text-lg">Adicionar um Produto</Disclosure.Button>
            <Disclosure.Panel className="text-gray-100">
              <form onSubmit={insertProduct} className="flex justify-center flex-col gap-3">
                <label>Nome:</label>
                <input
                  className="border border-black border-2 text-black bg-[#e7e7e7]"
                  type="text"
                  ref={productNameRef}
                />
                <label>Preço:</label>
                <input
                  className="border-black border-2 text-black bg-[#e7e7e7]"
                  type="number"
                  min="0"
                  step="0.01"
                  ref={productPriceRef}
                />
                <label>Quantidade:</label>
                <input
                  className="border border-black border-2 text-black bg-[#e7e7e7]"
                  type="number"
                  min="1"
                  ref={productQuantityRef}
                />
                <button type="submit">Adicionar</button>
              </form>
            </Disclosure.Panel>
          </Disclosure>
        </section>
      </div>
    </main>
  );
}
