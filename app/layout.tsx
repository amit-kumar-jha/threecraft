import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import { Header } from "@/component/Header";
import { Footer } from "@/component/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ThreeCraft",
  description: "A beautiful 3D & code playground",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      >
        <ThemeProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "white",
                color: "black",
                border: "1px solid #4f46e5",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                height: "36px",
              },
              className: "animate-toast-slide",
            }}
          />
          <Header />
          <main className="min-h-[80vh] px-4 md:px-12 py-6">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
