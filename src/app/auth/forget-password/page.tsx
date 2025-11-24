'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../../styles/login.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // ✅ Client-side validation
        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // ✅ Success: show message and redirect after delay
                setMessage('Password reset link has been sent to your email!');
                setEmail('');

                localStorage.setItem('forgotPasswordEmail', email);
                setTimeout(() => {
                    router.push('/auth/verify-email');
                }, 1500);
            } else {
                // ❌ Handle backend error (NestJS format)
                let errorMessage = 'Something went wrong. Please try again.';
                if (Array.isArray(data.message)) {
                    errorMessage = data.message[0];
                } else if (typeof data.message === 'string') {
                    errorMessage = data.message;
                }
                setError(errorMessage);
            }
        } catch (err) {
            setError('Network error. Please check your internet connection.');
        }
    };

    return (
        <section className="hero-sec login overflow-hidden position-static">
            <div className="image-wrapper">
                <Image
                    src="/assets/img/left-image.webp"
                    className="left-image"
                    alt="Section Image"
                    width={500}
                    height={800}
                />
                <p className="main-title mb-0">
                    Developed by:
                    <Link href="https://designspartans.com/" target="_blank" className="text-primary fw-semibold"> Design Spartans</Link>
                </p>
            </div>

            <div className="row">
                <div className="col-lg-6 offset-lg-6">
                    <div className="content-wrapper">
                        <div className="content mx-auto w-100">
                            <Link href="/" className="d-block mb-4">
                                <Image
                                    src="/assets/img/icons/logo.webp"
                                    width={350}
                                    height={100}
                                    alt="Login Logo"
                                    style={{ maxWidth: '350px' }}
                                    className="img-fluid d-block w-100 mx-auto"
                                />
                            </Link>

                            <div className="fw-semibold fs-2 mb-4 text-center form-title">
                                Forgot Password
                            </div>

                            <form className="form" onSubmit={handleSubmit}>
                                <div className="input-wrapper d-flex flex-column">
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

                                {error && <p className="text-danger mt-2">{error}</p>}
                                {message && <p className="text-success mt-2">{message}</p>}

                                <div className="buttons-wrapper d-flex align-items-center gap-4 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/auth/login')}
                                        className="btn btn-outline-dark rounded-3 justify-content-center w-100"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary rounded-3 justify-content-center w-100"
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}