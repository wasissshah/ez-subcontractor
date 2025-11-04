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
                   <span className="text-primary fw-semibold"> Design Spartans</span>
              </p>
          </div>
          <div className="row">
              <div className="col-lg-6 offset-lg-6">
                  <div
                      className="content-wrapper d-flex align-items-center justify-content-center"
                  >
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

                          <div className="fw-semibold fs-2 mb-4 text-center">Login</div>

                          <div className="form">
                              <div className="input-wrapper d-flex flex-column">
                                  <label htmlFor="email" className="mb-1 fw-semibold">
                                      Email Address *
                                  </label>
                                  <input type="email" id="email" placeholder="hello@example.com" />
                              </div>

                              <div className="input-wrapper d-flex flex-column position-relative">
                                  <label htmlFor="password" className="mb-1 fw-semibold">
                                      Password *
                                  </label>
                                  <input
                                      type={showPassword ? 'text' : 'password'}
                                      id="password"
                                      className="form-control pe-5"
                                      placeholder="Enter Your Password"
                                  />
                                  {/* 👁 Eye Icon */}
                                  <span
                                      className="toggle-password position-absolute"
                                      style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                      onClick={() => setShowPassword(!showPassword)}
                                  >
                <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`} id="toggleIcon"></i>
              </span>
                              </div>

                              <div className="d-flex justify-content-between align-items-center">
                                  <div className="form-check">
                                      <input
                                          className="form-check-input"
                                          type="radio"
                                          value=""
                                          id="rememberMe"
                                      />
                                      <label className="form-check-label fw-semibold" htmlFor="rememberMe">
                                          Remember me
                                      </label>
                                  </div>
                                  <Link href="#" className="text-decoration-none fw-semibold text-gray-light">
                                      Forgot password?
                                  </Link>
                              </div>

                              <input
                                  type="submit"
                                  value="Login"
                                  className="btn btn-primary rounded-3 w-100 d-block mb-4"
                              />
                          </div>

                          <div className="fw-semibold text-center mb-3">Or Login With</div>

                          <Link href="#" className="icon mx-auto">
                              <Image
                                  src="/assets/img/icons/google-logo.webp"
                                  width={26}
                                  height={26}
                                  alt="Google Logo"
                              />
                          </Link>

                          <div className="text-center fw-medium text-gray-light">
                              Don’t have an account?{' '}
                              <Link href="#" className="fw-semibold text-black">
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