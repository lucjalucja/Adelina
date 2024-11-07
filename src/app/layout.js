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

const metadata = {
    title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz - Adelina Interiors",
    description: "Profesjonalne usługi architekta wnętrz w Gdańsku. Tworzę unikalne i funkcjonalne projekty wnętrz dostosowane do potrzeb klientów.",

    // Favicons and icons
    icons: {
        icon: [
            {rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96"},
            {rel: "icon", type: "image/svg+xml", href: "/favicon.svg"},
            {rel: "shortcut icon", href: "/favicon.ico"},
        ],
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",

    // Apple mobile web app title
    appleWebApp: {
        title: "Adelina Interiors",
    },


    // Open Graph metadata for social media preview
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: "https://www.adelina-interiors.co",
        siteName: "Adelina Interiors",
        title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz",
        description: "Kompleksowe usługi architektoniczne w Gdańsku. Skontaktuj się, aby stworzyć swoje wymarzone wnętrze!",
        images: [
            {
                url: "project1.jpeg",
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
