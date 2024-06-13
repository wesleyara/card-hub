import { useRouter } from "next/router";

export const LoginRequest = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-center">
        Por favor realize o login para visualizar essa página!
      </h2>
      <button
        className="btn-secondary max-w-[400px]"
        onClick={() => router.push("/login")}
      >
        Realizar login
      </button>
    </div>
  );
};
