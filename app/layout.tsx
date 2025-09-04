import { ToastContainer } from "react-toastify";
import { cn } from "@/utils/cn";

import "../styles/globals.css";
import { BackgroundDeco } from "@/components/background-deco/background-deco";
import { GNBBottomTab } from "@/components/gnb/gnb-bottom-tab";
import { Gnb } from "@/components/gnb/gnb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn("bg-backgroundBlueLight")}>
        <Gnb />
        {children}
        <GNBBottomTab />
        <BackgroundDeco currentSection={0} />
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
