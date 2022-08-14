import { FormEvent, useRef } from "react";
import { supabase } from "../utils/supabase";

export default function Storage() {
  const tableData = selectProduct();
  const productNameRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);

  async function insertProduct(e: FormEvent) {
    e.preventDefault();
    const productName = productNameRef.current?.value;
    const productQuantity = productQuantityRef.current?.value;

    if (!productName) {
      productNameRef.current?.focus();
      return;
    }
    if (!productQuantity) {
      productQuantityRef.current?.focus();
      return;
    }

    console.log(productNameRef.current?.value);
    console.log(productQuantityRef.current?.value);

    const { data, error } = await supabase
      .from("product")
      .insert([{ product_name: productName, product_quantity: productQuantity }]);
    console.log(error);
  }
  async function selectProduct() {
    const { data, error } = await supabase.from("product").select();
    return data;
  }
  console.log(tableData);
  return (
    <main className="mt-10">
      <div className="flex justify-center text-white">
        <section className="flex flex-col gap-10">
          <h1 className="text-3xl">Adicione um produto</h1>
          <form onSubmit={insertProduct} className="flex justify-center flex-col gap-3">
            <label>Nome:</label>
            <input
              className="border border-black border-2 text-black"
              type="text"
              ref={productNameRef}
            />
            <label>Quantidade:</label>
            <input
              className="border border-black border-2 text-black"
              type="number"
              ref={productQuantityRef}
            />
            <button type="submit">Adicionar</button>
          </form>
          <table className="border-collapse border border-white ...">
            <thead>
              <tr>
                <th className="border border-white">Nome</th>
                <th className="border border-white">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white">product1</td>
                <td className="border border-white">product1_qty</td>
              </tr>
              <tr>
                <td className="border border-white">product2</td>
                <td className="border border-white">product2_qty</td>
              </tr>
              <tr>
                <td className="border border-white">product3</td>
                <td className="border border-white">product3_qty</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
