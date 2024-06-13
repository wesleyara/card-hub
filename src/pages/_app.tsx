import "~/styles/globals.scss";
import "~/styles/typography.scss";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "~/components";
import { Toaster } from "~/components/ui/toaster";
import { MarketProvider } from "~/context";
import { AuthProvider } from "~/context/AuthContext";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AuthProvider>
          <MarketProvider>
            <Header />
            <Component {...pageProps} />
            <Toaster />
          </MarketProvider>
        </AuthProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
