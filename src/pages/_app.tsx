import "~/styles/globals.scss";
import "~/styles/typography.scss";
import { AuthProvider } from "~/context/AuthContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
