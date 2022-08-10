import { FormEvent, useRef } from "react";
import { supabase } from "../utils/supabase";
import { useAuth } from "../hooks/useAuth";

export default function Storage() {
  const productNameRef = useRef<HTMLInputElement>(null);
  const productQuantityRef = useRef<HTMLInputElement>(null);

  async function addProduct(e: FormEvent) {
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

  return (
    <main className="flex justify-center">
      <section className="flex flex-col gap-10">
        <h1 className="text-3xl">Adicione um produto</h1>
        <form onSubmit={addProduct} className="flex justify-center flex-col gap-3">
          <label>Nome:</label>
          <input type="text" ref={productNameRef} />
          <label>Quantidade:</label>
          <input type="number" ref={productQuantityRef} />
          <button type="submit">Adicionar</button>
        </form>
      </section>
    </main>
  );
}
