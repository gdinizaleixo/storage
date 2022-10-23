import Header from "../components/Header";
import Login from "../components/Login";

export default function Home() {
  return (
    <div className=" w-full bg-gradient-to-tr from-basicLight via-basic to-basicDark bg-fixed bg-no-repeat bg-cover h-screen flex items-center justify-center">
      <Login />
    </div>
  );
}
