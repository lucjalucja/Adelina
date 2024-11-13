"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Analytics } from "@vercel/analytics/react"
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useSwipeable } from 'react-swipeable';




export default function Home() {

    const projects = [
        {
            title: "Mieszkanie Kartuska 32 m²",
            description: "Zmiana układu funkcjonalnego, całkowita rearanżacja wnętrza",
            images: ["/project1.jpeg", "/project1-2.jpg", "/project1-3.jpg","/project1-4.jpg", "/project1-5.jpg", "/project1-6.jpg", "/project1-7.jpg"]
        },
        {
            title: "Dom Bojano 120m²",
            description: "Stan deweloperski, kompleksowy projekt domu",
            images : ["/project2.jpg", ...Array.from({ length: 14 }, (_, i) => `/project2-${i + 2}.jpg`)]
        },
        {
            title: "Apartament Sol Marina 60m²",
            description: "Stan deweloperski, kompleksowy projekt mieszkania inspriowany Hampton",
            images : ["/project3.jpg", ...Array.from({ length: 4 }, (_, i) => `/project3-${i + 1}.jpg`)]
        },
        {
            title: "Mieszkanie Srebrniki 38m²",
            description: "Stan deweloperski, mieszkanie w jasnych barwach, kompleksowy projekt",
            images: ["/project4.jpg", ...Array.from({ length: 5 }, (_, i) => `/project4-${i}.jpg`)]
        },
    ]
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = ''; // Clean up on unmount
        };
    }, [isModalOpen]);

    const openModal = (project) => {
        setActiveProject(project);
        setActiveImageIndex(0);
        setIsModalOpen(true);
    };

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setActiveProject(null);
    }, []);

    const nextImage = useCallback(() => {
        if (activeProject) {
            setActiveImageIndex((prevIndex) =>
                (prevIndex + 1) % activeProject.images.length
            );
        }
    }, [activeProject]);

    const prevImage = useCallback(() => {
        if (activeProject) {
            setActiveImageIndex((prevIndex) =>
                (prevIndex - 1 + activeProject.images.length) % activeProject.images.length
            );
        }
    }, [activeProject]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: nextImage,
        onSwipedRight: prevImage,
        preventDefaultTouchmoveEvent: true,
        trackTouch: true
    });



    // Internal AboutSection component
    const AboutSection = () => {
        useEffect(() => {
            const script = document.createElement("script");
            script.src = "https://static.elfsight.com/platform/platform.js";
            script.async = true;
            document.body.appendChild(script);

            // Clean up the script when the component unmounts
            return () => {
                document.body.removeChild(script);
            };
        }, []);

        return (
            <section id="about" className="py-16 bg-white flex flex-col items-center">
                <div className="flex flex-col md:flex-row md:w-2/3">
                    {/* Profile Picture on the Left */}
                    <div className="md:w-1/3 h-80 relative overflow-hidden">
                        <Image src="/profile.jpg" alt="Adelina" layout="fill" objectFit="cover"
                               className="rounded-lg"/>
                    </div>

                    {/* Text Content on the Right */}
                    <div className="md:w-2/3 flex flex-col items-center md:items-start justify-center p-6 space-y-6">
                        <div>
                            <h2 className="text-3xl font-light mb-4">O mnie</h2>
                            <p className="text-lg text-gray-600">
                                Tworzę wnętrza, które łączą styl i funkcjonalność, skrojone pod Ciebie. Specjalizuję się
                                w
                                projektach mieszkań, domów i przestrzeni komercyjnych – od koncepcji aż po pełną
                                dokumentację i przejrzyste kosztorysy. Wszystko, czego potrzebujesz, by Twoja przestrzeń
                                była nie tylko piękna, ale i wygodna.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Elfsight Reviews Widget Positioned Below Entire Section */}
                <div className="w-full mt-8 flex justify-center">
                    <div className="elfsight-app-5ec524fd-64a3-4cb6-aba7-485d6b227683 w-full md:w-2/3"
                         data-elfsight-app-lazy="true"></div>
                </div>
            </section>


        );
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Header Section */}
            <header className="flex justify-between items-center px-6 py-2 bg-white shadow-md fixed w-full z-50">
                <div className="p-1 cursor-pointer">
                    {/* Logo with click to scroll to hero */}
                    <Image src="/logo.png" alt="Logo" width={35} height={35} onClick={() => scrollToSection("hero")}/>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    ☰
                </button>

                {/* Overlay Menu for Mobile */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white text-lg space-y-12 transition-transform duration-500 ease-in-out transform translate-x-0"
                        onClick={() => setIsMenuOpen(false)} // Close menu when clicking outside
                    >
                        <button
                            className="text-3xl absolute top-8 right-8 focus:outline-none transition-transform duration-300 transform hover:scale-125"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent closing when clicking the close button
                                setIsMenuOpen(false);
                            }}
                        >
                            ×
                        </button>

                        {/* Instagram Icon */}
                        <a
                            href="https://www.instagram.com/adelina.interiors" // Replace with your Instagram URL
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Prevent overlaynpm i @vercel/analytics close on icon click
                            className="text-5xl mb-4" // Set icon size and add some margin below
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>

                        {["projekty", "o mnie", "oferta", "kontakt"].map((section, index) => (
                            <button
                                key={section}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent closing when clicking on buttons
                                    const sectionIds = ["projects", "about", "offer", "contact"];
                                    scrollToSection(sectionIds[index]);
                                    setIsMenuOpen(false); // Close the menu after navigation
                                }}
                                className="capitalize text-3xl tracking-wider transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-300"
                            >
                                {section}
                            </button>
                        ))}
                    </div>
                )}



                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:items-center text-gray-700 text-base font-medium space-x-8">
                    {["projekty", "o mnie", "oferta", "kontakt"].map((section, index) => (
                        <button
                            key={section}
                            onClick={() => {
                                const sectionIds = ["projects", "about", "offer", "contact"];
                                scrollToSection(sectionIds[index]);
                            }}
                            className="capitalize relative pb-1 hover:text-gray-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            {section}
                            <span className="block w-full h-[2px] bg-transparent hover:bg-gray-900 absolute bottom-0 left-0 transition-all duration-200 ease-in-out"></span>
                        </button>
                    ))}
                </nav>
            </header>

            {/* Hero Section */}
            <section id="hero" className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="text-3xl text-white font-normal mt-4">ADELINA INTERIORS</h1>
                    <p className="text-lg text-white font-light mt-2">Estetyka i komfort w idealnych proporcjach.</p>
                    <p className="text-lg text-white font-light "> Wnętrza, które odpowiadają na potrzeby codziennego
                        życia.</p>
                    <button onClick={() => scrollToSection('contact')}
                            className="mt-6 px-6 py-2 font-semibold border text-white border-white rounded-md hover:bg-white hover:text-gray-900">
                        Skontaktuj się
                    </button>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-16 px-4 bg-white">
                <h2 className="text-3xl font-light mb-8 text-center">Zrealizowane projekty</h2>
                <div className="px-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="cursor-pointer group overflow-hidden"
                             onClick={() => openModal(project)}>
                            <div className="relative h-72 w-full">
                                <Image src={project.images[0]} alt={project.title} layout="fill" objectFit="cover"
                                       className="transform transition-transform duration-300 group-hover:scale-105"/>
                            </div>
                            <h3 className="text-lg px-6 pt-4 pb-2 font-light mt-2">{project.title}</h3>
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
            <AboutSection />

            {/* Contact Section */}
            <section id="contact" className="py-16 px-6 flex flex-col items-center bg-gray-100">
                <h2 className="text-3xl font-light mb-4 text-gray-900">Kontakt</h2>
                <p className="text-lg mb-4 text-gray-700 text-center">Umów się na niezobowiązującą wycenę</p>
                <div className="text-lg mb-4 text-center">
                    <p>Email: <a href="mailto:adelina.drabot@gmail.com" className="text-pink-500 hover:underline">adelina.drabot@gmail.com</a></p>
                    <p>Telefon: <a href="tel:+48504381057" className="text-pink-500 hover:underline">+48 504 381 057</a></p>
                    <p>Instagram: <a href="https://www.instagram.com/adelina.interiors/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">@adelina.interiors</a></p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 flex flex-col items-center text-gray-700 text-sm">
                <Image src="/logo.png" alt="Footer Logo" width={30} height={30} />
                <p className="mt-4 text-gray-700">© 2024 Adelina Interiors. All rights reserved.</p>
            </footer>

            {/* Project Detail Modal */}
            {isModalOpen && activeProject && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black bg-opacity-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-5xl mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-20 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg transform transition-transform duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
                            onClick={closeModal}
                        >
                            ×
                        </button>
                        <div
                            {...swipeHandlers}
                            className="relative w-full h-96 sm:h-[30rem] md:h-[36rem] lg:h-[40rem]"
                        >
                            <Image
                                src={activeProject.images[activeImageIndex]}
                                alt={activeProject.title}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                            />
                            <button
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                            >
                                &#10094;
                            </button>
                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                            >
                                &#10095;
                            </button>
                        </div>
                        <div className="flex justify-center mt-4">
                            {activeProject.images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 mx-1 rounded-full ${
                                        index === activeImageIndex ? 'bg-gray-800' : 'bg-gray-300'
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex(index);
                                    }}
                                ></div>
                            ))}
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-2">{activeProject.title}</h3>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6">{activeProject.description}</p>
                    </div>
                </div>
            )}

        </div>
    );
}
