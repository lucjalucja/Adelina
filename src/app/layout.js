// layout.js

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz - Adelina Interiors",
    description: "Profesjonalne usługi architekta wnętrz w Gdańsku. Tworzę unikalne i funkcjonalne projekty wnętrz dostosowane do potrzeb klientów.",

    // Setting only a single favicon path without an array
    icons: "/favicon.ico",  // Use a single icon as a shortcut icon

    // Other metadata (Open Graph, Twitter, etc.)
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: "https://www.adelina-interiors.co",
        siteName: "Adelina Interiors",
        title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz",
        description: "Kompleksowe usługi architektoniczne w Gdańsku. Skontaktuj się, aby stworzyć swoje wymarzone wnętrze!",
        images: [
            {
                url: "https://www.adelina-interiors.co/project1.jpeg", // Ensure absolute URL for Open Graph image
                width: 1200,
                height: 630,
                alt: "Adelina Interiors Gdańsk - Projekt przykładowy",
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
