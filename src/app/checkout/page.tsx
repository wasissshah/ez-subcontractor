// app/business-details/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../../styles/pricing.css';
import '../../styles/checkout.css';
export default function BusinessDetailsPage() {
    return (
        <div className="sections overflow-hidden">
            <Header />

            <section className="hero-sec pricing no-before overflow-hidden">
                <div className="container">
                    <Link href="/" className="d-block mb-5">
                        <Image
                            src="/assets/img/icons/logo.webp"
                            width={350}
                            height={100}
                            alt="Login Logo"
                            className="img-fluid d-block w-100"
                            style={{ maxWidth: '350px' }}
                        />
                    </Link>

                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="d-flex flex-column justify-content-center w-100 h-100">
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <div className="icon">
                                        <Image src="/assets/img/button-angle.svg" width={10} height={15} alt="Angle" />
                                    </div>
                                    <div className="login-title fw-semibold fs-2 text-center">
                                        Business Details
                                    </div>
                                </div>

                                <div className="form">
                                    <div className="input-wrapper-s2">
                                        <div className="input-wrapper d-flex flex-column">
                                            <label htmlFor="name" className="mb-1 fw-semibold">Full Name *</label>
                                            <input type="text" id="name" placeholder="Jason Doe" />
                                        </div>
                                        <div className="input-wrapper d-flex flex-column">
                                            <label htmlFor="email" className="mb-1 fw-semibold">Email Address *</label>
                                            <input type="email" id="email" placeholder="hello@example.com" />
                                        </div>
                                    </div>

                                    <div className="input-wrapper d-flex flex-column position-relative">
                                        <label htmlFor="category" className="mb-1 fw-semibold">Category *</label>

                                        <div className="custom-select">
                                            <div className="select-selected">Select category</div>
                                            <i className="bi bi-chevron-down select-arrow"></i>
                                            <ul className="select-options">
                                                <li data-value="1">Plumbing</li>
                                                <li data-value="2">Electric Work</li>
                                                <li data-value="3">Framing</li>
                                                <li data-value="4">Roofing</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="buttons d-flex align-items-center gap-2 flex-wrap">
                                        <Link href="#" className="btn bg-dark p-2 fs-12 rounded-3">
                                            <span className="text-gray-light">Framing</span>
                                            <Image src="/assets/img/cancel_svgrepo.com.svg" width={16} height={16} alt="Cancel Icon" loading="lazy" />
                                        </Link>
                                        <Link href="#" className="btn bg-dark p-2 fs-12 rounded-3">
                                            <span className="text-gray-light">Electrical</span>
                                            <Image src="/assets/img/cancel_svgrepo.com.svg" width={16} height={16} alt="Cancel Icon" loading="lazy" />
                                        </Link>
                                        <Link href="#" className="btn bg-dark p-2 fs-12 rounded-3">
                                            <span className="text-gray-light">Plumbing</span>
                                            <Image src="/assets/img/cancel_svgrepo.com.svg" width={16} height={16} alt="Cancel Icon" loading="lazy" />
                                        </Link>
                                    </div>

                                    <div className="input-wrapper-s2">
                                        <div className="input-wrapper d-flex flex-column">
                                            <label htmlFor="name1" className="mb-1 fw-semibold">Card Holder Name *</label>
                                            <input type="text" id="name1" placeholder="Enter card holder name" />
                                        </div>
                                        <div className="input-wrapper d-flex flex-column">
                                            <label htmlFor="card" className="mb-1 fw-semibold">Card Number *</label>
                                            <input type="number" id="card" placeholder="4242 4242 4242 4242" />
                                        </div>
                                    </div>

                                    <div className="input-wrapper-s2">
                                        <div className="input-wrapper d-flex flex-column">
                                            <label htmlFor="cvv" className="mb-1 fw-semibold">Cvv *</label>
                                            <input type="number" id="cvv" placeholder="Enter CVV" />
                                        </div>
                                        <div className="input-wrapper d-flex flex-column">
                                            <label htmlFor="expiry" className="mb-1 fw-semibold">Expiry Date *</label>
                                            <input type="date" id="expiry" placeholder="12/25" />
                                        </div>
                                    </div>

                                    <div className="input-wrapper-s2">
                                        <div className="input-wrapper d-flex flex-column">
                                            <label htmlFor="zip" className="mb-1 fw-semibold">Zip Code *</label>
                                            <input type="number" id="zip" placeholder="Enter zip code" />
                                        </div>
                                        <div className="input-wrapper d-flex flex-column">
                                            <label htmlFor="promo" className="mb-1 fw-semibold">Promo Code</label>
                                            <input type="number" id="promo" placeholder="Enter promo code" />
                                        </div>
                                    </div>

                                    <div className="summary-card">
                                        <div className="top d-flex align-items-start gap-2">
                                            <Image src="/assets/img/summary.svg" width={24} height={24} alt="Summary Icon" loading="lazy" />
                                            <div className="content w-100">
                                                <span style={{ fontSize: '14px' }} className="fw-semibold d-block">Order Summary</span>

                                                <div className="d-flex align-items-center gap-2 flex-wrap justify-content-between w-100 mt-2">
                                                    <span style={{ fontSize: '14px' }}>Yearly Plan</span>
                                                    <span style={{ fontSize: '14px' }} className="fw-semibold">$400</span>
                                                </div>

                                                <div className="d-flex align-items-center gap-2 flex-wrap justify-content-between w-100 mt-2">
                                                    <span style={{ fontSize: '14px' }}>Extra Categories (2 X $125)</span>
                                                    <span style={{ fontSize: '14px' }} className="fw-semibold">$250</span>
                                                </div>

                                                <div className="d-flex align-items-center gap-2 flex-wrap justify-content-between w-100 mt-2">
                                                    <span style={{ fontSize: '14px' }}>Tax (8%)</span>
                                                    <span style={{ fontSize: '14px' }} className="fw-semibold">$52</span>
                                                </div>

                                                <hr className="mt-2 mb-2" />

                                                <div className="d-flex align-items-center gap-2 flex-wrap justify-content-between w-100 mt-2 mb-2">
                                                    <span style={{ fontSize: '14px' }} className="fw-semibold">Total</span>
                                                    <span style={{ fontSize: '14px' }} className="fw-semibold">$702</span>
                                                </div>

                                                <p style={{ fontSize: '14px' }} className="mb-0">
                                                    Note: You’ve selected 3 categories
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        value="Confirm Payment"
                                        className="btn btn-primary w-100 rounded-3 d-block"
                                        type="button"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="pricing-sec p-0">
                                <div className="fs-5 fw-semibold mb-3">Selected Plan</div>
                                <div className="pricing-wrapper">
                                    <div className="price-card price-card1 free">
                                        <div className="pricing-header">
                                            <div className="d-flex align-items-center gap-1 justify-content-between mb-3">
                                                <span className="title1 mb-0">Yearly</span>
                                                <div
                                                    style={{ fontSize: '14px' }}
                                                    className="custom-btn bg-white rounded-5 shadow p-2"
                                                >
                                                    🔥 Popular
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="price">$<span className="fw-bold">650</span></span>
                                                <Link
                                                    href="#"
                                                    className="btn btn-primary rounded-pill p-2 m-0"
                                                    style={{
                                                        backgroundColor: '#10BC17',
                                                        color: 'white !important',
                                                        fontSize: '14px !important',
                                                        width: 'fit-content',
                                                    }}
                                                >
                                                    Save $200
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="pricing-body mb-4">
                                            <ul className="m-0 p-0 list-with-icon">
                                                <li>Full access to all job postings within their licensed categories.</li>
                                                <li>Access to live chat and PDF file exchange with General Contractors</li>
                                                <li>View contact information for general contractors , phone, text , direct message or email
                                                </li>
                                                <li>Ability to view project timelines, budgets, and requirements in detail. </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
