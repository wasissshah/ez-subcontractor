'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../../styles/profile.css';
import '../../../styles/post-detail.css';

export default function PostAd() {
    const [selectedCategory, setSelectedCategory] = useState('Select category');
    const [selectOpen, setSelectOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleSelect = (value) => {
        setSelectedCategory(value);
        setSelectOpen(false);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <>
            <Header />
            <div className="sections overflow-hidden">
                <section className="banner-sec post profile">
                    <div className="container">
                        <div className="right-bar">
                            <div className="d-flex align-items-center gap-3 justify-content-between flex-wrap mb-5">
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
                                    <span className="fs-4 fw-semibold">Post an Ad</span>
                                </div>
                            </div>
                        </div>

                        <div className="row g-3">
                            {/* LEFT SIDE */}
                            <div className="col-lg-8">
                                <form className="mb-4">
                                    {/* Custom Select */}
                                    <div className="input-wrapper d-flex flex-column position-relative mb-4">
                                        <label htmlFor="category" className="mb-1 fw-semibold">Category *</label>
                                        <div className="custom-select position-relative">
                                            <div
                                                className="select-selected"
                                                onClick={() => setSelectOpen(!selectOpen)}
                                            >
                                                {selectedCategory}
                                            </div>
                                            <i className="bi bi-chevron-down select-arrow"></i>
                                            {selectOpen && (
                                                <ul className="select-options">
                                                    {["Plumbing", "Electric Work", "Framing", "Roofing"].map((item, index) => (
                                                        <li key={index} onClick={() => handleSelect(item)}>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    {/* Input Fields */}
                                    <div className="row g-4">
                                        {[
                                            { label: "City *", type: "text", placeholder: "New York" },
                                            { label: "State *", type: "text", placeholder: "NY" },
                                            { label: "Zip Code *", type: "text", placeholder: "12345" },
                                            { label: "Estimate Due Date *", type: "date" },
                                            { label: "Project Start Date *", type: "date" },
                                            { label: "Project End Date *", type: "date" }
                                        ].map((field, index) => (
                                            <div className="col-lg-4" key={index}>
                                                <div className="input-wrapper">
                                                    <div className="label mb-1 fw-semibold">{field.label}</div>
                                                    <input type={field.type} placeholder={field.placeholder || ''} />
                                                </div>
                                            </div>
                                        ))}

                                        <div className="col-12">
                                            <div className="label mb-1 fw-semibold">Description *</div>
                                            <div className="input-wrapper">
                                                <textarea style={{ minHeight: '292px' }} placeholder="Message"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                {/* Documents */}
                                <div className="mb-2 fw-semibold fs-5">Documents Description</div>
                                <div className="image-box mb-4 text-center">
                                    {uploadedFiles.length === 0 ? (
                                        <>
                                            <Image
                                                src="/assets/img/post.webp"
                                                className="d-block mx-auto mb-2"
                                                width={166}
                                                height={161}
                                                alt="Post Image"
                                                loading="lazy"
                                            />
                                            <div className="fs-14 fw-medium">No Document added</div>
                                        </>
                                    ) : (
                                        uploadedFiles.map((file, index) => (
                                            <div key={index} className="mb-2">
                                                <p className="fw-medium">{file.name}</p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <Link href="#" className="btn btn-primary rounded-3 w-100 justify-content-center">
                                    Add Project
                                </Link>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="col-lg-4">
                                <div className="attachment-wrapper">
                                    <div className="fw-semibold mb-3">Attachment</div>
                                    <div
                                        className="attachment-box"
                                        id="dropZone"
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <div className="upload-content">
                                            <div className="upload-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" style={{ stroke: '#272727' }} width="55" height="55" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v4h16v-4" />
                                                </svg>
                                            </div>
                                            <p>Drag and drop files here<br />or click to upload</p>
                                            <small>Supported: .pdf, .doc, .xml, .jpeg (Max 10MB)</small>
                                        </div>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            hidden
                                            multiple
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
