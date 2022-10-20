import { useAuth } from "../hooks/useAuth";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export default function UserAdm() {
  const user = supabase.auth.user();
  console.log(user?.user_metadata.adm);
  return (
    <main className="flex justify-center text-white mt-20">
      <div>
        <section>
          <h1>user email: {user?.email}</h1>
          <h1>user name: {user?.user_metadata.name}</h1>
          <h1>user cpf: {user?.user_metadata.cpf}</h1>
          <h1>user phone: {user?.user_metadata.phone}</h1>
        </section>
      </div>
    </main>
  );
}
