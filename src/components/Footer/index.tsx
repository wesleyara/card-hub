export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="my-10 flex flex-col items-center justify-center gap-4 text-center">
      <span>© {year} Card Hub</span>
      <span>
        Criado por{" "}
        <a
          href="https://wesleyaraujo.dev/"
          target="_blank"
          className="text-plantation-800 hover:underline"
          rel="noreferrer"
        >
          Wesley Araujo
        </a>{" "}
        usando Next.
      </span>
    </footer>
  );
};
