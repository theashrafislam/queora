import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Metadata } from 'next';
import Navbar from "./Components/Navbar/Navbar";

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
      <body className={`${libreBaskerville.variable} font-serif antialiased max-w-7xl mx-auto`}>
        <nav>
          <Navbar />
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}