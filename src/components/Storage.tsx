import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "../types/Product";
import { supabase } from "../utils/supabase";
import { Disclosure } from "@headlessui/react";

export default function Storage() {
  const productNameRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);
  const [tableData, setTableData] = useState<Product[] | null>(null);

  async function insertProduct(e: FormEvent) {
    e.preventDefault();
    const productName = productNameRef.current?.value;
    const productPrice = productPriceRef.current?.value;
    const productQuantity = productQuantityRef.current?.value;

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
      product_quantity: Number(productQuantity),
      product_price: Number(productPrice),
    };

    const { data, error } = await supabase.from("product").insert([newProduct]);
    if (!error) {
      const currentTableData = tableData ?? [];
      setTableData([
        ...currentTableData,
        { product_id: currentTableData[currentTableData.length - 1].product_id + 1, ...newProduct },
      ]);
    }
    productNameRef.current.value = "";
    productPriceRef.current.value = "";
    productQuantityRef.current.value = "";
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
          <h1 className="text-3xl text-center">Estoque</h1>
          <table className="border-collapse border border-white">
            <thead>
              <tr>
                <th className="border border-white text-center">Nome do produto</th>
                <th className="border border-white text-center">Preço</th>
                <th className="border border-white text-center">Quantidade</th>
              </tr>
            </thead>
            {tableData?.map((tableData) => (
              <tbody key={tableData.product_id}>
                <tr>
                  <td className="border border-white text-center">{tableData.product_name}</td>
                  <td className="border border-white text-center">{tableData.product_price}</td>
                  <td className="border border-white text-center">{tableData.product_quantity}</td>
                  <td className="border border-white text-center">
                    <button>Update</button>
                  </td>
                  <td className="border border-white text-center">
                    <button onClick={() => deleteProduct(tableData.product_id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <Disclosure>
            <Disclosure.Button className="py-2">Adicionar um Produto</Disclosure.Button>
            <Disclosure.Panel className="text-gray-100">
              <form onSubmit={insertProduct} className="flex justify-center flex-col gap-3">
                <label>Nome:</label>
                <input
                  className="border border-black border-2 text-black"
                  type="text"
                  ref={productNameRef}
                />
                <label>Preço:</label>
                <input
                  className="border border-black border-2 text-black"
                  type="number"
                  min="0"
                  step="0.01"
                  ref={productPriceRef}
                />
                <label>Quantidade:</label>
                <input
                  className="border border-black border-2 text-black"
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
