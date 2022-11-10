import { supabase } from "../utils/supabase";
import EditUser from "./EditUserData";

export default function UserAdm() {
  const user = supabase.auth.user();
  return (
    <main className="flex justify-center mt-20 h-screen">
      <div>
        <section className="bg-white h-[550px] md:w-[500px] w-[350px] border rounded-[20px] flex flex-col p-6 gap-6">
          <h1 className="text-center font-bold text-3xl">Dados de sua conta</h1>
          <div className="card_dados">
            <h1>Nome:</h1>
            <h1>{user?.user_metadata.name}</h1>
          </div>
          <div className="card_dados">
            <h1>Cpf:</h1>
            <h1>{user?.user_metadata.cpf}</h1>
          </div>
          <div className="card_dados">
            <h1>Email:</h1>
            <h1>{user?.email}</h1>
          </div>
          <div className="card_dados">
            <h1>Telefone:</h1>
            <h1>{user?.user_metadata.phone}</h1>
          </div>
          <div className="flex justify-center">
            <EditUser />
          </div>
        </section>
      </div>
    </main>
  );
}
