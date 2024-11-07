// pages/index.js

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
    // Define meta tags for social preview
    const SEO = {
        title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz - Adelina Interiors",
        description:
            "Profesjonalne usługi architekta wnętrz w Gdańsku. Tworzę unikalne i funkcjonalne projekty wnętrz dostosowane do potrzeb klientów.",
        url: "https://www.adelina-interiors.co",
        image: "https://www.adelina-interiors.co/path-to-your-preview-image.jpg",
    };

    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>{SEO.title}</title>
                <meta name="description" content={SEO.description} />

                {/* Open Graph / Facebook Meta Tags */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={SEO.url} />
                <meta property="og:title" content={SEO.title} />
                <meta property="og:description" content={SEO.description} />
                <meta property="og:image" content={SEO.image} />
                <meta property="og:site_name" content="Adelina Interiors" />
                <meta property="og:locale" content="pl_PL" />

            </Head>

            {/* Page Content */}
            <div className="min-h-screen flex flex-col relative">
                <header className="flex justify-between items-center p-4 header-shadow">
                    <div className="p-1">
                        <Image src="/logo.png" alt="Logo" width={30} height={30} />
                    </div>
                </header>

                {/* Main Content */}
                <section className="py-16">
                    <h1 className="text-5xl font-light text-center">ADELINA INTERIORS</h1>
                    <p className="mt-4 text-lg text-center">Tworzę wnętrza, które łączą styl i funkcjonalność.</p>

                </section>
            </div>
        </>
    );
}



const SEO = {
    title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz",
    description: "Profesjonalne usługi architekta wnętrz w Gdańsku. Tworzę unikalne i funkcjonalne projekty wnętrz dostosowane do potrzeb klientów.",
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: "https://www.adelina-interiors.co",
        site_name: "Adelina Interiors",
        title: "Architekt wnętrz Gdańsk | Projektowanie wnętrz",
        description: "Kompleksowe usługi architektoniczne w Gdańsku. Skontaktuj się, aby stworzyć swoje wymarzone wnętrze!",
        images: [
            {
                src: "project1.jpeg",
                width: 1200,
                height: 630,
                alt: "Adelina Interiors Gdańsk - Projekt przykładowy",
            },
        ],
    },
};


export default function Home() {
    const projects = [
        { src: "/project1.jpeg", title: "Mieszkanie 42 m²", description: "Zmiana układu funkcjonalnego, całkowita rearanżacja wnętrza" },
        { src: "/project2.png", title: "Salon 45m²", description: "Stan deweloperski, kompleksowy projekt całego domu" },
        { src: "/project3.jpg", title: "Łazienka 5m²", description: "Na parterze dla gości, kompleksowy projekt" },
        { src: "/project4.jpg", title: "Sypialnia 18 m²", description: "Sypialnia w jasnych barwach, kompleksowy projekt" },
    ];

    // Smooth Scroll Handlers without URL change
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false); // Close menu on mobile
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openModal = (index) => {
        setActiveImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Header Section */}
            <header className="flex justify-between items-center p-4 header-shadow">
                <div className="p-1">
                    <Image src="/logo.png" alt="Logo" width={30} height={30}/>
                </div>

                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>

                {/* Overlay Menu for Mobile */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white text-lg space-y-6">
                        <button className="text-3xl absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>×
                        </button>
                        <button onClick={() => scrollToSection("projects")} className="hover:text-gray-300">Projekty
                        </button>
                        <button onClick={() => scrollToSection("about")} className="hover:text-gray-300">O mnie</button>
                        <button onClick={() => scrollToSection("offer")} className="hover:text-gray-300">Oferta</button>
                        <button onClick={() => scrollToSection("contact")} className="hover:text-gray-300">Kontakt
                        </button>
                    </div>
                )}

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:items-center text-black text-sm font-medium space-x-6">
                    <button onClick={() => scrollToSection("projects")} className="hover:text-gray-900">Projekty
                    </button>
                    <button onClick={() => scrollToSection("about")} className="hover:text-gray-900">O mnie</button>
                    <button onClick={() => scrollToSection("offer")} className="hover:text-gray-900">Oferta</button>
                    <button onClick={() => scrollToSection("contact")} className="hover:text-gray-900">Kontakt</button>
                </nav>

            </header>

            {/* Hero Section */}
            <section id='hero'
                     className="relative h-[60vh] flex flex-col items-center justify-center bg-gray-100 mb-16">
                <Image src="/hero.png" alt="Interior" layout="fill" objectFit="cover" className="opacity-100"/>
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative flex flex-col items-center text-white z-10">
                    <Image src="/logo_light.png" alt="Logo" width={105} height={116}/>
                    <h1 className="text-5xl font-thin tracking-wider mt-4">ADELINA INTERIORS</h1>
                    <p className="mt-4 text-lg text-center">Podziel się swoją wizją – pomogę Ci ją zrealizować!</p>

                    {/* Call-to-Action Button */}
                    <a id = 'button'
                        href="tel:+48504381057"
                        className="mt-6 px-6 py-3  text-white font-semibold rounded-full shadow-lg transition-all duration-200"
                    >
                        Zadzwoń teraz: +48 504 381 057
                    </a>

                    {/* Optional Link to Kontakt Section */}
                    <a
                        href="#contact"
                        className="mt-2 text-sm text-gray-200 hover:underline"
                    >
                        Lub napisz do mnie
                    </a>
                </div>
            </section>


            {/* Projects Section (Responsive Masonry Grid Layout) */}
            <section id="projects" className="py-16 px-4">
                <h2 className="text-3xl font-extralight mb-8 text-center">Zrealizowane projekty</h2>
                <div className="px-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="cursor-pointer group overflow-hidden"
                             onClick={() => openModal(index)}>
                            <div className="relative h-72 w-full">
                                <Image
                                    src={project.src}
                                    alt={project.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transform transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-lg px-6 pt-4 pb-2 font-semibold mt-2">{project.title}</h3>
                            <p className="text-sm px-6 pb-8 text-gray-500">{project.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="offer" className="pt-16 pb-20 px-6">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Oferta</h2>
                    <p className="text-lg mb-10 text-left">
                        Kompleksowy projekt wnętrz obejmuje pełen zakres usług, od wstępnych pomiarów po finalne
                        dokumentacje techniczne, zapewniając estetyczne i funkcjonalne przestrzenie.
                    </p>
                    <div className="grid gap-12 md:gap-8 md:grid-cols-2">

                        {/* Step 1: Inwentaryzacja */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">1</div>
                            <div>
                                <h3 className="text-xl font-semibold">Inwentaryzacja</h3>
                                <p className="text-gray-700 mt-1">
                                    Precyzyjne pomiary przestrzeni, stanowiące solidną podstawę do tworzenia dokładnych
                                    i realistycznych projektów.
                                </p>
                            </div>
                        </div>

                        {/* Step 2: Projekt Koncepcyjny */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">2</div>
                            <div>
                                <h3 className="text-xl font-semibold">Projekt Koncepcyjny</h3>
                                <p className="text-gray-700 mt-1">
                                    Przedstawiam układ pomieszczeń z propozycjami ścian działowych, mebli i
                                    sanitariatów, a następnie opracowujemy ostateczną koncepcję.
                                </p>
                            </div>
                        </div>

                        {/* Step 3: Wizualizacje */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">3</div>
                            <div>
                                <h3 className="text-xl font-semibold">Wizualizacje</h3>
                                <p className="text-gray-700 mt-1">
                                    Fotorealistyczne wizualizacje wnętrz, oddające zaprojektowane elementy i
                                    umożliwiające zobaczenie przyszłego efektu.
                                </p>
                            </div>
                        </div>

                        {/* Step 4: Wykaz materiałów i mebli */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">4</div>
                            <div>
                                <h3 className="text-xl font-semibold">Wykaz materiałów i mebli</h3>
                                <p className="text-gray-700 mt-1">
                                    Zestawienie materiałów i wyposażenia z nazwami, adresami sklepów i ilościami, co
                                    ułatwia proces zakupu i pozwala kontrolować koszty.
                                </p>
                            </div>
                        </div>

                        {/* Step 5: Przygotowywanie zamówień */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">5</div>
                            <div>
                                <h3 className="text-xl font-semibold">Przygotowywanie zamówień</h3>
                                <p className="text-gray-700 mt-1">
                                    Pomoc w zamówieniach u sprawdzonych dostawców, zapewniając pełne wsparcie i kontakt
                                    w celu ułatwienia zakupów.
                                </p>
                            </div>
                        </div>

                        {/* Step 6: Dokumentacja techniczna */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">6</div>
                            <div>
                                <h3 className="text-xl font-semibold">Dokumentacja techniczna</h3>
                                <p className="text-gray-700 mt-1">
                                    Kompleksowa dokumentacja projektowa, zawierająca szczegółowe rysunki techniczne dla
                                    wykonawców, zgodne z wizją klienta.
                                </p>
                            </div>
                        </div>

                        {/* Step 7: Wycena prac wykończeniowych */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">7</div>
                            <div>
                                <h3 className="text-xl font-semibold">Wycena prac wykończeniowych</h3>
                                <p className="text-gray-700 mt-1">
                                    Na życzenie klienta oferuję wycenę prac wykończeniowych u zaufanych ekip
                                    budowlanych, zapewniając najwyższą jakość realizacji.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* About Section */}
            <section id="about" className="py-0 bg-white flex flex-col md:flex-row">
                <div className="md:w-1/3 h-80 relative overflow-hidden">
                    <Image src="/profile.jpg" alt="Adelina" layout="fill" objectFit="cover" className="rounded-l-lg"/>
                </div>
                <div className="md:w-1/2 flex items-center justify-center p-6">
                    <div>
                        <h2 className="text-3xl font-extralight mb-4">O mnie</h2>
                        <p className="text-lg">
                            Tworzę wnętrza łączące styl i funkcjonalność, dostosowane do Twoich potrzeb. Specjalizuję
                            się w projektach mieszkań, domów i przestrzeni komercyjnych, zapewniając pełną dokumentację
                            techniczną i kosztorysy.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 px-6 pt-28 flex flex-col items-center bg-gray-100">
                <h2 className="text-3xl font-extralight mb-4">Kontakt</h2>
                <p className="text-lg mb-4">Umów się na bezpłatną konsultację :)</p>
                <div className="text-lg mb-4 text-center">
                    <p>Email: <a href="mailto:adelina.drabot@gmail.com"
                                 className="text-blue-500 hover:underline">adelina.drabot@gmail.com</a></p>
                    <p>Telefon: <a href="tel:+48504381057" className="text-blue-500 hover:underline">+48 504 381 057</a>
                    </p>
                    <p>Instagram: <a href="https://www.instagram.com/adelina.interiors/" target="_blank"
                                     rel="noopener noreferrer"
                                     className="text-blue-500 hover:underline">@adelina.interiors</a></p>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-8 flex flex-col items-center text-gray-950 text-sm">
                <div>
                    <Image src="/logo.png" alt="Footer Logo" width={30} height={30}/>
                </div>
                <p className="mt-4 text-gray-950">© 2024 Adelina Interiors. All rights reserved.</p>
            </footer>

            {/* Project Detail Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-4xl mx-4 bg-white p-6 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="absolute top-4 right-4 text-gray-700 text-2xl" onClick={closeModal}>×
                        </button>
                        <Image
                            src={projects[activeImageIndex].src}
                            alt={projects[activeImageIndex].title}
                            layout="responsive"
                            width={1600}
                            height={900}
                            className="rounded-lg"
                        />
                        <h3 className="text-xl font-extralight pb-2 mt-4">{projects[activeImageIndex].title}</h3>
                        <p className="text-gray-600 pb-6 mt-2">{projects[activeImageIndex].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
