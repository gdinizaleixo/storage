import Router from "next/router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Storage from "../components/Storage";
export default function App() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      Router.push("/");
    }
    if (!user?.user_metadata.adm) {
      Router.push("/");
    }
  }, [user]);

  return (
    <>
      <div className="bg-gradient-to-tr from-basicLight via-basic to-basicDark bg-no-repeat bg-cover min-h-screen min-w-screen">
        <Header />
        <Storage />
      </div>
    </>
  );
}
