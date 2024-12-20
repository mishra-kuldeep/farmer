"use client";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/component/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, useEffect } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Footer from "@/component/header/Footer";

const inter = Inter({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const router = usePathname();
  const isAdminRoute = router.startsWith("/admin");
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
     <body className={`${inter.className} ${robotoSlab.className}`} >

      <Suspense>
        <Provider store={store}>
          {!isAdminRoute && <Header />}
          <div className={`${!isAdminRoute && "marginEveryPage"}`}>
            {children}
          </div>
          {!isAdminRoute && <Footer />}
          <Toaster  position="bottom-center"/>
        </Provider>
        </Suspense>
      </body>
    </html>
  );
}
