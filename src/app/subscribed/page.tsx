'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function SubscribedPage() {
    return (
        <>
            <Header />

            <div className="sections overflow-hidden">
                {/* Banner Section */}
                <section className="banner-sec">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <Image
                                    src="/assets/img/dashboard-free-trial-img.webp"
                                    width={800}
                                    height={600}
                                    alt="Section Image"
                                    className="img-fluid w-100 h-100 object-fit-cover"
                                    style={{ borderRadius: "25px", boxShadow: "0 4px 35px 0 #00000025" }}
                                />
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="banner-wrapper"
                                    style={{ backgroundImage: "url('/assets/img/free-trial-img2.webp')" }}
                                >
                                    <div className="main-slider">
                                        {/* Slider Item 1 */}
                                        <div className="slider-item">
                                            <div className="topbar d-flex align-items-center gap-2 mb-3">
                                                <div className="icon">
                                                    <Image src="/assets/img/icons/camera.svg" width={14} height={10} alt="icon" />
                                                </div>
                                                <div style={{ fontSize: "14px" }} className="content text-white fw-medium">
                                                    Online Webinar
                                                </div>
                                            </div>
                                            <h2 className="main-title text-primary">50% Increase Sales</h2>
                                            <div className="desc fw-medium text-white mb-3">
                                                Present a professional estimate with your logo and company name and colors. Present a professional estimate with your logo and
                                                name and colors. Present a professional estimate with your logo and company name and colors. Present a professional estimate with
                                                your logo and company name and colors. Present a professional estimate with your logo and company name and colors.
                                            </div>
                                        </div>

                                        {/* Slider Item 2 */}
                                        <div className="slider-item">
                                            <div className="topbar d-flex align-items-center gap-2 mb-3">
                                                <div className="icon">
                                                    <Image src="/assets/img/icons/camera.svg" width={14} height={10} alt="icon" />
                                                </div>
                                                <div style={{ fontSize: "14px" }} className="content text-white fw-medium">
                                                    Online Webinar
                                                </div>
                                            </div>
                                            <h2 className="main-title text-primary">50% Increase Sales</h2>
                                            <div className="des fw-medium text-white mb-3">
                                                Present a professional estimate with your logo and company name and colors. Present a professional estimate with your logo and
                                                name and colors. Present a professional estimate with your logo and company name and colors. Present a professional estimate with
                                                your logo and company name and colors. Present a professional estimate with your logo and company name and colors.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="slider-controls d-flex align-items-center justify-content-between">
                                        <div className="custom-arrows d-flex align-items-center gap-2">
                                            <button className="custom-prev">
                                                <Image src="/assets/img/dashboard-arrow.svg" alt="Prev" width={8} height={16} />
                                            </button>
                                            <button className="custom-next">
                                                <Image src="/assets/img/dashboard-arrow1.svg" alt="Next" width={8} height={16} />
                                            </button>
                                        </div>
                                        <div className="icon">
                                            <Image src="/assets/img/icons/search-icon1.svg" alt="Search" width={14} height={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="filter-sec">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-xl-3">
                                <span className="d-block mb-3 fw-semibold fs-4">Filters</span>
                                <span className="d-block mb-2 fw-medium">Search</span>
                                <div className="form-wrapper">
                                    <Image src="/assets/img/icons/search-gray.svg" width={18} height={18} alt="Search Icon" />
                                    <input type="text" placeholder="Search here" />
                                    <Image src="/assets/img/icons/voice.svg" width={18} height={18} alt="Voice Icon" />
                                </div>
                                <span className="d-block mb-2 fw-medium">City</span>
                                <input type="text" placeholder="Whittier, CA" />
                                <span className="d-block mb-2 fw-medium">Zip Code</span>
                                <input type="text" placeholder="29391" />
                                <span className="d-block mb-2 fw-medium">Work Radius</span>

                                <div className="range-wrapper mb-5">
                                    <div className="range-container">
                                        <div className="slider-wrap">
                                            <input type="range" min="0" max="100" defaultValue="2" id="milesRange" className="range-slider" />
                                            <div className="range-value">2 miles</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="min">0 miles</span>
                                        <span className="max">100 miles</span>
                                    </div>
                                </div>

                                <Image
                                    src="/assets/img/filter-img.webp"
                                    width={400}
                                    height={400}
                                    alt="Filter Image"
                                    className="img-fluid w-100"
                                    style={{ borderRadius: "25px", boxShadow: "0 4px 85px 0px #00000025" }}
                                />
                            </div>

                            {/* Jobs Section */}
                            <div className="col-xl-9">
                                <span className="d-block mb-4 fw-semibold fs-4 text-dark">Jobs</span>

                                {[1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="posted-card posted-card-1 custom-card mb-3">
                                        <div className="topbar mb-2">
                                            <div className="title">Whittier, CA</div>
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="date">23 mins ago</div>
                                                <div className="icon">
                                                    <Image src="/assets/img/copy-icon.svg" width={16} height={16} alt="Icon" />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="description mb-0">
                                            Looking for a licensed painter to complete full interior repainting of a 2,000 sq ft office. Includes two coats of primer and final
                                            flat finish. Must bring own equipment and provide material estimate. Looking for a licensed painter to complete full interior
                                            repainting of a 2,000 sq ft office. Includes two coats of primer and final flat finish.
                                        </p>
                                        <button className="see-more-btn">See more</button>
                                        <div className="bottom-bar">
                                            <div className="left">
                                                <Image src="/assets/img/icons/p-icon.svg" width={50} height={50} alt="P Icon" />
                                                <p className="mb-0 fs-5 fw-semibold">ProBuilds Express</p>
                                            </div>
                                            <div className="social-icons">
                                                <Link href="#" className="icon">
                                                    <Image src="/assets/img/icons/message-white.svg" width={20} height={20} alt="Social Icon" />
                                                </Link>
                                                <Link href="#" className="icon">
                                                    <Image src="/assets/img/icons/chat.svg" width={20} height={20} alt="Social Icon" />
                                                </Link>
                                                <Link href="#" className="icon">
                                                    <Image src="/assets/img/icons/call-white.svg" width={20} height={20} alt="Social Icon" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
