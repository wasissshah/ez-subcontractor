// app/profile/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../../styles/profile.css';

export default function ProfilePage() {
    const pathname = usePathname(); // active link detection

    return (
        <div className="sections overflow-hidden">
            <Header />
            <section className="banner-sec profile">
                <div className="container">
                    <div className="row g-4">
                        {/* Sidebar */}
                        <div className="col-xl-3">
                            <div className="sidebar h-100">
                                <div className="main-wrapper bg-dark p-0 h-100 d-flex flex-column justify-content-between">
                                    {/* Topbar */}
                                    <div className="topbar mb-5 d-flex justify-content-between align-items-start">
                                        <div className="icon-wrapper d-flex align-items-start gap-3">
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
                                                        href="tel:+000000000"
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

                                    {/* Sidebar Buttons */}
                                    <div className="buttons-wrapper">
                                        <Link
                                            href="/general-contractor/change-password"
                                            className={`custom-btn ${pathname === '/general-contractor/change-password' ? 'active' : ''}`}
                                        >
                                            <div className="d-flex align-items-center gap-2">
                                                <Image
                                                    src="/assets/img/icons/saved.svg"
                                                    width={20}
                                                    height={20}
                                                    alt="Icon"
                                                />
                                                <span className="text-white">Change Password</span>
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

                                    {/* Bottom Logout Button */}
                                    <div className="bottom-bar mt-auto">
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
                        </div>

                        {/* Right Bar */}
                        <div className="col-xl-9">
                            <div className="right-bar">
                                <div className="d-flex align-items-center gap-2 justify-content-between flex-wrap mb-5">
                                    <div className="icon-wrapper d-flex align-items-center gap-3">
                                        <Link href="#" className="icon">
                                            <Image src="/assets/img/button-angle.svg" width={10} height={15} alt="Icon" />
                                        </Link>
                                        <span className="fs-4 fw-semibold">Edit Profile</span>
                                    </div>
                                    <Link href="#" className="btn btn-primary rounded-3">Save Changes</Link>
                                </div>

                                <Image src="/assets/img/profile-img.webp" width={234} height={234} alt="Worker Image" className="d-block mb-4 img-fluid w-100" style={{ maxWidth: '234px' }} />

                                <div className="form">
                                    <div className="input-wrapper d-flex flex-column">
                                        <label htmlFor="name" className="mb-1 fw-semibold">Full Name *</label>
                                        <input type="text" id="name" placeholder="Jason Doe" />
                                    </div>
                                    <div className="input-wrapper d-flex flex-column">
                                        <label htmlFor="company" className="mb-1 fw-semibold">Company Name *</label>
                                        <input type="text" id="company" placeholder="Jason Tiles Limited" />
                                    </div>
                                    <div className="input-wrapper d-flex flex-column">
                                        <label htmlFor="email" className="mb-1 fw-semibold">Email Address *</label>
                                        <input type="email" id="email" placeholder="hello@example.com" />
                                    </div>
                                    <div className="input-wrapper d-flex flex-column">
                                        <label htmlFor="phone" className="mb-1 fw-semibold">Phone Number *</label>
                                        <input id="phone" type="tel" placeholder="(000) 000-0000" />
                                    </div>
                                    <div className="input-wrapper d-flex flex-column">
                                        <label htmlFor="license" className="mb-1 fw-semibold">License Number</label>
                                        <input type="text" id="license" placeholder="223546" />
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
