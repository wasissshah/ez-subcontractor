'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../styles/free-trial.css';

export default function DashboardPage() {
    // tab control state
    const [activeTab, setActiveTab] = useState("all");

    // see more toggle
    const [expandedCards, setExpandedCards] = useState<number[]>([]);

    const toggleCard = (index: number) => {
        setExpandedCards((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const allProjects = [
        {
            id: 1,
            title: "Whittier, CA",
            status: "Hired",
            statusColor: "#007AFF",
            description:
                "Looking for a licensed painter to complete full interior repainting of a 2,000 sq ft office. Includes two coats of primer and final flat finish. Must bring own equipment and provide material estimate.",
        },
        {
            id: 2,
            title: "Los Angeles, CA",
            status: "Active",
            statusColor: "#61BA47",
            description:
                "Looking for a licensed painter to complete full interior repainting of a 2,000 sq ft office. Includes two coats of primer and final flat finish. Must bring own equipment and provide material estimate.",
        },
    ];

    const hiredProjects = allProjects.filter((p) => p.status === "Hired");
    const activeProjects = allProjects.filter((p) => p.status === "Active");

    const getProjects = () => {
        if (activeTab === "all") return allProjects;
        if (activeTab === "hired") return hiredProjects;
        if (activeTab === "active") return activeProjects;
        return [];
    };

    return (
        <>
            <Header />
        <section className="banner-sec trial review">
            <div className="container">
                <div className="right-bar">
                    {/* Header Bar */}
                    <div className="bar d-flex align-items-center gap-2 justify-content-between flex-wrap mb-4">
                        <div className="fs-4 fw-semibold">My Projects</div>
                        <Link href="#" className="btn btn-primary rounded-3">
                            <Image
                                src="/assets/img/icons/plus.svg"
                                width={12}
                                height={12}
                                alt="Icon"
                            />
                            <span>Add Project</span>
                        </Link>
                    </div>

                    {/* Tabs */}
                    <ul className="nav nav-tabs mb-4" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                                type="button"
                                onClick={() => setActiveTab("all")}
                            >
                                All
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "hired" ? "active" : ""}`}
                                type="button"
                                onClick={() => setActiveTab("hired")}
                            >
                                Hired
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "active" ? "active" : ""}`}
                                type="button"
                                onClick={() => setActiveTab("active")}
                            >
                                Active
                            </button>
                        </li>
                    </ul>

                    {/* Tab Content */}
                    <div className="tab-content">
                        <div
                            className={`tab-pane fade ${activeTab === "all" ? "show active" : ""}`}
                            id="all"
                            role="tabpanel"
                        >
                            <div className="row g-4">
                                {getProjects().map((project, index) => (
                                    <div className="col-lg-6" key={project.id}>
                                        <div className="project-card call-dark custom-card p-4">
                                            <div className="bar d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                                                <div className="fs-5 fw-semibold">{project.title}</div>
                                                <Link
                                                    href="#"
                                                    className="btn p-1 ps-3 pe-3"
                                                    style={{
                                                        backgroundColor: `${project.statusColor}10`,
                                                        color: project.statusColor,
                                                    }}
                                                >
                                                    {project.status}
                                                </Link>
                                            </div>

                                            <p className="description mb-0">
                                                {expandedCards.includes(index)
                                                    ? project.description
                                                    : project.description.slice(0, 120) + "..."}
                                            </p>
                                            <button
                                                className="see-more-btn mb-3 d-block"
                                                onClick={() => toggleCard(index)}
                                            >
                                                {expandedCards.includes(index) ? "See less" : "See more"}
                                            </button>

                                            <div className="buttons d-flex align-items-center gap-2 flex-wrap-md">
                                                <Link
                                                    href="#"
                                                    className="btn btn-primary rounded-3 w-100 justify-content-center"
                                                >
                                                    View Details
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="btn bg-dark text-white rounded-3 w-100 justify-content-center"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="btn bg-danger text-white rounded-3 w-100 justify-content-center"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hired Tab */}
                        <div
                            className={`tab-pane fade ${activeTab === "hired" ? "show active" : ""}`}
                            id="hired"
                            role="tabpanel"
                        >
                            <div className="row g-4">
                                {hiredProjects.map((project, index) => (
                                    <div className="col-lg-6" key={project.id}>
                                        <div className="project-card call-dark custom-card p-4">
                                            <div className="bar d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                                                <div className="fs-5 fw-semibold">{project.title}</div>
                                                <Link
                                                    href="#"
                                                    className="btn p-1 ps-3 pe-3"
                                                    style={{
                                                        backgroundColor: `${project.statusColor}10`,
                                                        color: project.statusColor,
                                                    }}
                                                >
                                                    {project.status}
                                                </Link>
                                            </div>

                                            <p className="description mb-0">
                                                {expandedCards.includes(index)
                                                    ? project.description
                                                    : project.description.slice(0, 120) + "..."}
                                            </p>
                                            <button
                                                className="see-more-btn mb-3 d-block"
                                                onClick={() => toggleCard(index)}
                                            >
                                                {expandedCards.includes(index) ? "See less" : "See more"}
                                            </button>

                                            <div className="buttons d-flex align-items-center gap-2 flex-wrap-md">
                                                <Link
                                                    href="#"
                                                    className="btn btn-primary rounded-3 w-100 justify-content-center"
                                                >
                                                    View Details
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="btn bg-dark text-white rounded-3 w-100 justify-content-center"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="btn bg-danger text-white rounded-3 w-100 justify-content-center"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Tab */}
                        <div
                            className={`tab-pane fade ${activeTab === "active" ? "show active" : ""}`}
                            id="active"
                            role="tabpanel"
                        >
                            <div className="row g-4">
                                {activeProjects.map((project, index) => (
                                    <div className="col-lg-6" key={project.id}>
                                        <div className="project-card call-dark custom-card p-4">
                                            <div className="bar d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                                                <div className="fs-5 fw-semibold">{project.title}</div>
                                                <Link
                                                    href="#"
                                                    className="btn p-1 ps-3 pe-3"
                                                    style={{
                                                        backgroundColor: `${project.statusColor}10`,
                                                        color: project.statusColor,
                                                    }}
                                                >
                                                    {project.status}
                                                </Link>
                                            </div>

                                            <p className="description mb-0">
                                                {expandedCards.includes(index)
                                                    ? project.description
                                                    : project.description.slice(0, 120) + "..."}
                                            </p>
                                            <button
                                                className="see-more-btn mb-3 d-block"
                                                onClick={() => toggleCard(index)}
                                            >
                                                {expandedCards.includes(index) ? "See less" : "See more"}
                                            </button>

                                            <div className="buttons d-flex align-items-center gap-2 flex-wrap-md">
                                                <Link
                                                    href="#"
                                                    className="btn btn-primary rounded-3 w-100 justify-content-center"
                                                >
                                                    View Details
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="btn bg-dark text-white rounded-3 w-100 justify-content-center"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href="#"
                                                    className="btn bg-danger text-white rounded-3 w-100 justify-content-center"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            <Footer />
        </>
    );
}
