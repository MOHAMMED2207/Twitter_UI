import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./util/Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Twitter",
  description:
    "Twitter is a social media platform that allows users to write and post short messages, known as tweets, of up to 280 characters. Users can follow each other, allowing them to see the tweets of the people they follow on their homepage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png" />
      </head>
      <body className={inter.className}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
