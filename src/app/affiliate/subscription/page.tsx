'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../styles/profile.css';
import '../../../styles/pricing.css';
export default function PricingPage() {
    return (
        <>
            <Header />

            <div className="sections overflow-hidden">
                <section className="banner-sec profile position-static">
                    <div className="container">
                        <div className="row g-4">
                            {/* Sidebar */}
                            <div className="col-xl-3">
                                <div className="sidebar">
                                    <div className="main-wrapper bg-dark p-0">
                                        <div className="topbar mb-5">
                                            <div className="icon-wrapper">
                                                <Image
                                                    src="/assets/img/profile-img.webp"
                                                    width={80}
                                                    height={80}
                                                    alt="Worker Icon"
                                                />
                                                <div className="content-wrapper">
                                                    <div className="title text-black fs-5 fw-medium mb-2">
                                                        Joseph Dome
                                                    </div>

                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                        <Image
                                                            src="/assets/img/icons/message-dark.svg"
                                                            width={16}
                                                            height={16}
                                                            alt="Message Icon"
                                                        />
                                                        <Link
                                                            href="mailto:hello@example.com"
                                                            className="fs-14 fw-medium text-dark"
                                                        >
                                                            hello@example.com
                                                        </Link>
                                                    </div>

                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                        <Image
                                                            src="/assets/img/icons/call-dark.svg"
                                                            width={16}
                                                            height={16}
                                                            alt="Call Icon"
                                                        />
                                                        <Link
                                                            href="tel:+(000)000-000"
                                                            className="fs-14 fw-medium text-dark"
                                                        >
                                                            (000) 000-000
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <Image
                                                src="/assets/img/icons/arrow-dark.svg"
                                                width={16}
                                                height={10}
                                                alt="Arrow"
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>

                                        <div className="buttons-wrapper">
                                            {[1, 2, 3, 4, 5].map((_, i) => (
                                                <Link href="#" key={i} className="custom-btn">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Image
                                                            src="/assets/img/icons/saved.svg"
                                                            width={20}
                                                            height={20}
                                                            alt="Icon"
                                                        />
                                                        <span className="text-white">Switch Account</span>
                                                    </div>
                                                    <Image
                                                        src="/assets/img/icons/angle-right.svg"
                                                        width={15}
                                                        height={9}
                                                        alt="Arrow"
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bottom-bar">
                                        <div className="buttons-wrapper">
                                            <Link
                                                href="#"
                                                className="custom-btn bg-danger"
                                                style={{ borderColor: '#DC2626' }}
                                            >
                                                <div className="d-flex align-items-center gap-2">
                                                    <Image
                                                        src="/assets/img/icons/logout.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="Logout Icon"
                                                    />
                                                    <span className="text-white">Logout</span>
                                                </div>
                                                <Image
                                                    src="/assets/img/icons/angle-right.svg"
                                                    width={15}
                                                    height={9}
                                                    alt="Arrow"
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="col-xl-9">
                                <div className="right-bar pricing-sec p-0">
                                    <div className="d-flex align-items-center gap-3 justify-content-between flex-wrap mb-5">
                                        <div className="icon-wrapper d-flex align-items-center gap-3">
                                            <Link href="#" className="icon">
                                                <Image
                                                    src="/assets/img/button-angle.svg"
                                                    width={10}
                                                    height={15}
                                                    alt="Icon"
                                                />
                                            </Link>
                                            <span className="fs-4 fw-semibold">Edit Profile</span>
                                        </div>
                                        <Link href="#" className="btn btn-primary rounded-3">
                                            Save Changes
                                        </Link>
                                    </div>

                                    <div className="row g-3">
                                        {/* CARD 1 */}
                                        <div className="col-lg-4 col-md-6">
                                            <div className="price-card free">
                                                <div className="pricing-header">
                                                    <span className="title1">30-Days Free Trial</span>
                                                    <span className="price">
                                                    $<span className="fw-bold">Free</span>
                                                  </span>
                                                </div>

                                                <div className="pricing-body">
                                                    <ul className="m-0 p-0 list-with-icon">
                                                        <li>
                                                            Registration with full company profile, license number,
                                                            insurance, and workers’ comp details.
                                                        </li>
                                                        <li>
                                                            Registration with full company profile, license number,
                                                            insurance, and workers’ comp details.
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="h-100 align-content-end">
                                                    <div className="note-card d-flex align-items-start gap-1">
                                                        <Image
                                                            src="/assets/img/icons/note.webp"
                                                            width={24}
                                                            height={24}
                                                            alt="Note"
                                                            className="d-block"
                                                        />
                                                        <div className="content">
                  <span
                      style={{ fontSize: '14px' }}
                      className="d-block fw-semibold mb-1"
                  >
                    Note
                  </span>
                                                            <p style={{ fontSize: '12px' }} className="mb-0">
                                                                After your trial ends, you’ll need to subscribe to keep
                                                                bidding on projects, chatting with contractors, and
                                                                accessing premium tools.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="pricing-button">
                                                        <button className="btn">Get Started</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* CARD 2 */}
                                        <div className="col-lg-4 col-md-6">
                                            <div className="price-card free">
                                                <div className="pricing-header">
                                                    <span className="title1">30-Days Free Trial</span>
                                                    <span className="price">
                $<span className="fw-bold">Free</span>
              </span>
                                                </div>

                                                <div className="pricing-body">
                                                    <ul className="m-0 p-0 list-with-icon">
                                                        {[1, 2, 3, 4].map((i) => (
                                                            <li key={i}>
                                                                Registration with full company profile, license number,
                                                                insurance, and workers’ comp details.
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pricing-button h-100 align-content-end">
                                                    <button className="btn">Get Started</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* CARD 3 */}
                                        <div className="col-lg-4 col-md-12">
                                            <div className="price-card price-card1 free">
                                                <div className="pricing-header">
                                                    <div className="d-flex align-items-center gap-1 justify-content-between mb-3">
                                                        <span className="title1 mb-0">Yearly</span>
                                                        <div
                                                            style={{ fontSize: '14px' }}
                                                            className="custom-btn bg-white shadow p-2 rounded-pill"
                                                        >
                                                            🔥 Popular
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-center gap-2">
                <span className="price">
                  $<span className="fw-bold">Free</span>
                </span>
                                                        <Link
                                                            href="#"
                                                            className="btn bg-danger p-2"
                                                            style={{ color: 'white' }}
                                                        >
                                                            Save $200
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="pricing-body">
                                                    <ul className="m-0 p-0 list-with-icon">
                                                        {[1, 2, 3, 4].map((i) => (
                                                            <li key={i}>
                                                                Registration with full company profile, license number,
                                                                insurance, and workers’ comp details.
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pricing-button">
                                                    <button className="btn">Get Started</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
