// components/Header.tsx
'use client';

import {useState, useEffect, useRef, useCallback} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

import '../../styles/header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const pathname = usePathname();
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        setUserRole(role);
    }, [pathname]);

    // Close notification dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        };

        if (typeof window !== 'undefined') {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, []);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.endsWith(`/${href}`);
    };

    // const toggleMenu = () => {
    //     setIsMenuOpen((prev) => !prev);
    // };

    // Toggle notification dropdown
    // const toggleNotification = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     if (typeof window !== 'undefined' && window.innerWidth < 992) {
    //         setIsNotificationOpen((prev) => !prev);
    //     }
    // };

    // Static notifications for demo
    // const notifications = [
    //     {
    //         type: 'Success',
    //         detail: 'You have accessed the app at 07:00 AM',
    //         time: '1 hr ago',
    //         dateGroup: 'Today',
    //         isHighlight: true
    //     },
    //     {
    //         type: 'New Project Alert',
    //         detail: 'New project alert! A contractor has posted a new opportunity that matches your trade. Tap to view details.',
    //         time: '1 hr ago',
    //         dateGroup: 'Today',
    //         isHighlight: false
    //     },
    // ];

    // const getRoleForCurrentPath = () => {
    //     if (pathname.startsWith('/auth/register/affiliate') || pathname.startsWith('/affiliate')) return 'affiliate';
    //     if (pathname.startsWith('/auth/register/subcontractor') || pathname.startsWith('/subcontractor')) return 'subcontractor';
    //     if (pathname.startsWith('/auth/register/general-contractor') || pathname.startsWith('/general-contractor')) return 'general_contractor';
    //     return null;
    // };

    // const NotificationDropdown = useCallback(() => (
    //     <div
    //         className={`notification-dropdown-wrapper ${isMenuOpen ? 'dropdown-static' : ''}`}
    //         ref={notificationRef}
    //         onMouseEnter={() => typeof window !== 'undefined' && window.innerWidth >= 992 && setIsNotificationOpen(true)}
    //         onMouseLeave={() => typeof window !== 'undefined' && window.innerWidth >= 992 && setIsNotificationOpen(false)}
    //     >
    //
    //         <Link
    //             href="#"
    //             className="icon-link notification-icon-link"
    //             onClick={toggleNotification}
    //             aria-label="Notifications"
    //             aria-expanded={isNotificationOpen}
    //         >
    //             <Image src="/assets/img/icons/notification-dark.svg" width={24} height={24} alt="Notifications"/>
    //         </Link>
    //
    //         <div className={`notification-dropdown ${isNotificationOpen ? 'show-dropdown' : ''}`}>
    //             <span className="dropdown-title">Notifications</span>
    //             <div className="notification-list">
    //                 {['Today', 'Yesterday'].map(dateGroup => {
    //                     const filteredNotifications = notifications.filter(n => n.dateGroup === dateGroup);
    //                     if (filteredNotifications.length === 0) return null;
    //
    //                     return (
    //                         <div key={dateGroup}>
    //                             <h4 className="date-group-heading">{dateGroup}</h4>
    //                             {filteredNotifications.map((notification, index) => (
    //                                 <div
    //                                     key={index}
    //                                     className={`notification-item ${notification.isHighlight ? 'thank-you-highlight' : ''}`}
    //                                 >
    //                                     <div className="d-flex align-items-start gap-2">
    //                                         {notification.isHighlight ? (
    //                                             <div className="success-dot-placeholder"></div>
    //                                         ) : (
    //                                             <div className="dot-placeholder"></div>
    //                                         )}
    //                                         <div className="notification-content">
    //                                             <div className="notification-header">
    //                                                 <p className="notification-type">{notification.type}</p>
    //                                                 <span className="notification-time">{notification.time}</span>
    //                                             </div>
    //                                             <p className="notification-detail">{notification.detail}</p>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     );
    //                 })}
    //             </div>
    //         </div>
    //     </div>
    // ), [isMenuOpen, isNotificationOpen]);

    // const getNavigation = () => {
    //     const currentPathRole = getRoleForCurrentPath();
    //
    //     if (currentPathRole) {
    //         const commonIconsButtons = (
    //             <div className="icon-buttons d-flex align-items-center gap-3 position-relative">
    //                 <NotificationDropdown/>
    //                 <Link href="profile" className="icon-link" onClick={() => setIsMenuOpen(false)}
    //                       aria-label="Profile">
    //                     <Image src="/assets/img/icons/user-dark.svg" width={24} height={24} alt="Profile"/>
    //                 </Link>
    //             </div>
    //         );
    //
    //         switch (currentPathRole) {
    //             case 'general_contractor':
    //                 return {
    //                     menuItems: [
    //                         {href: 'dashboard', label: 'Dashboard'},
    //                         {href: '/messages', label: 'Messages'},
    //                         {href: 'my-projects', label: 'My projects'},
    //                     ],
    //                     iconsButtons: commonIconsButtons
    //                 };
    //
    //             case 'subcontractor':
    //                 return {
    //                     menuItems: [
    //                         {href: 'dashboard', label: 'Dashboard'},
    //                         {href: '/messages', label: 'Messages'},
    //                         {href: 'rating', label: 'Rating'},
    //                     ],
    //                     iconsButtons: commonIconsButtons
    //                 };
    //
    //             case 'affiliate':
    //                 return {
    //                     menuItems: [
    //                         {href: 'dashboard', label: 'Dashboard'},
    //                         {href: '/messages', label: 'Messages'},
    //                         {href: 'my-ads', label: 'My Ads'},
    //                     ],
    //                     iconsButtons: commonIconsButtons
    //                 };
    //
    //             default:
    //                 return {
    //                     menuItems: [
    //                         {href: '/', label: 'Home'},
    //                         {href: '/projects', label: 'Projects'},
    //                         {href: '/subscription', label: '30 Days Free Trial'},
    //                         {href: '/how-it-works', label: 'How It Works'},
    //                         {href: '/blogs', label: 'Blog'},
    //                     ],
    //                     authButtons: (
    //                         <>
    //                             <Link href="/auth/login" className="btn btn-outline-dark rounded-3"
    //                                   onClick={() => setIsMenuOpen(false)}>Log In</Link>
    //                             <Link href="/auth/register" className="btn btn-primary rounded-3"
    //                                   onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
    //                         </>
    //                     ),
    //                     iconsButtons: null,
    //                 };
    //         }
    //     }
    //
    //     return {
    //         menuItems: [
    //             {href: '/', label: 'Home'},
    //             //{ href: '/projects', label: 'Projects' },
    //             {href: '/subscription', label: 'Free Trial'},
    //             {href: '/how-it-works', label: 'How It Works'},
    //             {href: '/blogs', label: 'Blog'},
    //         ],
    //         authButtons: (
    //             <>
    //                 <Link href="/auth/login" className="btn btn-outline-dark rounded-3"
    //                       onClick={() => setIsMenuOpen(false)}>Log In</Link>
    //                 <Link href="/auth/register" className="btn btn-primary rounded-3"
    //                       onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
    //             </>
    //         ),
    //         iconsButtons: null,
    //     };
    // };

    // const {menuItems, authButtons, iconsButtons} = getNavigation();

    // const headerClass = getRoleForCurrentPath() ? 'header header-dashboard' : 'header header-public';

    // At the top of your component, add this helper
    // const isTransparentHeaderPage = () => {
    //     return (
    //         pathname.includes('/subcontractor/subscription'), // optional: catch all subscription variants
    //             pathname.includes('/subcontractor/thank-you') // optional: catch all subscription variants
    //     );
    // };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container">
                    <Link className="navbar-brand" href={'/'}>
                        <Image
                            src="/assets/img/icons/logo.webp"
                            width={234}
                            height={67}
                            alt="Logo"
                            title="Logo"
                            priority
                        />
                    </Link>
                    <div className={'d-flex gap-1'}>
                        <Link href={'/auth/login'} className="btn btn-outline-dark px-3 rounded-3 border-0 d-lg-none">
                            <Image
                                src={'/assets/img/user.svg'}
                                width={20}
                                height={20}
                                className=""
                            />
                        </Link>
                        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {
                                (
                                    pathname === '/subcontractor/dashboard' ||
                                    pathname === '/subcontractor/messages' ||
                                    pathname === '/subcontractor/ratings'
                                ) &&
                                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 rounded-3 px-lg-2 py-lg-2">
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" href={'/subcontractor/dashboard'}>Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" href={'/messages'}>Messages</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" href={'/subcontractor/ratings'}>Ratings</Link>
                                    </li>
                                </ul>
                            }

                            {
                                (
                                    pathname === '/' ||
                                    pathname === '/subscription' ||
                                    pathname === '/blogs' ||
                                    pathname === '/how-it-works'
                                ) &&
                                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 rounded-3 px-lg-2 py-lg-2">
                                            <li className="nav-item">
                                                <Link className="nav-link" aria-current="page" href={'/'}>Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" aria-current="page" href={'/subscription'}>Free Trial</Link>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" href={'/'} role="button"
                                                      data-bs-toggle="dropdown" aria-expanded="false">How It Works</Link>
                                                <ul className="dropdown-menu">
                                                    <li><Link className="dropdown-item" href={'/how-it-works'}>General Contractor</Link>
                                                    </li>
                                                    <li><Link className="dropdown-item" href={'/how-it-works'}>Subcontractor</Link></li>
                                                    <li><Link className="dropdown-item" href={'/how-it-works'}>Affiliates</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" href={'/'} role="button"
                                                      data-bs-toggle="dropdown" aria-expanded="false">Blogs</Link>
                                                <ul className="dropdown-menu">
                                                    <li><Link className="dropdown-item" href={'/blogs'}>General Contractor</Link></li>
                                                    <li><Link className="dropdown-item" href={'/blogs'}>Subcontractor</Link></li>
                                                    <li><Link className="dropdown-item" href={'/blogs'}>Affiliates</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                            }
                    </div>
                    <div className={'gap-3 d-none d-lg-flex'}>
                        <Link href={'/auth/login'} className="btn btn-outline-dark rounded-3">Login</Link>
                        <Link href={'/auth/register'} className="btn btn-primary rounded-3">Signup</Link>
                    </div>

                </div>
            </nav>
            {/*<div className="d-none">*/}
            {/*    <header className={isTransparentHeaderPage() ? 'header header-show-logo d-none' : headerClass}>*/}
            {/*        <div className="container">*/}
            {/*            <div className="header-wrapper">*/}
            {/*                <Link href="/" className="logo" aria-label="Home">*/}
            {/*                    <Image*/}
            {/*                        src="/assets/img/icons/logo.webp"*/}
            {/*                        width={234}*/}
            {/*                        height={67}*/}
            {/*                        alt="Logo"*/}
            {/*                        title="Logo"*/}
            {/*                        priority*/}
            {/*                    />*/}
            {/*                </Link>*/}

            {/*                <button*/}
            {/*                    className={`hamburger ${isMenuOpen ? 'open' : ''}`}*/}
            {/*                    id="hamburger-icon"*/}
            {/*                    aria-expanded={isMenuOpen}*/}
            {/*                    aria-controls="primary-navigation"*/}
            {/*                    aria-label="Open Menu"*/}
            {/*                    onclick={toggleMenu}*/}
            {/*                >*/}
            {/*                    <span className="line line-1"></span>*/}
            {/*                    <span className="line line-2"></span>*/}
            {/*                    <span className="line line-3"></span>*/}
            {/*                </button>*/}

            {/*                <nav*/}
            {/*                    id="primary-navigation"*/}
            {/*                    className={isMenuOpen ? 'd-flex' : 'd-none d-lg-flex'}*/}
            {/*                    aria-hidden={!isMenuOpen}*/}
            {/*                >*/}
            {/*                    <ul className="menu-links mb-0">*/}
            {/*                        {menuItems.map((item, index) => (*/}
            {/*                            <li key={index}>*/}
            {/*                                <Link*/}
            {/*                                    href={item.href}*/}
            {/*                                    className={isActive(item.href) ? 'active' : ''}*/}
            {/*                                    onClick={toggleMenu}*/}
            {/*                                >*/}
            {/*                                    {item.label}*/}
            {/*                                </Link>*/}
            {/*                            </li>*/}
            {/*                        ))}*/}
            {/*                    </ul>*/}
            {/*                    <div className="buttons d-flex align-items-center flex-wrap gap-3">*/}
            {/*                        {authButtons}*/}
            {/*                        {iconsButtons}*/}
            {/*                    </div>*/}
            {/*                </nav>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </header>*/}
            {/*</div>*/}
        </div>
    );
}