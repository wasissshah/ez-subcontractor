'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../styles/free-trial.css';

// Define the project type
interface Project {
    id: number;
    city: string;
    state: string;
    description: string;
    status: string;
    created_at: string;
    category: {
        name: string;
    };
}

export default function DashboardSubContractor() {
    const router = useRouter();
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<number[]>([]);
    const [savedproject, setSavedproject] = useState<Set<number>>(new Set());

    // Toggle description expansion
    const toggleExpand = (index: number) => {
        setExpanded(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    // 🔹 Toast Notification — identical to LoginPage
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        const toast = document.createElement('div');
        const bgColor = type === 'success' ? '#d4edda' : '#f8d7da';
        const textColor = type === 'success' ? '#155724' : '#721c24';
        const borderColor = type === 'success' ? '#c3e6cb' : '#f5c6cb';
        const icon = type === 'success' ? '✅' : '❌';

        toast.innerHTML = `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                min-width: 300px;
                background-color: ${bgColor};
                color: ${textColor};
                border: 1px solid ${borderColor};
                border-radius: 8px;
                padding: 12px 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
            ">
                <span>${icon} ${message}</span>
                <button type="button" class="btn-close" style="font-size: 14px; margin-left: auto;" data-bs-dismiss="toast"></button>
            </div>
        `;
        document.body.appendChild(toast);

        const timeoutId = setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 4000);

        const closeButton = toast.querySelector('.btn-close');
        closeButton?.addEventListener('click', () => {
            clearTimeout(timeoutId);
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        });
    };

    // Format date like "23 mins ago" or "2 days ago"
    const formatTimeAgo = (dateString: string): string => {
        const now = new Date();
        const past = new Date(dateString);
        const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) return `${interval} years ago`;
        if (interval === 1) return '1 year ago';

        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return `${interval} months ago`;
        if (interval === 1) return '1 month ago';

        interval = Math.floor(seconds / 86400);
        if (interval > 1) return `${interval} days ago`;
        if (interval === 1) return '1 day ago';

        interval = Math.floor(seconds / 3600);
        if (interval > 1) return `${interval} hours ago`;
        if (interval === 1) return '1 hour ago';

        interval = Math.floor(seconds / 60);
        if (interval > 1) return `${interval} mins ago`;
        return 'Just now';
    };

    // 🔹 Fetch saved project (e.g., on mount or after save/unsave)
    const fetchSavedproject = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/auth/login');
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}common/project/my-saved`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 401) {
                localStorage.removeItem('token');
                router.push('/auth/login');
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message?.[0] || 'Failed to load saved project');
            }

            // ✅ Parse saved project IDs.
            // Adjust if your API returns { data: [1,2,3] } or { data: [{id:1},...] }
            let savedIds: number[] = [];

            if (Array.isArray(data.data)) {
                // Assume: { data: [ {id: 1}, {id: 2} ] } — common Laravel response
                savedIds = data.data.map((item: any) => item.id);
            } else if (typeof data.data === 'object' && Array.isArray(data.data.project)) {
                // Fallback: { data: { project: [...] } }
                savedIds = data.data.project.map((item: any) => item.id);
            } else if (Array.isArray(data)) {
                // Edge case: raw array [1,2,3]
                savedIds = data;
            }

            setSavedproject(new Set(savedIds));
        } catch (err: any) {
            console.error('Fetch saved project error:', err);
            // Do NOT block main UI — just log or soft-toast
            // showToast(err.message || 'Failed to load saved project.', 'error');
        }
    };

    // 🔹 Fetch projects
    const fetchproject = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/auth/login');
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}common/projects`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                }
            );
            if (response.status === 401) {
                localStorage.removeItem('token');
                router.push('/auth/login');
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message?.[0] || 'Failed to load project');
            }

            let fetchedProjects: Project[] = [];
            if (data?.data?.data && Array.isArray(data.data.data)) {
                fetchedProjects = [...data.data.data].reverse();
            }
            setProjects(fetchedProjects);
        } catch (err: any) {
            console.error('Fetch projects error:', err);
            setError(err.message || 'Failed to load project.');
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Toggle save/unsave
    const toggleSaveproject = async (projectId: number) => {
        console.log(projectId);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/auth/login');
                return;
            }

            const isCurrentlySaved = savedproject.has(projectId);
            const endpoint = isCurrentlySaved ? 'common/project/unsave' : 'common/projects/save';

            const formData = new FormData();
            formData.append('project_id', projectId.toString());

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                    body: formData,
                }
            );

            if (response.status === 401) {
                localStorage.removeItem('token');
                router.push('/auth/login');
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message?.[0] || `Failed to ${isCurrentlySaved ? 'unsave' : 'save'} project`);
            }

            // Update local state
            setSavedproject(prev => {
                const newSet = new Set(prev);
                if (isCurrentlySaved) {
                    newSet.delete(projectId);
                    showToast('project removed from saved list', 'success');
                } else {
                    newSet.add(projectId);
                    showToast('project saved successfully!', 'success');
                }
                return newSet;
            });

        } catch (err: any) {
            console.error(`${savedproject.has(projectId) ? 'Unsave' : 'Save'} project error:`, err);
            showToast(err.message || `Failed to ${savedproject.has(projectId) ? 'unsave' : 'save'} project.`, 'error');
        }
    };


    // 🔹 On mount: fetch projects + saved project in parallel
    useEffect(() => {
        const init = async () => {
            await Promise.all([
                fetchproject(),
                fetchSavedproject()
            ]);
        };
        init();
    }, [router]);

    return (
        <>
            <Header />

            <div className="sections overflow-hidden">
                {/* Banner Section */}
                <section className="banner-sec trial position-static">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="slider">
                                    <Image
                                        src="/assets/img/dashboard-free-trial-img.webp"
                                        width={800}
                                        height={600}
                                        alt="Section Image"
                                        className="img-fluid w-100 h-100"
                                        style={{
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 35px 0 #00000025',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="banner-wrapper"
                                    style={{ backgroundImage: "url('/assets/img/free-trial-img2.webp')" }}
                                >
                                    <div className="main-slider">
                                        <Slider ref={sliderRef} {...settings}>
                                            {[1, 2].map((_, i) => (
                                                <div key={i} className="slider-item">
                                                    <div className="d-flex align-items-center gap-2 mb-3">
                                                        <div className="icon bg-primary">
                                                            <Image
                                                                src="/assets/img/icons/camera.svg"
                                                                width={14}
                                                                height={10}
                                                                alt="icon"
                                                            />
                                                        </div>
                                                        <div style={{ fontSize: '14px' }} className="content text-white fw-medium">
                                                            Online Webinar
                                                        </div>
                                                    </div>
                                                    <h2 className="main-title text-primary">50% Increase Sales</h2>
                                                    <div className="desc fw-medium text-white mb-3">
                                                        Present a professional estimate with your logo and company name and
                                                        colors.
                                                    </div>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                    <div className="slider-controls d-flex align-items-center justify-content-between">
                                        <div className="custom-arrows d-flex align-items-center gap-2">
                                            <button
                                                className="custom-prev"
                                                onClick={() => sliderRef.current?.slickPrev()}
                                            >
                                                <Image
                                                    src="/assets/img/dashboard-arrow.svg"
                                                    alt="Prev"
                                                    width={8}
                                                    height={16}
                                                />
                                            </button>
                                            <button
                                                className="custom-next"
                                                onClick={() => sliderRef.current?.slickNext()}
                                            >
                                                <Image
                                                    src="/assets/img/dashboard-arrow1.svg"
                                                    alt="Next"
                                                    width={8}
                                                    height={16}
                                                />
                                            </button>
                                        </div>
                                        <div className="icon">
                                            <Image
                                                src="/assets/img/icons/search-icon1.svg"
                                                alt="Search"
                                                width={14}
                                                height={14}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter + projects Section */}
                <section className="filter-sec">
                    <div className="container">
                        <div className="row g-4">
                            {/* Filter Column */}
                            <div className="col-xl-3">
                                <span className="d-block mb-3 fw-semibold fs-4">Filters</span>
                                <span className="d-block mb-2 fw-medium">Zip Code</span>
                                <input type="text" placeholder="29391" className="form-control mb-3" />
                                <span className="d-block mb-2 fw-medium">Work Radius</span>
                                <div className="range-wrapper mb-5">
                                    <div className="range-container">
                                        <div className="slider-wrap">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                defaultValue="2"
                                                className="range-slider"
                                            />
                                            <div className="range-value">2 miles</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="min">0 miles</span>
                                        <span className="max">100 miles</span>
                                    </div>
                                </div>

                                <Image
                                    src="/assets/img/filter-img.webp"
                                    width={400}
                                    height={400}
                                    alt="Filter Image"
                                    className="img-fluid w-100"
                                    style={{ borderRadius: '25px', boxShadow: '0 4px 85px 0px #00000025' }}
                                />
                            </div>

                            {/* projects Column */}
                            <div className="col-xl-9">
                                <span className="d-block mb-4 fw-semibold fs-4 text-dark">Projects</span>

                                {loading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">Loading available project...</p>
                                    </div>
                                ) : error ? (
                                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            className="bi bi-exclamation-triangle-fill me-2"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                        <div>{error}</div>
                                    </div>
                                ) : projects.length === 0 ? (
                                    <div className="text-center py-5">
                                        <Image
                                            src="/assets/img/post.webp"
                                            width={120}
                                            height={120}
                                            alt="No project"
                                            className="mb-3"
                                        />
                                        <p className="text-muted">No project available right now.</p>
                                    </div>
                                ) : (
                                    projects.map((project, index) => (
                                        <div key={project.id} className="posted-card posted-card-1 custom-card mb-3">
                                            <div className="topbar mb-2 d-flex justify-content-between">
                                                <button className="title p-0 border-0 bg-transparent"
                                                    onClick={() => {
                                                        localStorage.setItem('project-id', String(project.id));
                                                        router.push('/subcontractor/project-details');
                                                    }}
                                                >
                                                    {project.city}, {project.state}
                                                </button>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="date">{formatTimeAgo(project.created_at)}</div>
                                                    <button
                                                        className={`icon bg-white ${savedproject.has(project.id) ? 'saved' : ''}`}
                                                        onClick={() => toggleSaveproject(project.id)}
                                                        aria-label={savedproject.has(project.id) ? 'Remove from saved' : 'Save project'}
                                                    >
                                                        <Image
                                                            src={
                                                                savedproject.has(project.id)
                                                                    ? '/assets/img/bookmark-filled.svg'
                                                                    : '/assets/img/bookmark-outline.svg'
                                                            }
                                                            width={16}
                                                            height={16}
                                                            alt="save"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <p
                                                className={`description mb-0 ${
                                                    expanded.includes(index) ? 'expanded' : ''
                                                }`}
                                            >
                                                {project.description.replace(/<[^>]*>/g, '').slice(0, 150) || 'No description provided.'}
                                            </p>

                                            <button
                                                className="see-more-btn d-block"
                                                onClick={() => toggleExpand(index)}
                                            >
                                                {expanded.includes(index) ? 'See less' : 'See more'}
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}