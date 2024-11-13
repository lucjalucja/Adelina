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
        { rel: "icon", type: "image/png", href: "/android-chrome-192x192.png", sizes: "192x192" },
        { rel: "icon", type: "image/ico", href: "/favicon.ico"}, // Added the 192x192 size
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
    manifest: "/site.webmanifest",
};

export const googleSiteVerificationMeta = (
    <meta name="google-site-verification" content="7DbiUN4wteiczj-rHDDrjb7cLQizFlOfPclxyaKV3qg" />
);

// Export metadata separately for title and description only
export const metadata = {
    title: "Adelina Interiors | Projektant wnętrz | Aranżacja | Gdańsk, Trójmiasto",
    description:"Profesjonalne projektowanie wnętrz w Gdańsku i Trójmieście. Nowoczesne, stylowe aranżacje mieszkań, domów i przestrzeni komercyjnych.",
    keywords: `projektant wnętrz Gdańsk, architekt wnętrz Gdańsk, aranżacja wnętrz Gdańsk, projektowanie wnętrz Gdańsk, projektant wnętrz Trójmiasto, architekt wnętrz Trójmiasto, aranżacja wnętrz Trójmiasto, projektowanie wnętrz Trójmiasto`,
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: "https://www.adelina-interiors.co",
        siteName: "Adelina Interiors",
        title: "Adelina Interiors",
        description: "Kompleksowe usługi architektoniczne w Gdańsku.",
        images: [
            {
                url: "https://www.adelina-interiors.co/project1.jpeg", // Absolute URL for Open Graph image
                width: 1200,
                height: 630,
                alt: "Adelina Interiors Gdańsk - Projekt przykładowy",
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
        <head>
            {/* Google Site Verification Meta Tag */}
            {googleSiteVerificationMeta}
            {/* Render icons directly in the <head> to ensure compatibility */}
            {icons.icon.map((iconProps, index) => (
                <link key={index} {...iconProps} />
            ))}
            <link rel="apple-touch-icon" href={icons.apple} />
            <link rel="manifest" href={icons.manifest} />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content={metadata.openGraph.type} />
            <meta property="og:locale" content={metadata.openGraph.locale} />
            <meta property="og:url" content={metadata.openGraph.url} />
            <meta property="og:site_name" content={metadata.openGraph.siteName} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta property="og:description" content={metadata.openGraph.description} />
            <meta property="og:image" content={metadata.openGraph.images[0].url} />
            <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
            <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
            <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
