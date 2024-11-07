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

// Define icons separately in a constant
const icons = {
    icon: [
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
    manifest: "/site.webmanifest",
};

// Export metadata separately for title and description only
export const metadata = {
    title: "Adelina Interiors",
    description: "Profesjonalne usługi architekta wnętrz w Gdańsku. Unikalne i dunkcjonalne projekty wnętrz dostosowane do potrzeb klientów.",

    // Open Graph metadata (as before)
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: "https://www.adelina-interiors.co",
        siteName: "Adelina Interiors",
        title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz",
        description: "Profesjonalne usługi architekta wnętrz w Gdańsku. Skontaktuj się, aby stworzyć swoje wymarzone wnętrze!",
        images: [
            {
                url: "https://www.adelina-interiors.co/project1.jpeg", // Absolute URL for OG image
                width: 1200,
                height: 630,
                alt: "Adelina Interiors Gdańsk - Projekt przykładowy",
            },
        ],
    },
    // Twitter metadata if needed
    twitter: {
        card: "summary_large_image",
        site: "@adelina_interiors",
        title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz - Adelina Interiors",
        description: "Profesjonalne usługi architekta wnętrz w Gdańsku.",
        images: ["https://www.adelina-interiors.co/project1.jpeg"],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            {/* Render icons directly in the <head> to ensure compatibility */}
            {icons.icon.map((iconProps, index) => (
                <link key={index} {...iconProps} />
            ))}
            <link rel="apple-touch-icon" href={icons.apple} />
            <link rel="manifest" href={icons.manifest} />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
