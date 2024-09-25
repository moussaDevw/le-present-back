"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppContextProvider } from "@/hooks/context/useContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="bg-[#F8F7FC] dark:bg-boxdark-2 dark:text-bodydark">
          <QueryClientProvider client={queryClient}>
            <AppContextProvider>
              {loading ? <Loader /> : children}
              <ReactQueryDevtools initialIsOpen={false} />
            </AppContextProvider>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
