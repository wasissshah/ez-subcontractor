'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../../../styles/login.css';

export default function CreateNewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!password.trim()) {
            setError('New Password is required');
            return;
        }
        if (!confirmPassword.trim()) {
            setError('Confirm Password is required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setSuccess('Password changed successfully!');
        setPassword('');
        setConfirmPassword('');

        setTimeout(() => router.push('/auth/login'), 2000);
    };

    const EyeIcon = ({ open }: { open: boolean }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {open ? (
                <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </>
            ) : (
                <>
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.84 21.84 0 0 1 5.06-6.06" />
                    <path d="M1 1l22 22" />
                </>
            )}
        </svg>
    );

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
                        <div className="content mx-auto">
                            <Image
                                src="/assets/img/icons/logo.webp"
                                width={350}
                                height={100}
                                alt="Login Logo"
                                style={{ maxWidth: '350px' }}
                                className="img-fluid d-block w-100 mx-auto mb-4"
                            />

                            <div className="fw-semibold fs-2 mb-4 text-center form-title">
                                Create New Password
                            </div>

                            <form className="form" onSubmit={handleSubmit}>
                                {/* New Password */}
                                <div className="input-wrapper d-flex flex-column position-relative mb-3">
                                    <label htmlFor="password" className="mb-1 fw-semibold">
                                        New Password *
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className="form-control pe-5"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className="toggle-password position-absolute"
                                        style={{ right: 10, top: 38, cursor: 'pointer' }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                    <EyeIcon open={showPassword} />
                  </span>
                                </div>

                                {/* Confirm Password */}
                                <div className="input-wrapper d-flex flex-column position-relative mb-3">
                                    <label htmlFor="confirm_password" className="mb-1 fw-semibold">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirm_password"
                                        className="form-control pe-5"
                                        placeholder="Enter confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span
                                        className="toggle-password position-absolute"
                                        style={{ right: 10, top: 38, cursor: 'pointer' }}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                    <EyeIcon open={showConfirmPassword} />
                  </span>
                                </div>

                                {/* Error / Success */}
                                {error && <p className="text-danger mb-2">{error}</p>}
                                {success && <p className="text-success mb-2">{success}</p>}

                                {/* Submit Button */}
                                <div className="buttons-wrapper d-flex align-items-center gap-4">
                                    <input
                                        type="submit"
                                        className="btn btn-primary rounded-3 w-100"
                                        value="Go to Login"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
