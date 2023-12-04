import { Providers } from "./Providers";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Head from "next/head";
import { GiBullHorns } from "react-icons/gi";

<Head>
  <link rel="icon" href={GiBullHorns} />
</Head>;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}