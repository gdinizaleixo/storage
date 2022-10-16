import { useAuth } from "../hooks/useAuth";

export default function UserAdm() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <main className="flex justify-center text-white mt-20">
      <div>
        <section>
          <h1>User email: {user?.email}</h1>
        </section>
      </div>
    </main>
  );
}
