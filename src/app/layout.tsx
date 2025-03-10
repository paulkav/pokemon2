// import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
      <body className={`m-0 p-0`}>
        <div className="relative z-10">
          <NavBar />
        </div>
        <main className="relative z-1">
          {children}
        </main>
      </body>
    </html>
  );
}
