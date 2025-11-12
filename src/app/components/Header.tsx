// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import '../../styles/header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const pathname = usePathname();

    // Load user role from localStorage on mount
    useEffect(() => {
        const role = localStorage.getItem('role') || localStorage.getItem('accountType');
        setUserRole(role);
    }, [pathname]); // Added pathname as dependency to re-check on route change

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Check if current path belongs to a specific role
    const getRoleForCurrentPath = () => {
        if (pathname.startsWith('/auth/affiliate') || pathname.startsWith('/affiliate')) {
            return 'affiliate';
        } else if (pathname.startsWith('/auth/sub-contractor') || pathname.startsWith('/sub-contractor')) {
            return 'sub-contractor';
        } else if (pathname.startsWith('/auth/general-contractor') || pathname.startsWith('/general-contractor')) {
            return 'general-contractor';
        }
        return null; // For default pages
    };

    // Define navigation based on current path role
    const getNavigation = () => {
        const currentPathRole = getRoleForCurrentPath();

        // If current path is for a specific role, show that role's header
        if (currentPathRole) {
            switch (currentPathRole) {
                case 'general-contractor':
                    return {
                        menuItems: [
                            { href: 'dashboard', label: 'Dashboard' },
                            { href: 'messages', label: 'Messages' },
                            { href: 'my-projects', label: 'My projects' },
                        ],
                        iconsButtons: (
                            <>
                                <Link
                                    href="/notifications"
                                    className="icon-link"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Notifications"
                                >
                                    <Image
                                        src="/assets/img/icons/notification-dark.svg"
                                        width={24}
                                        height={24}
                                        alt="Notifications"
                                    />
                                </Link>
                                <Link
                                    href="profile"
                                    className="icon-link"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Profile"
                                >
                                    <Image
                                        src="/assets/img/icons/user-dark.svg"
                                        width={24}
                                        height={24}
                                        alt="Profile"
                                    />
                                </Link>
                            </>
                        )
                    };

                case 'sub-contractor':
                    return {
                        menuItems: [
                            { href: 'dashboard', label: 'Dashboard' },
                            { href: 'messages', label: 'Messages' },
                            { href: 'rating', label: 'Rating' },
                        ],
                        iconsButtons: (
                            <>
                                <Link
                                    href="/messages"
                                    className="icon-link"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Messages"
                                >
                                    <Image
                                        src="/assets/img/icons/notification-dark.svg"
                                        width={24}
                                        height={24}
                                        alt="Messages"
                                    />
                                </Link>
                                <Link
                                    href="profile"
                                    className="icon-link"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Profile"
                                >
                                    <Image
                                        src="/assets/img/icons/user-dark.svg"
                                        width={24}
                                        height={24}
                                        alt="Profile"
                                    />
                                </Link>
                            </>
                        )
                    };

                case 'affiliate':
                    return {
                        menuItems: [
                            { href: 'dashboard', label: 'Dashboard' },
                            { href: 'messages', label: 'Messages' },
                            { href: 'my-ads', label: 'My Ads' },
                        ],
                        iconsButtons: (
                            <>
                                <Link
                                    href="/analytics"
                                    className="icon-link"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Analytics"
                                >
                                    <Image
                                        src="/assets/img/icons/notification-dark.svg"
                                        width={24}
                                        height={24}
                                        alt="Analytics"
                                    />
                                </Link>
                                <Link
                                    href="profile"
                                    className="icon-link"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Profile"
                                >
                                    <Image
                                        src="/assets/img/icons/user-dark.svg"
                                        width={24}
                                        height={24}
                                        alt="Profile"
                                    />
                                </Link>
                            </>
                        )
                    };

                default:
                    // Fallback for unknown roles
                    return {
                        menuItems: [
                            { href: '/', label: 'Home' },
                            { href: '/projects', label: 'Projects' },
                            { href: '/subscription', label: '30 Days Free Trial' },
                            { href: '/how-it-works', label: 'How It Works' },
                            { href: '/blogs', label: 'Blog' },
                        ],
                        authButtons: (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="btn btn-outline-dark rounded-3"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="btn btn-primary rounded-3"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        ),
                        iconsButtons: null,
                    };
            }
        }

        // For all other pages (default pages), show default header
        return {
            menuItems: [
                { href: '/', label: 'Home' },
                { href: '/projects', label: 'Projects' },
                { href: '/subscription', label: '30 Days Free Trial' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/blogs', label: 'Blog' },
            ],
            authButtons: (
                <>
                    <Link
                        href="/auth/login"
                        className="btn btn-outline-dark rounded-3"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Log In
                    </Link>
                    <Link
                        href="/auth/register"
                        className="btn btn-primary rounded-3"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Sign Up
                    </Link>
                </>
            ),
            iconsButtons: null,
        };
    };

    const { menuItems, authButtons, iconsButtons } = getNavigation();

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
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className={isActive(item.href) ? 'active' : ''}
                                        onClick={toggleMenu}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="buttons d-flex align-items-center flex-wrap gap-3">
                            {authButtons}
                            {iconsButtons}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}