// app/auth/login/page.tsx
'use client';

import '../../../styles/login.css';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('info@admin.com');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // ✅ Validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    // ✅ Dummy login check
    if (email === 'info@admin.com' && password === 'admin') {
      if (rememberMe) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
      }
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
      <section className="hero-sec overflow-hidden">
        <div className="row g-2">
          {/* Left Image */}
          <div className="col-lg-6">
            <div
                className="image-wrapper d-flex align-items-end p-4 w-100"
                style={{
                  backgroundImage: `url('/assets/img/left-image.webp')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
            >
              <p className="fw-medium text-white fs-4 mb-0">
                Developed by:{' '}
                <span className="text-primary fw-semibold">Design Spartans</span>
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="col-lg-6">
            <div className="content-wrapper d-flex align-items-center justify-content-center p-3">
              <div className="content mx-auto" style={{ maxWidth: '482px' }}>
                <Link href="/" className="d-block mb-4">
                  <Image
                      src="/assets/img/icons/logo.webp"
                      width={350}
                      height={100}
                      alt="EZ Subcontractor Logo"
                      className="img-fluid d-block w-100 mx-auto"
                  />
                </Link>

                <div className="fw-semibold fs-2 mb-4 text-center">Login</div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger text-center mb-3" role="alert">
                      {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form">
                  <div className="input-wrapper d-flex flex-column mb-3">
                    <label htmlFor="email" className="mb-1 fw-semibold">
                      Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="hello@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                  </div>

                  <div className="input-wrapper d-flex flex-column mb-3 position-relative">
                    <label htmlFor="password" className="mb-1 fw-semibold">
                      Password *
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="form-control pe-5"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-password position-absolute"
                        style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                    {showPassword ? (
                        <i className="bi bi-eye" />
                    ) : (
                        <i className="bi bi-eye-slash" />
                    )}
                  </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-decoration-none fw-semibold text-dark">
                      Forgot password?
                    </Link>
                  </div>

                  <button type="submit" className="btn btn-primary rounded-3 w-100 d-block mb-4">
                    Login
                  </button>
                </form>

                <div className="fw-semibold text-center mb-3">Or Login With</div>

                <Link
                    href="/api/auth/google"
                    className="icon d-block mx-auto mb-4"
                    style={{ width: 'fit-content' }}
                >
                  <Image
                      src="/assets/img/icons/google-logo.webp"
                      width={26}
                      height={26}
                      alt="Google Logo"
                  />
                </Link>

                <div className="text-center fw-medium text-gray-light">
                  Don’t have an account?{' '}
                  <Link href="/auth/register" className="fw-semibold text-black text-decoration-none">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}