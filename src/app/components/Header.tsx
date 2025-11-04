// components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import '../../styles/header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-wrapper">
                    <Link href="/" className="logo" aria-label="Home">
                        <Image
                            src="/assets/img/icons/logo.webp"
                            width={234}
                            height={67}
                            alt="Logo"
                            priority
                        />
                    </Link>

                    {/* Hamburger button */}
                    <button
                        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                        id="hamburger-icon"
                        aria-expanded={isMenuOpen}
                        aria-controls="primary-navigation"
                        onClick={toggleMenu}
                    >
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                        <span className="line line-3"></span>
                    </button>

                    {/* Navigation */}
                    <nav
                        id="primary-navigation"
                        className={isMenuOpen ? 'd-flex' : 'd-none d-lg-flex'}
                        aria-hidden={!isMenuOpen}
                    >
                        <ul className="menu-links mb-0">
                            <li>
                                <Link
                                    href="/"
                                    className={isActive('/') ? 'active' : ''}
                                    onClick={toggleMenu}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/projects"
                                    className={isActive('/projects') ? 'active' : ''}
                                    onClick={toggleMenu}
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/subscription"
                                    className={isActive('/subscription') ? 'active' : ''}
                                    onClick={toggleMenu}
                                >
                                    30 Days Free Trial
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/how-it-works"
                                    className={isActive('/how-it-works') ? 'active' : ''}
                                    onClick={toggleMenu}
                                >
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blogs"
                                    className={isActive('/blogs') ? 'active' : ''}
                                    onClick={toggleMenu}
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                        <div className="buttons d-flex align-items-center flex-wrap gap-3">
                            <Link
                                href="/auth/login"
                                className="btn btn-outline-dark rounded-3"
                                onClick={toggleMenu}
                            >
                                Log In
                            </Link>
                            <Link
                                href="/auth/register"
                                className="btn btn-primary rounded-3"
                                onClick={toggleMenu}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}