import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HuilesVak - E-commerce",
    description: "Site de vente en ligne d'huiles de graines germées",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <NextSSRPlugin
                    routerConfig={extractRouterConfig(ourFileRouter)}
                />
                <ToastContainer position="bottom-left" autoClose={2000} />
                {children}
            </body>
        </html>
    );
}
