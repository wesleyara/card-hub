import "~/styles/globals.scss";
import "~/styles/typography.scss";
import { Header } from "~/components";
import { Toaster } from "~/components/ui/toaster";
import { AuthProvider } from "~/context/AuthContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
}
