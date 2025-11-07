'use client';
import '../../../styles/login.css';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // fake password reset API simulation
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // simulate API call
        setTimeout(() => {
            setMessage(`Password reset link has been sent to ${email}`);
            setEmail('');
        }, 1200);
    };

    return (
        <section className="hero-sec overflow-hidden">
            <div className="image-wrapper position-relative">
                <Image
                    src="/assets/img/left-image.webp"
                    alt="Section Image"
                    width={600}
                    height={600}
                    className="left-image"
                />
                <p className="main-title mb-0">
                    Developed by: <span className="text-primary fw-semibold">Design Spartans</span>
                </p>
            </div>

            <div style={{ padding: 20 }} className="content-wrapper d-flex align-items-center flex-column">
                <div style={{ maxWidth: 482 }} className="content mx-auto">
                    <Image
                        src="/assets/img/icons/logo.webp"
                        width={350}
                        height={100}
                        alt="Login Logo"
                        className="img-fluid d-block w-100 mx-auto mb-4"
                    />
                    <div className="fw-semibold fs-2 mb-4 text-center form-title">Forgot Password</div>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-wrapper d-flex flex-column mb-3">
                            <label htmlFor="email" className="mb-1 fw-semibold">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                        {message && <p style={{ color: 'green', fontSize: '14px' }}>{message}</p>}

                        <div className="buttons-wrapper d-flex align-items-center gap-4 mt-3">
                            <button
                                type="button"
                                className="btn btn-outline-dark rounded-3 w-100"
                                onClick={() => window.history.back()}
                            >
                                Back
                            </button>
                            <button type="submit" className="btn btn-primary rounded-3 w-100">
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
