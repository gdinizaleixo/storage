import Header from "../components/Header";
import Login from "../components/Login";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  return (
    <>
      <div className="bg-[url('../imgs/background-home.jpg')] bg-fixed bg-no-repeat bg-cover min-h-screen min-w-screen">
        <Header />
        <Login />
      </div>
    </>
  );
}
