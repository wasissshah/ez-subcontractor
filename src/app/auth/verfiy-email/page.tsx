'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../../../styles/login.css';

export default function VerifyEmail() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(59); // 0:59
    const [error, setError] = useState('');
    const router = useRouter();

    // Timer countdown
    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // Handle OTP input change
    const handleChange = (index: number, value: string) => {
        if (/^\d*$/.test(value)) { // only digits
            const newOtp = [...otp];
            newOtp[index] = value.slice(-1);
            setOtp(newOtp);

            // auto focus next input
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (value && nextInput) (nextInput as HTMLInputElement).focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (otp.some((d) => d === '')) {
            setError('Please enter all OTP digits');
            return;
        }

        const enteredOtp = otp.join('');
        // ✅ Dummy OTP check
        if (enteredOtp === '4125') {
            alert('OTP verified successfully!');
            router.push('/auth/reset-password'); // example next page
        } else {
            setError('Invalid OTP, try again.');
        }
    };

    const handleResend = () => {
        setOtp(['', '', '', '']);
        setTimer(59);
        alert('OTP resent!');
    };

    return (
        <section className="hero-sec login overflow-hidden">
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
                    <span className="text-primary fw-semibold">Design Spartans</span>
                </p>
            </div>

            <div className="row">
                <div className="col-lg-6 offset-lg-6">
                    <div className="content-wrapper">
                        <div className="content mx-auto justify-content-wrapper">
                            <Image
                                src="/assets/img/icons/logo.webp"
                                width={350}
                                height={100}
                                alt="Login Logo"
                                style={{ maxWidth: '350px' }}
                                className="img-fluid d-block w-100 mx-auto mb-4"
                            />

                            <div className="fw-semibold fs-2 mb-4 text-center form-title">
                                Verify Email
                            </div>

                            {/* OTP Inputs */}
                            <div className="numbers mb-3 d-flex justify-content-center gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength={1}
                                        className={`number ${digit ? 'active' : ''}`}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                    />
                                ))}
                            </div>

                            {/* Timer */}
                            <div className="timer-button d-flex align-items-center justify-content-center mb-2">
                                <Image
                                    src="/assets/img/icons/timer.svg"
                                    width={20}
                                    height={20}
                                    alt="Timer"
                                    loading="lazy"
                                />
                                <div className="content fw-medium ms-2">
                                    0:{timer.toString().padStart(2, '0')}
                                </div>
                            </div>

                            {/* Resend */}
                            <div style={{ marginBottom: 20 }} className="detail fw-medium text-center text-gray-light">
                                Didn’t receive a code?{' '}
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="fw-semibold text-black border-0 bg-transparent"
                                >
                                    Resend
                                </button>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-danger text-center mb-2">{error}</p>}

                            {/* Buttons */}
                            <div className="buttons-wrapper d-flex align-items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.push('/auth/forgot-password')}
                                    className="btn btn-outline-dark rounded-3 justify-content-center w-100"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="btn btn-primary rounded-3 justify-content-center w-100"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
