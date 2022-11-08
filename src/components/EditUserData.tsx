import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { supabase } from "../utils/supabase";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";

export default function EditUser() {
  const { user } = useAuth();
  const [value, onChange] = useState(new Date());
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cpfInputRef = useRef<HTMLInputElement>(null);

  async function UpdateUser() {
    console.log("teste");
    const userData = {
      password: passwordInputRef.current?.value,
      confirmPassword: confirmPasswordInputRef.current?.value,
      name: nameInputRef.current?.value,
      phone: phoneInputRef.current?.value,
      cpf: cpfInputRef.current?.value,
    };
    console.log(userData);
    if (!userData.name) {
      nameInputRef.current?.focus();
    }
    if (!userData.phone) {
      phoneInputRef.current?.focus();
    }
    if (!userData.cpf) {
      cpfInputRef.current?.focus();
    }
    if (!userData.password) {
      passwordInputRef.current?.focus();
    }
    if (!userData.confirmPassword) {
      confirmPasswordInputRef.current?.focus();
    }
    if (userData.password !== userData.confirmPassword) {
      confirmPasswordInputRef.current?.focus();
    }
    console.log("teste2");
    const { user, error } = await supabase.auth.update({
      password: userData.password,
      data: { name: userData.name, phone: userData.phone, cpf: userData.cpf },
    });
  }
  return (
    <>
      <div className="">
        <button onClick={openModal} className="btn_options bg-white hover:bg-blue-400">
          Editar
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
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[500px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="flex justify-center font-bold text-[20px]">
                    Editar Dados Cadastrados
                  </Dialog.Title>
                  <div className=" flex justify-center  flex-col font-bold gap-[20px] mt-[30px] ">
                    <div>
                      <h1 className="text-left">Nome</h1>
                      <input
                        className="btn_class"
                        placeholder="Novo nome de Usuário"
                        ref={nameInputRef}
                      ></input>
                    </div>
                    <div>
                      <h1>CPF</h1>
                      <input
                        className="btn_class"
                        placeholder="Digite seu CPF"
                        ref={cpfInputRef}
                      ></input>
                    </div>
                    <div>
                      <h1 className="text-left">Telefone</h1>
                      <input
                        className="btn_class"
                        placeholder="Digite seu Telefone"
                        ref={phoneInputRef}
                      ></input>
                    </div>
                    <div>
                      <h1 className="text-left">Nova Senha</h1>
                      <input
                        className="btn_class"
                        placeholder="Digite sua Nova Senha"
                        ref={passwordInputRef}
                      ></input>
                    </div>
                    <div>
                      <h1 className="text-left">Confirme a Senha</h1>
                      <input
                        className="btn_class"
                        placeholder="Confirme sua Senha"
                        ref={confirmPasswordInputRef}
                      ></input>
                    </div>

                    <div>
                      <button
                        className="w-full h-[45px] rounded-[30px] border-[1px] px-3 py-1 bg-black text-white font-bold"
                        onClick={UpdateUser}
                      >
                        Atualizar Dados
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center"></div>
                  <button
                    onClick={closeModal}
                    className="absolute top-1 right-1 hover:bg-red-400 rounded-xl flex items-center"
                  >
                    <Image width={24} height={24} src="/Close.svg" alt="" />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
