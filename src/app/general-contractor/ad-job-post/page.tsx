'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../../styles/profile.css';
import '../../../styles/post-detail.css';
import 'react-quill/dist/quill.snow.css';

// SSR ke liye dynamic import
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function PostAd() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectOpen, setSelectOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [description, setDescription] = useState('');
    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);

    // 🆕 Form ke input fields ke liye state
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [estimateDueDate, setEstimateDueDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const categories = [
        { id: '1', name: 'Plumbing' },
        { id: '2', name: 'Electric Work' },
        { id: '3', name: 'Framing' },
        { id: '4', name: 'Roofing' },
    ];

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSelectOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    // 🆕 API Call aur Validation ke liye function
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔒 Basic validation
        if (!selectedCategory) {
            alert('Please select a category.');
            return;
        }
        if (!city.trim() || !state.trim() || !zip.trim()) {
            alert('City, State, and Zip Code are required.');
            return;
        }
        if (!estimateDueDate || !startDate || !endDate) {
            alert('All dates are required.');
            return;
        }
        if (!description.trim()) {
            alert('Description is required.');
            return;
        }

        try {
            // 1. Token get karo (local storage se)
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authentication token not found. Please login again.');
                return;
            }

            // 2. FormData object banayein
            const formData = new FormData();

            // 3. Sab data add karo (Postman screenshot ke hisaab se)
            formData.append('title', 'New Project');
            formData.append('description', description);
            formData.append('category_id', selectedCategory); // Selected category ID
            formData.append('city', city);
            formData.append('state', state);
            formData.append('zip', zip);
            formData.append('estimate_due_date', estimateDueDate);
            formData.append('start_date', startDate);
            formData.append('end_date', endDate);
            formData.append('status', 'pending');
            formData.append('attachments[0][file]', '<select file> (blueprint.pdf)');
            formData.append('attachments[0][description]', 'Blueprint');
            formData.append('attachments[1][file]', '<select file> (site.pdf)');
            formData.append('attachments[1][description]', 'Site photo');



            // 4. Attachments add karo
            // uploadedFiles.forEach((file, index) => {
            //     formData.append(`attachments[${index}][file]`, file);
            //     formData.append(`attachments[${index}][description]`, file.name); // File name as description
            // });


            // 5. API call karo — Postman ke screenshot ke hisaab se headers aur auth
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}common/projects/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json', // Explicitly add Accept header
                    'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data+'abc');

            // 6. Response check karo
            if (response.ok) {
                const result = await response.json();
                console.log('✅ Project created successfully:', result);
                router.push('/general_contractor/add-attachment');
            } else {
                const errorData = await response.json();
                const errorMsg = errorData.message || 'Failed to create project.';
                console.error('❌ API Error Response:', errorData);
                alert(`Error: ${errorMsg}`);
            }

        } catch (error) {
            console.error('💥 Network or unexpected error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

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
                                {/* ✅ Only onSubmit — no onClick on button */}
                                <form onSubmit={handleSubmit} className="mb-4">
                                    {/* Custom Select */}
                                    <div
                                        className="input-wrapper d-flex flex-column position-relative mb-4"
                                        ref={dropdownRef}
                                    >
                                        <label htmlFor="category" className="mb-1 fw-semibold">Category *</label>
                                        <div className={`custom-select position-relative ${selectOpen ? 'open' : ''}`}>
                                            <div
                                                className="select-selected"
                                                onClick={() => setSelectOpen(!selectOpen)}
                                            >
                                                {selectedCategory
                                                    ? categories.find((c) => c.id === selectedCategory)?.name
                                                    : 'Select category'}
                                            </div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="select-arrow"
                                                viewBox="0 0 16 16"
                                                style={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                }}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                                />
                                            </svg>
                                            <ul className="select-options">
                                                {categories.map((cat) => (
                                                    <li
                                                        key={cat.id}
                                                        data-value={cat.id}
                                                        onClick={() => {
                                                            setSelectedCategory(cat.id);
                                                            setSelectOpen(false);
                                                        }}
                                                    >
                                                        {cat.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Input Fields */}
                                    <div className="row g-4">
                                        {[
                                            { label: "City *", type: "text", placeholder: "New York", value: city, onChange: setCity },
                                            { label: "State *", type: "text", placeholder: "NY", value: state, onChange: setState },
                                            { label: "Zip Code *", type: "text", placeholder: "12345", value: zip, onChange: setZip },
                                            { label: "Estimate Due Date *", type: "date", value: estimateDueDate, onChange: setEstimateDueDate },
                                            { label: "Project Start Date *", type: "date", value: startDate, onChange: setStartDate },
                                            { label: "Project End Date *", type: "date", value: endDate, onChange: setEndDate }
                                        ].map((field, index) => (
                                            <div className="col-lg-4" key={index}>
                                                <div className="input-wrapper">
                                                    <div className="label mb-1 fw-semibold">{field.label}</div>
                                                    <input
                                                        type={field.type}
                                                        placeholder={field.placeholder || ''}
                                                        value={field.value}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        {/* Description */}
                                        <div className="col-12">
                                            <div className="label mb-1 fw-semibold">Description *</div>
                                            <div className="input-wrapper">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={description}
                                                    onChange={setDescription}
                                                    placeholder="Message"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ✅ Submit Button — sirf type="submit" */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary rounded-3 w-100 justify-content-center"
                                    >
                                        Add Project
                                    </button>
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