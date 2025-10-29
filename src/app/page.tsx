// app/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import { useState } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";


import '../styles/home.css';
import '../styles/cards.css';


export default function HomePage() {
    // Mock project data (replace with real API later)
    const projects = Array(6).fill({
        category: 'Framing',
        location: 'Whittier, CA',
        description: `Looking for a licensed painter to complete full interior repainting of a 2,000 sq ft office. Includes two coats of primer and final flat finish.`,
        timeAgo: '23 mins ago'
    });

    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const toggleExpand = (id: number) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCards(newExpanded);
    };

    // Slick slider settings (exactly as you provided)
    const sliderSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 600,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div>
            <Header />
            <div className="sections overflow-hidden">
                {/* Banner Section */}
                <section
                    className="home-banner-sec"
                    style={{
                        backgroundImage: `url('/assets/img/home-banner-img.webp')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="container">
                        <div className="banner-wrapper">
                            <div className="content-wrapper">
                                <h1 className="main-title text-white text-center mb-4">
                                    Real Subs. Real Work. Real Results.
                                </h1>
                                <div className="main-wrapper mx-auto" style={{maxWidth: '876px'}}>
                                    <div className="buttons d-flex flex-wrap justify-content-center gap-3 mb-4">
                                        <Link href="/post-project" className="btn btn-primary rounded-3">
                                            <span>Post a Project</span>
                                            <Image
                                                src="/assets/img/icons/arrow-white.svg"
                                                width={12}
                                                height={14}
                                                alt="Arrow"
                                                style={{filter: 'invert(1)'}}
                                            />
                                        </Link>
                                        <Link href="/join-subcontractor" className="btn bg-dark rounded-3">
                                            <span className="text-white">Join as Subcontractor</span>
                                            <Image
                                                src="/assets/img/icons/arrow-white.svg"
                                                width={12}
                                                height={14}
                                                alt="Arrow"
                                            />
                                        </Link>
                                        <Link href="/affiliate" className="btn bg-white rounded-3">
                                            <span>Be an Affiliate</span>
                                            <Image
                                                src="/assets/img/icons/arrow-white.svg"
                                                width={12}
                                                height={14}
                                                alt="Arrow"
                                                style={{filter: 'invert(1)'}}
                                            />
                                        </Link>
                                    </div>
                                    <Link href="/trial" className="notice-button d-flex justify-content-center">
                                        No credit card required enjoy a free 30-day trial.
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="project-sec py-5">
                    <div className="container">
                        <div className="content-wrappper mb-5 text-center">
                            <Link href="/projects" className="btn btn-outline-dark mx-auto mb-4">
                                PROJECTS
                            </Link>
                            <h2 className="main-title">Explore real projects posted by top general contractors</h2>
                        </div>

                        {/* ✅ Slick Slider */}
                        <div className="main-card-slide">
                            <Slider {...sliderSettings}>
                                {projects.map((project, index) => (
                                    <div key={index} className="px-2">
                                        <div className="custom-card">
                                            <div
                                                className="topbar d-flex align-items-center justify-content-between gap-1 flex-wrap mb-3">
                                                <Link href={`/projects?category=${project.category.toLowerCase()}`}
                                                      className="btn btn-primary">
                                                    {project.category}
                                                </Link>
                                                <div className="date text-primary-gray-light">{project.timeAgo}</div>
                                            </div>
                                            <div className="title text-black fs-5 fw-semibold mb-3">
                                                {project.location}
                                            </div>
                                            <div className="description">
                                                {expandedCards.has(index)
                                                    ? project.description.repeat(5)
                                                    : `${project.description.substring(0, 150)}...`}
                                            </div>
                                            <button
                                                className="see-more-btn btn btn-link p-0"
                                                // onclick={() => toggleExpand(index)}
                                            >
                                                {expandedCards.has(index) ? 'See less' : 'See more'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {/* Pagination & See All */}
                        <div className="buttons d-flex align-items-center justify-content-between gap-2 flex-wrap mt-5">
                            {/* Optional: Add custom dots if needed */}
                            <div className="custom-pagination d-flex align-items-center justify-content-center gap-2">
                                {/* You can add manual dots here if using custom pagination */}
                            </div>
                            <Link href="/all-projects" className="btn bg-dark rounded-3">
                                <span className="text-white">See All</span>
                                <Image
                                    src="/assets/img/icons/arrow-white.svg"
                                    width={12}
                                    height={14}
                                    alt="Arrow"
                                    className="d-block"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}