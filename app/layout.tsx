import { ToastContainer } from "react-toastify";
import { cn } from "@/utils/cn";

import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn("bg-backgroundBlueLight")}>
        {children}
        <div id="portal1" className={cn("z-50")} />
        <div id="portal2" className={cn("z-50")} />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </body>
    </html>
  );
}
