'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../styles/profile.css';

export default function ChangePassword() {
    // Password visibility states
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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
                                                    src="/assets/img/icons/construction-worker.webp"
                                                    width={80}
                                                    height={80}
                                                    alt="Worker Icon"
                                                    loading="lazy"
                                                />
                                                <div className="content-wrapper">
                                                    <div className="title text-black fs-5 fw-medium mb-2">Joseph Dome</div>
                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                        <Image
                                                            src="/assets/img/icons/message-dark.svg"
                                                            width={16}
                                                            height={16}
                                                            alt="Message Icon"
                                                            loading="lazy"
                                                        />
                                                        <Link href="mailto:hello@example.com" className="fs-14 fw-medium text-dark">
                                                            hello@example.com
                                                        </Link>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                        <Image
                                                            src="/assets/img/icons/call-dark.svg"
                                                            width={16}
                                                            height={16}
                                                            alt="Call Icon"
                                                            loading="lazy"
                                                        />
                                                        <Link href="tel:+(000) 000-000" className="fs-14 fw-medium text-dark">
                                                            (000) 000-000
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <Image
                                                src="/assets/img/icons/arrow-dark.svg"
                                                style={{ objectFit: 'contain' }}
                                                width={16}
                                                height={10}
                                                alt="Arrow"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="buttons-wrapper">
                                            {[...Array(5)].map((_, i) => (
                                                <Link href="#" key={i} className={`custom-btn ${i === 0 ? 'active' : ''}`}>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Image
                                                            src="/assets/img/icons/saved.svg"
                                                            width={20}
                                                            height={20}
                                                            alt="Icon"
                                                            loading="lazy"
                                                        />
                                                        <span className="text-white">Switch Account</span>
                                                    </div>
                                                    <Image
                                                        src="/assets/img/icons/angle-right.svg"
                                                        style={{ objectFit: 'contain' }}
                                                        width={15}
                                                        height={9}
                                                        alt="Icon"
                                                        loading="lazy"
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bottom-bar">
                                        <div className="buttons-wrapper">
                                            <Link href="#" className="custom-btn s1 bg-danger" style={{ borderColor: '#DC2626' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <Image
                                                        src="/assets/img/icons/logout.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="Logout Icon"
                                                        loading="lazy"
                                                    />
                                                    <span className="text-white">Logout</span>
                                                </div>
                                                <Image
                                                    src="/assets/img/icons/angle-right.svg"
                                                    style={{ objectFit: 'contain' }}
                                                    width={15}
                                                    height={9}
                                                    alt="Icon"
                                                    loading="lazy"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="col-xl-9">
                                <div style={{ maxWidth: '482px' }} className="right-bar">
                                    <div className="d-flex align-items-center gap-3 justify-content-between flex-wrap mb-5">
                                        <div className="icon-wrapper d-flex align-items-center gap-3">
                                            <Link href="#" className="icon">
                                                <Image
                                                    src="/assets/img/button-angle.svg"
                                                    width={10}
                                                    height={15}
                                                    alt="Icon"
                                                    loading="lazy"
                                                />
                                            </Link>
                                            <span className="fs-4 fw-semibold">Change Password</span>
                                        </div>
                                    </div>

                                    {/* Input Fields */}
                                    {/* Old Password */}
                                    <div className="input-wrapper d-flex flex-column position-relative mb-4">
                                        <label htmlFor="old_password" className="mb-1 fw-semibold">
                                            Old Password *
                                        </label>
                                        <input
                                            type={showOld ? 'text' : 'password'}
                                            id="old_password"
                                            className="form-control pe-5"
                                            placeholder="Enter old password"
                                        />
                                        <span
                                            className="toggle-password position-absolute"
                                            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                            onClick={() => setShowOld(!showOld)}
                                        >
                      <i className={`bi ${showOld ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                    </span>
                                    </div>

                                    {/* New Password */}
                                    <div className="input-wrapper d-flex flex-column position-relative mb-4">
                                        <label htmlFor="password" className="mb-1 fw-semibold">
                                            New Password *
                                        </label>
                                        <input
                                            type={showNew ? 'text' : 'password'}
                                            id="password"
                                            className="form-control pe-5"
                                            placeholder="Enter new password"
                                        />
                                        <span
                                            className="toggle-password position-absolute"
                                            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                            onClick={() => setShowNew(!showNew)}
                                        >
                      <i className={`bi ${showNew ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                    </span>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="input-wrapper d-flex flex-column position-relative mb-4">
                                        <label htmlFor="confirm_password" className="mb-1 fw-semibold">
                                            Confirm Password *
                                        </label>
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            id="confirm_password"
                                            className="form-control pe-5"
                                            placeholder="Enter confirm password"
                                        />
                                        <span
                                            className="toggle-password position-absolute"
                                            style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                            onClick={() => setShowConfirm(!showConfirm)}
                                        >
                      <i className={`bi ${showConfirm ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                    </span>
                                    </div>

                                    <div className="buttons-wrapper d-flex align-items-center gap-4">
                                        <input type="submit" className="btn btn-primary rounded-3 w-100" value="Change Password" />
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
