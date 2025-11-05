// app/profile/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../../styles/profile.css';

export default function ProfilePage() {
    return (
        <div className="sections overflow-hidden">
            <Header />

            <section className="banner-sec profile">
                <div className="container">
                    <div className="row g-4">
                        {/* Sidebar */}
                        <div className="col-xl-3">
                            <div className="sidebar">
                                <div className="main-wrapper bg-dark m-0">
                                    <div className="topbar mb-5">
                                        <div className="icon-wrapper">
                                            <Image src="/assets/img/profile-img.webp" width={80} height={80} alt="Worker Icon" loading="lazy" />
                                            <div className="content-wrapper">
                                                <div className="title text-black fs-5 fw-medium mb-2">Joseph Dome</div>
                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                    <Image src="/assets/img/icons/message-dark.svg" width={16} height={16} alt="Message Icon" loading="lazy" />
                                                    <Link href="mailto:hello@example.com" className="fs-14 fw-medium text-dark">hello@example.com</Link>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                    <Image src="/assets/img/icons/call-dark.svg" width={16} height={16} alt="Call Icon" loading="lazy" />
                                                    <Link href="tel:+(000) 000-000" className="fs-14 fw-medium text-dark">(000) 000-000</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <Image src="/assets/img/icons/arrow-dark.svg" width={16} height={10} alt="Arrow" loading="lazy" style={{ objectFit: 'contain' }} />
                                    </div>

                                    <div className="buttons-wrapper">
                                        {Array(5).fill(0).map((_, i) => (
                                            <Link href="#" key={i} className="custom-btn">
                                                <div className="d-flex align-items-center gap-2">
                                                    <Image src="/assets/img/icons/saved.svg" width={20} height={20} alt="Icon" loading="lazy" />
                                                    <span className="text-white">Switch Account</span>
                                                </div>
                                                <Image src="/assets/img/icons/angle-right.svg" width={15} height={9} alt="Icon" loading="lazy" style={{ objectFit: 'contain' }} />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="bottom-bar">
                                    <div className="buttons-wrapper">
                                        <Link href="#" className="custom-btn bg-danger" style={{ borderColor: '#DC2626' }}>
                                            <div className="d-flex align-items-center gap-2">
                                                <Image src="/assets/img/icons/logout.svg" width={20} height={20} alt="Icon" loading="lazy" />
                                                <span className="text-white">Logout</span>
                                            </div>
                                            <Image src="/assets/img/icons/angle-right.svg" width={15} height={9} alt="Icon" loading="lazy" style={{ objectFit: 'contain' }} />
                                        </Link>
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
                                            <Image src="/assets/img/button-angle.svg" width={10} height={15} alt="Icon" loading="lazy" />
                                        </Link>
                                        <span className="fs-4 fw-semibold">Edit Profile</span>
                                    </div>
                                    <Link href="#" className="btn btn-primary rounded-3">Save Changes</Link>
                                </div>

                                <Image src="/assets/img/profile-img.webp" width={234} height={234} alt="Worker Image" loading="lazy" className="d-block mb-4 img-fluid w-100" style={{ maxWidth: '234px' }} />

                                <div className="form mb-4">
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
                                        <label htmlFor="category" className="mb-1 fw-semibold">Category</label>
                                        <div
                                            className="d-flex align-items-center gap-2 flex-wrap"
                                            style={{
                                                border: '1px solid #dadada',
                                                padding: '6px',
                                                borderRadius: '10px',
                                                fontSize: '14px',
                                                marginBottom: '10px',
                                                width: '100%',
                                                outline: 'none'
                                            }}
                                        >
                                            {['Framing', 'Electrical', 'Plumbing'].map((item, i) => (
                                                <Link key={i} href="#" className="btn bg-dark rounded-3 pt-1 pb-1 ps-2 pe-2 fs-14 fw-semibold">
                                                    <span style={{ color: 'white' }}>{item}</span>
                                                    <Image src="/assets/img/icons/cancel.svg" width={12} height={12} alt="Icon" loading="lazy" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="input-wrapper d-flex flex-column">
                                        <label htmlFor="license" className="mb-1 fw-semibold">License Number</label>
                                        <input type="text" id="license" placeholder="123456" />
                                    </div>

                                    <div className="input-wrapper d-flex flex-column">
                                        <label htmlFor="zip" className="mb-1 fw-semibold">Zip Code</label>
                                        <input type="text" id="zip" placeholder="1001" />
                                    </div>

                                    <div className="input-wrapper d-flex flex-column">
                                        <label htmlFor="radius" className="mb-1 fw-semibold">Work Radius</label>
                                        <input type="text" id="radius" placeholder="126" />
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
