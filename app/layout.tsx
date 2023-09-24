import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
import { Footer, Header } from "@/components";

export const metadata: Metadata = {
  title: "Leave Days",
  description: "Employess must stay on course.",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        style={roboto.style}
        className="flex flex-col min-h-screen items-center"
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
