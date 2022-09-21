import Router from "next/router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
export default function App() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      Router.push("/");
    }
  }, [user]);

  return (
    <>
      <div className="bg-[url('../imgs/background-home.jpg')] bg-no-repeat bg-cover min-h-screen min-w-screen">
        <Header />
      </div>
    </>
  );
}
