// app/reviews/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../styles/profile.css';

interface Contractor {
    id: number;
    name: string;
    company_name: string;
    city: string | null;
    state: string | null;
    average_rating: string; // e.g., "4.50"
    ratings_count: string;  // e.g., "2"
    created_at: string;     // e.g., "2025-11-06T20:51:19.000000Z"
}

export default function ReviewsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Select category');
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const options = ['Plumbing', 'Electric Work', 'Framing', 'Roofing'];

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
    };

    // 🔹 Fetch contractors
    useEffect(() => {
        const fetchContractors = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Authentication required.');
                    // Optional: router.push('/auth/login')
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}common/contractors?page=1&perPage=10`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                        },
                    }
                );

                if (response.status === 401) {
                    setError('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message?.[0] || 'Failed to load contractors');
                }

                if (data?.success && Array.isArray(data.data?.data)) {
                    setContractors(data.data.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err: any) {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to load contractors.');
            } finally {
                setLoading(false);
            }
        };
        fetchContractors();
    }, []);

    // 🔹 Format date: "2025-11-06T20:51:19.000000Z" → "Nov 6, 2025"
    const formatDate = (dateStr: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    return (
        <div className="sections overflow-hidden">
            <Header />

            <section className="banner-sec profile review">
                <div className="container">
                    <div className="review-wrapper p-0 shadow-none">
                        <div className="d-flex align-items-center gap-3 justify-content-between right-bar p-0 mb-5 flex-wrap">
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
                                <span className="fs-4 fw-semibold">Ratings</span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <div style={{ whiteSpace: 'nowrap' }} className="fw-medium">
                                    <span>Filter by:</span>
                                </div>
                                <div className="input-wrapper d-flex flex-column position-relative w-100">
                                    <div
                                        className={`custom-select p-0 w-100 ${isOpen ? 'open' : ''}`}
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <div style={{ maxWidth: '200px' }} className="select-selected w-100">
                                            {selected}
                                        </div>
                                        <i className="bi bi-chevron-down select-arrow"></i>
                                        <ul className="select-options">
                                            {options.map((option, index) => (
                                                <li key={index} data-value={index + 1} onClick={() => handleSelect(option)}>
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ✅ Review Cards Section */}
                        <div className="review-card-s1 p-0 bg-transparent">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-3">Loading contractors...</p>
                                </div>
                            ) : error ? (
                                <div className="alert alert-warning d-flex align-items-center" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 16 16">
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                    <div>{error}</div>
                                </div>
                            ) : (
                                <>
                                    <div className="row g-4 mb-5">
                                        {contractors.length > 0 ? (
                                            contractors.map((contractor, index) => (
                                                <div className="col-lg-4 col-md-6" key={contractor.id}>
                                                    <div className="review-inner-card">
                                                        <div className="top d-flex align-items-center gap-2 justify-content-between flex-wrap mb-2">
                                                            <div className="icon-wrapper d-flex align-items-center gap-2">
                                                                <Image
                                                                    src="/assets/img/profile-img.webp"
                                                                    width={40}
                                                                    height={40}
                                                                    alt="Card Image"
                                                                    loading="lazy"
                                                                />
                                                                <div className="content">
                                                                    <div className="fw-semibold fs-14 mb-1 text-capitalize">{contractor.name}</div>
                                                                    <div style={{ color: '#8F9B1F' }} className="fw-semibold fs-14">
                                                                        {contractor.company_name || 'Unknown Company'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="date fs-12 text-gray-light">
                                                                {formatDate(contractor.created_at)}
                                                            </div>
                                                        </div>

                                                        <div className="bottom d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                                            <div className="fs-12 fw-medium">
                                                                {contractor.city && contractor.state
                                                                    ? `${contractor.city}, ${contractor.state}`
                                                                    : 'Location not available'}
                                                            </div>
                                                            <div className="right d-flex align-items-center gap-2 flex-wrap">
                                                                <div className="rating-icons d-flex align-items-center gap-1 flex-wrap">
                                                                    {/* Render stars based on average_rating */}
                                                                    {Array(5)
                                                                        .fill(0)
                                                                        .map((_, j) => {
                                                                            const starValue = j + 1;
                                                                            const rating = parseFloat(contractor.average_rating) || 0;
                                                                            const isFull = starValue <= Math.floor(rating);
                                                                            const isHalf = !isFull && starValue <= rating + 0.5;

                                                                            return (
                                                                                <Image
                                                                                    key={j}
                                                                                    src={
                                                                                        isFull
                                                                                            ? '/assets/img/start1.svg'
                                                                                            : isHalf
                                                                                            ? '/assets/img/star2.svg'
                                                                                            : '/assets/img/star-empty.svg' // ✅ Correct empty star
                                                                                    }
                                                                                    width={14}
                                                                                    height={14}
                                                                                    alt="Star Icon"
                                                                                    loading="lazy"
                                                                                />
                                                                            );
                                                                        })}
                                                                </div>
                                                                <div className="content">
                                                                    <div className="fs-12">{contractor.average_rating}/5</div>
                                                                    <div className="fs-12 text-muted d-none">({contractor.ratings_count} reviews)</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-12">
                                                <div className="text-center py-4">
                                                    <Image
                                                        src="/assets/img/post.webp"
                                                        width={120}
                                                        height={120}
                                                        alt="No contractors"
                                                        className="mb-3"
                                                    />
                                                    <p className="text-muted">No contractors found.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* 🔁 Load More Button (optional) */}
                                    <Link href="#" className="btn bg-dark rounded-3 mx-auto d-flex justify-content-center align-items-center">
                                        <span className="text-white">Load More</span>
                                        <img src="/assets/img/load-btn.svg" className="d-block" width="15" height="15" alt="Arrow" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}