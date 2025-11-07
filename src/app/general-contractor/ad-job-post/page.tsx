'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import '../../../styles/post-detail.css';
import '../../../styles/profile.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function PostAnAd() {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Select category');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const categories = ['Plumbing', 'Electric Work', 'Framing', 'Roofing'];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCategoryOpen(false);
    };

    const handleFileChange = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setFiles(uploadedFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Project submitted!');
        console.log({
            category: selectedCategory,
            description,
            files,
        });
    };

    return (
        <>
            {/* ✅ ReactQuill CSS via CDN */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/react-quill@2.0.0/dist/quill.snow.css"
            />

            <div className="sections overflow-hidden">
                <section className="banner-sec">
                    <div className="container">
                        <div className="right-bar">
                            <div className="d-flex align-items-center gap-3 justify-content-between flex-wrap mb-5">
                                <div className="icon-wrapper d-flex align-items-center gap-3">
                                    <a href="#" className="icon">
                                        <Image
                                            src="/assets/img/button-angle.svg"
                                            width={10}
                                            height={15}
                                            alt="Icon"
                                            loading="lazy"
                                        />
                                    </a>
                                    <span className="fs-4 fw-semibold">Post an Ad</span>
                                </div>
                            </div>
                        </div>

                        <div className="row g-3">
                            {/* Left Section */}
                            <div className="col-lg-8">
                                <form className="mb-4" onSubmit={handleSubmit}>
                                    {/* Category Select */}
                                    <div className="input-wrapper d-flex flex-column position-relative mb-4">
                                        <label htmlFor="category" className="mb-1 fw-semibold">
                                            Category *
                                        </label>
                                        <div className="custom-select position-relative">
                                            <div
                                                className="select-selected"
                                                onClick={() => setCategoryOpen(!categoryOpen)}
                                            >
                                                {selectedCategory}
                                            </div>
                                            <i className="bi bi-chevron-down select-arrow"></i>
                                            {categoryOpen && (
                                                <ul className="select-options position-absolute bg-white border rounded shadow-sm w-100 mt-1 p-0">
                                                    {categories.map((cat, idx) => (
                                                        <li
                                                            key={idx}
                                                            onClick={() => handleCategorySelect(cat)}
                                                            className="p-2 hover-bg-light cursor-pointer"
                                                        >
                                                            {cat}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="row g-4">
                                        {[
                                            { label: 'City', placeholder: 'New York' },
                                            { label: 'State', placeholder: 'NY' },
                                            { label: 'Zip Code', placeholder: '12345' },
                                            { label: 'Estimate Due Date', type: 'date' },
                                            { label: 'Project Start Date', type: 'date' },
                                            { label: 'Project End Date', type: 'date' },
                                        ].map((field, i) => (
                                            <div className="col-lg-4" key={i}>
                                                <div className="input-wrapper">
                                                    <div className="label mb-1 fw-semibold">
                                                        {field.label} *
                                                    </div>
                                                    <input
                                                        type={field.type || 'text'}
                                                        placeholder={field.placeholder}
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        {/* Description with WYSIWYG Editor */}
                                        <div className="col-12">
                                            <div className="label mb-1 fw-semibold">Description *</div>
                                            <ReactQuill
                                                theme="snow"
                                                value={description}
                                                onChange={setDescription}
                                                placeholder="Write project details..."
                                                style={{ minHeight: '292px', background: '#fff' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary rounded-3 w-100 justify-content-center mt-4"
                                    >
                                        Add Project
                                    </button>
                                </form>

                                {/* Document Preview */}
                                <div className="mb-2 fw-semibold fs-5">
                                    Documents Description
                                </div>
                                <div className="image-box mb-4 text-center">
                                    <Image
                                        src="/assets/img/post.webp"
                                        className="d-block mx-auto mb-2"
                                        width={166}
                                        height={161}
                                        alt="Post Image"
                                        loading="lazy"
                                    />
                                    {files.length === 0 ? (
                                        <div className="fs-14 fw-medium">No Document added</div>
                                    ) : (
                                        <div className="fs-14 fw-medium">
                                            {files.length} file(s) uploaded
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Section: Attachment Upload */}
                            <div className="col-lg-4">
                                <div className="attachment-wrapper">
                                    <div className="fw-semibold mb-3">Attachment</div>
                                    <div
                                        className="attachment-box"
                                        id="dropZone"
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <div className="upload-content text-center">
                                            <div className="upload-icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    style={{ stroke: '#272727' }}
                                                    width="55"
                                                    height="55"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.8"
                                                        d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v4h16v-4"
                                                    />
                                                </svg>
                                            </div>
                                            <p>
                                                Drag and drop files here
                                                <br />or click to upload
                                            </p>
                                            <small>Supported: .pdf, .doc, .xml, .jpeg (Max 10MB)</small>
                                        </div>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            ref={fileInputRef}
                                            hidden
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    {/* Uploaded Files List */}
                                    {files.length > 0 && (
                                        <ul className="mt-3 list-unstyled">
                                            {files.map((file, index) => (
                                                <li
                                                    key={index}
                                                    className="fs-14 border p-2 rounded mb-2"
                                                >
                                                    {file.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
