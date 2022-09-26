import Header from "../components/Header";
import Login from "../components/Login";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-tr from-basicLight via-basic to-basicDark bg-fixed bg-no-repeat bg-cover min-h-screen min-w-screen">
        <Header />
        <Login />
      </div>
    </>
  );
}
