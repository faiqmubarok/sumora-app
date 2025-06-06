import { DialogProvider } from "@/components/dialog";
import { ToastProvider } from "@/components/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const TanstackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <DialogProvider>{children}</DialogProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};
