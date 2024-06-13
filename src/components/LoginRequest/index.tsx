import { useRouter } from "next/router";

export const LoginRequest = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <h2>Por favor realize o login para visualizar essa página!</h2>
      <button className="btn-secondary" onClick={() => router.push("/login")}>
        Realizar login
      </button>
    </div>
  );
};
