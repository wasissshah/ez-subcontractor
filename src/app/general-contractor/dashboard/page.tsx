// app/dashboard/page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../../styles/free-trial.css';
import Slider from "react-slick";

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

export default function DashboardPage() {
    const router = useRouter();
    const [expandedCards, setExpandedCards] = useState<number[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const [contractors, setContractors] = useState<Contractor[]>([]);

    const toggleCard = (index: number) => {
        setExpandedCards(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    // 🔹 Open delete modal
    const openDeleteModal = (id: number) => {
        setDeletingId(id);
        setDeleteError(null);
        const modalEl = document.getElementById('deleteProjectModal');
        if (modalEl && (window as any).bootstrap) {
            const modal = new (window as any).bootstrap.Modal(modalEl);
            modal.show();
        }
    };

    // 🔹 Delete project (same logic as My Projects page)
    const handleDelete = async () => {
        if (!deletingId) return;

        setDeleteError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Not authenticated');

            const formData = new FormData();
            formData.append('project_id', deletingId.toString());

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}common/projects/delete/${deletingId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                    body: formData,
                }
            );

            console.log(response.json());
            const responseData = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(responseData?.message || 'Failed to delete project');
            }

            // ✅ Remove from UI
            setProjects(prev => prev.filter(p => p.id !== deletingId));
            alert('✅ Project deleted successfully.');

            // Close modal
            const modalEl = document.getElementById('deleteProjectModal');
            if (modalEl && (window as any).bootstrap) {
                const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
                modal?.hide();
            }

        } catch (err: any) {
            console.error('Delete error:', err);
            setDeleteError(err.message || 'Failed to delete project. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    // 🔹 Fetch 4 most recent projects
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Authentication required.');
                    router.push('/auth/login');
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}common/projects/my-projects?perPage=4&page=1`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                        },
                    }
                );

                if (response.status === 401) {
                    localStorage.removeItem('token');
                    setError('Session expired. Please log in again.');
                    router.push('/auth/login');
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message?.[0] || 'Failed to load projects');
                }

                let fetchedProjects: Project[] = [];
                if (data?.data?.projects?.data && Array.isArray(data.data.projects.data)) {
                    fetchedProjects = [...data.data.projects.data].reverse();
                }

                setProjects(fetchedProjects);
            } catch (err: any) {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to load projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [router]);

    useEffect(() => {
        const fetchContractors = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Authentication required.');
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}common/contractors?page=1&perPage=3`, // ✅ Changed to 3
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

    const formatDate = (dateStr: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    const sliderRef = useRef<Slider | null>(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="sections overflow-hidden">
            <Header />

            {/* Banner Section */}
            <section className="banner-sec trial position-static">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6">
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
                        <div className="col-lg-6">
                            <div className="banner-wrapper" style={{ backgroundImage: "url('/assets/img/free-trial-img2.webp')" }}>
                                <div className="main-slider">
                                    <Slider ref={sliderRef} {...settings}>
                                        {[1, 2].map((_, i) => (
                                            <div key={i} className="slider-item">
                                                <div className="d-flex align-items-center gap-2 mb-3">
                                                    <div className="icon bg-primary">
                                                        <Image src="/assets/img/icons/camera.svg" width={14} height={10} alt="icon" />
                                                    </div>
                                                    <div style={{ fontSize: '14px' }} className="content text-white fw-medium">
                                                        Online Webinar
                                                    </div>
                                                </div>
                                                <h2 className="main-title text-primary">50% Increase Sales</h2>
                                                <div className="desc fw-medium text-white mb-3">
                                                    Present a professional estimate with your logo and company name and colors. Present a professional estimate with your logo and name and colors.
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                                <div className="slider-controls d-flex align-items-center justify-content-between">
                                    <div className="custom-arrows d-flex align-items-center gap-2">
                                        <button className="custom-prev" onClick={() => sliderRef.current?.slickPrev()}>
                                            <Image src="/assets/img/dashboard-arrow.svg" alt="Prev" width={8} height={16} />
                                        </button>
                                        <button className="custom-next" onClick={() => sliderRef.current?.slickNext()}>
                                            <Image src="/assets/img/dashboard-arrow1.svg" alt="Next" width={8} height={16} />
                                        </button>
                                    </div>
                                    <div className="icon">
                                        <Image src="/assets/img/icons/search-icon1.svg" alt="Search" width={14} height={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Projects Section */}
            <section className="review mb-5">
                <div className="container">
                    {/* Rate a Subcontractor (unchanged) */}
                    <div className="review-wrapper mb-4">
                        <div className="d-flex align-items-center gap-2 justify-content-between filter-sec p-0 mb-3">
                            <div>
                                <div className="fs-3 fw-semibold">Rate a Subcontractor</div>
                                <div className="fs-14 fw-semibold">Recently rated contractors</div>
                            </div>
                            <div className="form-wrapper">
                                <Image src="/assets/img/icons/search-gray.svg" width={18} height={18} alt="Search Icon" />
                                <input type="text" placeholder="Search here" />
                                <Image src="/assets/img/icons/voice.svg" width={18} height={18} alt="Voice Icon" />
                            </div>
                        </div>
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
                                    <div className="row g-4">
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
                                </>
                            )}
                        </div>
                    </div>

                    {/* ✅ My Projects — Dynamic + Delete */}
                    <div className="bar d-flex align-items-center gap-2 justify-content-between flex-wrap mb-4">
                        <div className="fs-4 fw-semibold">My Projects</div>
                        <button
                            onClick={() => router.push('/general-contractor/ad-project')}
                            className="btn btn-primary rounded-3 d-flex align-items-center gap-2"
                        >
                            <Image src="/assets/img/icons/plus.svg" width={12} height={12} alt="Icon" />
                            <span>Add Project</span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3">Loading your recent projects...</p>
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
                            <div className="row g-3 mb-4">
                                {projects.length > 0 ? (
                                    projects.map((project, index) => (
                                        <div className="col-lg-6" key={project.id}>
                                            <div className="project-card call-dark custom-card">
                                                <div className="bar d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                                                    <div className="fs-5 fw-semibold">
                                                        {project.category?.name || `${project.city}, ${project.state}`}
                                                    </div>
                                                    <span
                                                        className="btn p-1 ps-3 pe-3"
                                                        style={{
                                                            backgroundColor: getStatusBg(project.status),
                                                            color: getStatusColor(project.status),
                                                        }}
                                                    >
                                                        {getStatusLabel(project.status)}
                                                    </span>
                                                </div>

                                                <p className="description mb-0">
                                                    {expandedCards.includes(index)
                                                        ? project.description
                                                        : project.description?.replace(/<[^>]*>/g, '').slice(0, 150) + '...'}
                                                </p>

                                                <button
                                                    className="see-more-btn mb-3 d-block"
                                                    onClick={() => toggleCard(index)}
                                                >
                                                    {expandedCards.includes(index) ? 'See less' : 'See more'}
                                                </button>

                                                <div className="buttons d-flex align-items-center gap-2 flex-wrap-md">
                                                    <button
                                                        className="btn btn-primary rounded-3 w-100 justify-content-center"
                                                        onClick={() => router.push(`/general-contractor/project-details/${project.id}`)}
                                                    >
                                                        View Details
                                                    </button>
                                                    <button
                                                        className="btn bg-dark rounded-3 w-100 justify-content-center text-white"
                                                        onClick={() => router.push(`/general-contractor/edit-project/${project.id}`)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn bg-danger rounded-3 w-100 justify-content-center text-white"
                                                        onClick={() => openDeleteModal(project.id)}
                                                    >
                                                        Delete
                                                    </button>
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
                                                alt="No projects"
                                                className="mb-3"
                                            />
                                            <p className="text-muted">You haven’t posted any projects yet.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/general-contractor/my-projects" className="btn bg-dark rounded-3 mx-auto d-block w-fit">
                                <span className="text-white me-2">See All Projects</span>
                                <Image src="/assets/img/icons/arrow-white.svg" width={12} height={12} alt="Icon" />
                            </Link>
                        </>
                    )}
                </div>
            </section>

            {/* 🚫 Bootstrap Delete Modal (same as My Projects page) */}
            <div
                className="modal fade"
                id="deleteProjectModal"
                tabIndex={-1}
                aria-labelledby="deleteProjectModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="deleteProjectModalLabel">
                                Delete Project
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this project? This action cannot be undone.
                            {deleteError && (
                                <div className="alert alert-danger mt-3 p-2 mb-0">
                                    {deleteError}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                                disabled={deletingId === null}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

// 🔹 Status helpers (same as your other pages)
const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'hired': return '#007AFF';
        case 'active': return '#61BA47';
        case 'pending': return '#FF9500';
        case 'completed': return '#8E8E93';
        case 'cancelled': return '#FF3B30';
        default: return '#8E8E93';
    }
};

const getStatusBg = (status: string) => `${getStatusColor(status)}10`;

const getStatusLabel = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'hired') return 'Hired';
    if (s === 'active') return 'Active';
    if (s === 'pending') return 'Pending';
    if (s === 'completed') return 'Completed';
    if (s === 'cancelled') return 'Cancelled';
    return status.charAt(0).toUpperCase() + status.slice(1);
};