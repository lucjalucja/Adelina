"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function Home() {
    const projects = [
        { src: "/project1.png", title: "Mieszkanie 42 m²", description: "Zmiana układu funkcjonalnego, całkowita zmiana wnętrza" },
        { src: "/project2.png", title: "Salon 45m²", description: "Stan deweloperski, kompleksowy projekt całego domu" },
        { src: "/project3.png", title: "Łazienka 5m²", description: "Łazienka na parterze dla gości, kompleksowy projekt" },
        { src: "/project4.png", title: "Sypialnia 18 m²", description: "Sypialnia z detalami Hampton" },
    ];

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const itemsPerView = isMobile ? 1 : 3; // Show one item on mobile, three on desktop
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isBouncing, setIsBouncing] = useState(false);
    const carouselRef = useRef(null);

    // Swiping functionality for touch devices
    const handleTouchStart = useRef(0);
    const handleTouchMove = useRef(0);

    const onTouchStart = (e) => (handleTouchStart.current = e.touches[0].clientX);
    const onTouchMove = (e) => (handleTouchMove.current = e.touches[0].clientX);
    const onTouchEnd = () => {
        const diff = handleTouchStart.current - handleTouchMove.current;
        if (diff > 50) goToNextSlide();
        else if (diff < -50) goToPrevSlide();
    };

    // Intersection Observer to trigger bounce animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsBouncing(true);
                    observer.disconnect();
                    setTimeout(() => setIsBouncing(false), 1000);
                }
            },
            { threshold: 0.5 }
        );

        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const goToNextSlide = () => {
        if (currentIndex < projects.length - itemsPerView) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const goToPrevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const openModal = (index) => {
        setActiveImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const nextImage = useCallback(() => {
        setActiveImageIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, [projects.length]);

    const prevImage = useCallback(() => {
        setActiveImageIndex((prevIndex) =>
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    }, [projects.length]);

    // Keyboard navigation and close modal with Esc
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isModalOpen) {
                if (event.key === "ArrowRight") nextImage();
                if (event.key === "ArrowLeft") prevImage();
                if (event.key === "Escape") closeModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen, nextImage, prevImage, closeModal]);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center p-4 header-shadow">
                <div className="p-1">
                    <Image src="/logo.png" alt="Logo" width={30} height={30} />
                </div>
                <nav className="flex-1 flex justify-center text-black text-sm font-medium space-x-6">
                    <a href="#projects" className="hover:text-gray-900">Projekty</a>
                    <a href="#about" className="hover:text-gray-900">O mnie</a>
                    <a href="#offer" className="hover:text-gray-900">Oferta</a>
                    <a href="#contact" className="hover:text-gray-900">Kontakt</a>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-gray-100">
                <Image src="/hero.png" alt="Interior" layout="fill" objectFit="cover" className="opacity-100" />
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative flex flex-col items-center text-white z-10">
                    <Image src="/logo_light.png" alt="Logo" width={105} height={116} />
                    <h1 className="text-5xl font-thin tracking-wider mt-4">ADELINA INTERIORS</h1>
                </div>
            </section>

            {/* Project Gallery Carousel */}
            <section
                id="projects"
                className="py-16 px-4 flex flex-col items-center bg-gray-100"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    ref={carouselRef}
                    className="relative max-w-screen-xl bg-white shadow-lg overflow-hidden p-4"
                >
                    <div
                        className={`flex transition-transform duration-300 ${isBouncing ? "animate-bounce-carousel" : ""}`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                        }}
                    >
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="p-2 flex-shrink-0"
                                style={{
                                    minWidth: `calc(100% / ${itemsPerView})`,
                                    minHeight: "400px"
                                }}
                                onClick={() => openModal(index)}
                            >
                                <div className="relative w-full h-[250px] overflow-hidden drop-shadow">
                                    <Image
                                        src={project.src}
                                        alt={project.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <h2 className="text-lg font-semibold mt-2 text-left">{project.title}</h2>
                                <p className="text-sm text-gray-500 text-left overflow-hidden" style={{ WebkitLineClamp: 2 }}>
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows Positioned Below the Carousel */}
                {!isMobile && (
                    <div className="flex justify-between w-full max-w-screen-xl mt-4 px-4">
                        {currentIndex > 0 ? (
                            <button onClick={goToPrevSlide} className="text-gray-700 text-4xl">
                                ←
                            </button>
                        ) : (
                            <span className="text-gray-300 text-4xl">←</span>
                        )}
                        {currentIndex < projects.length - itemsPerView ? (
                            <button onClick={goToNextSlide} className="text-gray-700 text-4xl">
                                →
                            </button>
                        ) : (
                            <span className="text-gray-300 text-4xl">→</span>
                        )}
                    </div>
                )}
            </section>

            {/* Fullscreen Modal for Project Images */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-4xl mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="absolute top-1 right-5 text-white text-4xl" onClick={closeModal}>×</button>
                        <Image
                            src={projects[activeImageIndex].src}
                            alt="Enlarged Project Image"
                            layout="responsive"
                            width={1600}
                            height={900}
                        />
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                        >
                            ←
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                        >
                            →
                        </button>
                    </div>
                </div>
            )}
            {/* Offer Section */}
            <section id="offer" className="py-16 px-6 pb-40">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-left">Oferta</h2>
                    <p className="text-lg mb-10 text-left">
                        Kompleksowy projekt wnętrz obejmuje pełen zakres usług, od wstępnych pomiarów po finalne dokumentacje techniczne, zapewniając estetyczne i funkcjonalne przestrzenie.
                    </p>
                    <div className="grid gap-12 md:gap-8 md:grid-cols-2">

                        {/* Step 1: Inwentaryzacja */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">1</div>
                            <div>
                                <h3 className="text-xl font-semibold">Inwentaryzacja</h3>
                                <p className="text-gray-700 mt-1">
                                    Precyzyjne pomiary przestrzeni, stanowiące solidną podstawę do tworzenia dokładnych i realistycznych projektów.
                                </p>
                            </div>
                        </div>

                        {/* Step 2: Projekt Koncepcyjny */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">2</div>
                            <div>
                                <h3 className="text-xl font-semibold">Projekt Koncepcyjny</h3>
                                <p className="text-gray-700 mt-1">
                                    Układ pomieszczeń z propozycjami ścian działowych, mebli i sanitariatów, a następnie opracowujemy ostateczną koncepcję.
                                </p>
                            </div>
                        </div>

                        {/* Step 3: Wizualizacje */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">3</div>
                            <div>
                                <h3 className="text-xl font-semibold">Wizualizacje</h3>
                                <p className="text-gray-700 mt-1">
                                    Fotorealistyczne wizualizacje wnętrz, oddające zaprojektowane elementy i umożliwiające zobaczenie przyszłego efektu.
                                </p>
                            </div>
                        </div>

                        {/* Step 4: Wykaz materiałów i mebli */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">4</div>
                            <div>
                                <h3 className="text-xl font-semibold">Wykaz materiałów i mebli</h3>
                                <p className="text-gray-700 mt-1">
                                    Zestawienie materiałów i wyposażenia z nazwami, adresami sklepów i ilościami, co ułatwia proces zakupu i pozwala kontrolować koszty.
                                </p>
                            </div>
                        </div>

                        {/* Step 5: Przygotowywanie zamówień */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">5</div>
                            <div>
                                <h3 className="text-xl font-semibold">Przygotowywanie zamówień</h3>
                                <p className="text-gray-700 mt-1">
                                    Pomoc w zamówieniach u sprawdzonych dostawców, zapewniając pełne wsparcie i kontakt w celu ułatwienia zakupów.
                                </p>
                            </div>
                        </div>

                        {/* Step 6: Dokumentacja techniczna */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">6</div>
                            <div>
                                <h3 className="text-xl font-semibold">Dokumentacja techniczna</h3>
                                <p className="text-gray-700 mt-1">
                                    Kompleksowa dokumentacja projektowa, zawierająca szczegółowe rysunki techniczne dla wykonawców, zgodne z wizją klienta.
                                </p>
                            </div>
                        </div>

                        {/* Step 7: Wycena prac wykończeniowych */}
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl font-bold text-red-900">7</div>
                            <div>
                                <h3 className="text-xl font-semibold">Wycena prac wykończeniowych</h3>
                                <p className="text-gray-700 mt-1">
                                    Na życzenie klienta oferuję wycenę prac wykończeniowych u zaufanych ekip budowlanych, zapewniając najwyższą jakość realizacji.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* O mnie Section */}
            <section id="about" className="py-0 bg-white flex flex-col md:flex-row">
                <div className="md:w-1/3 h-80 relative overflow-hidden">
                    <Image
                        src="/profile.jpg"
                        alt="Adelina"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-l-lg"
                    />
                </div>
                <div className="md:w-1/2 flex items-center justify-center p-6">
                    <div>
                        <h2 className="text-3xl font-extralight mb-4">O mnie</h2>
                        <p className="text-lg">
                            Tworzę wnętrza łączące styl i funkcjonalność, dostosowane do Twoich potrzeb. Specjalizuję się w projektach mieszkań, domów i przestrzeni komercyjnych, zapewniając pełną dokumentację techniczną i kosztorysy. Inspiruję się najnowszymi trendami, ale priorytetem są Twoje oczekiwania.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 px-6 pt-28 flex flex-col items-center bg-gray-100">
                <h2 className="text-3xl font-extralight mb-4">Kontakt</h2>
                <p className="text-lg mb-4">Umów się na bezpłatną konsultację :)</p>
                <div className="text-lg mb-4 text-center">
                    <p>Email: <a href="mailto:adelina.drabot@gmail.com" className="text-blue-500 hover:underline">adelina.drabot@gmail.com</a></p>
                    <p>Telefon: <a href="tel:+48504381057" className="text-blue-500 hover:underline">+48 504 381 057</a></p>
                    <p>Instagram: <a href="https://www.instagram.com/adelina.interiors/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@adelina.interiors</a></p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 flex flex-col items-center text-gray-950 text-sm">
                <div>
                    <Image src="/logo.png" alt="Footer Logo" width={30} height={30} />
                </div>
                <p className="mt-4 text-gray-950">© 2024 Adelina Interiors. All rights reserved.</p>
            </footer>

            {/* CSS for bounce animation */}
            <style jsx>{`
                @keyframes bounce-carousel {
                    0% {
                        transform: translateX(0);
                    }
                    30% {
                        transform: translateX(-15px);
                    }
                    60% {
                        transform: translateX(10px);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-bounce-carousel {
                    animation: bounce-carousel 1s ease;
                }

                .shadow-lg {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
}