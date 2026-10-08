import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

// React Query is ready for when sections start loading data from an API.
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 60, refetchOnWindowFocus: false } },
});

const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="site-theme">
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ThemeProvider>
);

export default Providers;
