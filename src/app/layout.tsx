import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Pokemon Lookup',
  description: 'Search and view Pokemon information',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <NavBar />
        </div>
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
