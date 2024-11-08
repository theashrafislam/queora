import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Metadata } from 'next';
import Navbar from "./Components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
});

export const metadata = {
  title: "Queora - Share and Grow Knowledge",
  description: "Queora is a platform to share knowledge and learn from the community.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} font-serif antialiased w-full`}>
        <nav className="border-b-2 w-full shadow-sm">
          <Navbar />
        </nav>
        <main className="w-full">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}