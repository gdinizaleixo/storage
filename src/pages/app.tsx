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
  }, [user]);

  return (
    <>
      <Header />
      <Storage />
    </>
  );
}
