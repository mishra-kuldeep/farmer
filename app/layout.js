// 'use client'
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from "@/component/header/Header";
// import Head from "next/head";
// import { useEffect } from "react";

// const inter = Inter({ subsets: ["latin"] });



// export default function RootLayout({ children }) {
//   useEffect(() => {
//     // Import Bootstrap JavaScript dynamically to prevent SSR issues
//     import('bootstrap/dist/js/bootstrap.bundle.min.js');
//   }, []);
//   return (
//     <html lang="en">
//       <Head>
//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700;800;900&display=swap"
//         />
//       </Head>
//       <body className={inter.className}>
//         <Header />
//         <div className="marginEveryPage">{children}</div>
//       </body>
//     </html>
//   );
// }


'use client';

import { Inter, Roboto_Slab } from 'next/font/google';
import "./globals.css";
import Header from "@/component/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { store } from '@/redux/store'; 
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], weights: ['400', '500', '600', '700', '800', '900'] });

export default function RootLayout({ children }) {
  const router = usePathname();
  const isAdminRoute = router.startsWith('/admin');
  useEffect(() => {
    // Import Bootstrap JavaScript dynamically to prevent SSR issues
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} ${robotoSlab.className}`}>
      
        <Provider store={store}>
       {!isAdminRoute&& <Header />}
        <div className={`${!isAdminRoute&& "marginEveryPage"}`}>{children}</div>
        <ToastContainer limit={1}/>
        </Provider>
      </body>
      
    </html>
  );
}
