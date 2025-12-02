'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/Image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../styles/profile.css';
import '../../../styles/post-detail.css';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Category {
    id: string;
    name: string;
}

// 📄 Document Interface — exact AddAttachment jaisa
interface DocumentItem {
    id: string;
    name: string;
    description: string;
    file: File; // 👈 Store actual file for API
    url?: string; // 👈 For preview
}

export default function PostAd() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectOpen, setSelectOpen] = useState(false);
    const [description, setDescription] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 🆕 Error state — matching RegisterPage behavior
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Form fields — ✅ All empty now
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [estimateDueDate, setEstimateDueDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 🔹 NEW: API submission state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Categories
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    // 🔹 Helper: Clear specific field error
    const clearError = (field: string) => {
        setErrors(prev => {
            const { [field]: _, ...rest } = prev;
            return rest;
        });
    };

    // 🔹 Helper: Input change with auto-clear
    const handleInputChange =
        (setter: (v: string) => void, field: string) =>
            (value: string) => {
                setter(value);
                clearError(field);
            };

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}data/specializations`, {
                    headers: { 'Accept': 'application/json' },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                let fetchedCategories: Category[] = [];
                if (Array.isArray(data)) {
                    fetchedCategories = data.map(item => ({ id: String(item.id), name: item.name }));
                } else if (data?.data?.specializations && Array.isArray(data.data.specializations)) {
                    fetchedCategories = data.data.specializations.map((item: any) => ({
                        id: String(item.id),
                        name: item.name,
                    }));
                } else if (data?.data && Array.isArray(data.data)) {
                    fetchedCategories = data.data.map((item: any) => ({
                        id: String(item.id),
                        name: item.name,
                    }));
                }

                setCategories(fetchedCategories.length > 0 ? fetchedCategories : [
                    { id: '1', name: 'Plumbing' },
                    { id: '2', name: 'Electric Work' },
                    { id: '3', name: 'Framing' },
                    { id: '4', name: 'Roofing' },
                ]);
            } catch (err) {
                console.error('Failed to load categories:', err);
                setCategories([
                    { id: '1', name: 'Plumbing' },
                    { id: '2', name: 'Electric Work' },
                    { id: '3', name: 'Framing' },
                    { id: '4', name: 'Roofing' },
                ]);
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSelectOpen(false);
                clearError('category');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 📁 File handling — converted to DocumentItem format with actual File object
    const [allDocuments, setAllDocuments] = useState<DocumentItem[]>([]);

    const makeDoc = (file: File, offset = 0): DocumentItem => {
        const doc: DocumentItem = {
            id: `${Date.now()}-${Math.floor(Math.random() * 100000)}-${offset}`,
            name: file.name,
            description: '',
            file: file,
        };

        // 👇 If it's an image, create a preview URL
        if (file.type.startsWith('image/')) {
            doc.url = URL.createObjectURL(file);
        }

        return doc;
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const newDocs = files.map((f, i) => makeDoc(f, i));
        setAllDocuments(prev => [...prev, ...newDocs]);
        e.target.value = ''; // reset input
        clearError('attachments');
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files || []);
        if (files.length === 0) return;

        const newDocs = files.map((f, i) => makeDoc(f, i));
        setAllDocuments(prev => [...prev, ...newDocs]);
        clearError('attachments');
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleRemoveFile = (id: string) => {
        setAllDocuments(prev => {
            // 👇 Revoke the URL to avoid memory leak
            const docToRemove = prev.find(doc => doc.id === id);
            if (docToRemove?.url) {
                URL.revokeObjectURL(docToRemove.url);
            }
            return prev.filter(doc => doc.id !== id);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 🔒 Validation
        const newErrors: Record<string, string> = {};

        if (!selectedCategory || selectedCategory === '') {
            newErrors.category = 'Please select a category.';
        }

        if (!city.trim()) newErrors.city = 'City is required.';
        if (!state.trim()) newErrors.state = 'State is required.';
        if (!zip.trim()) newErrors.zip = 'Zip Code is required.';
        if (!estimateDueDate) newErrors.estimateDueDate = 'Estimate Due Date is required.';
        if (!startDate) newErrors.startDate = 'Project Start Date is required.';
        if (!endDate) newErrors.endDate = 'Project End Date is required.';
        if (!description.trim()) newErrors.description = 'Description is required.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTimeout(() => {
                const firstError = document.querySelector('.text-danger');
                firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            return;
        }

        // 🚀 Start submission
        setIsSubmitting(true);
        setErrors({});

        try {
            const token = localStorage.getItem('token');
            if (!token || token.trim() === '') {
                setErrors({ api: 'Authentication required. Please log in.' });
                router.push('/auth/login');
                return;
            }

            const formData = new FormData();
            formData.append('title', 'New Project');
            formData.append('description', description);
            formData.append('city', city);
            formData.append('state', state);
            formData.append('category_id', selectedCategory);
            formData.append('zip', zip);
            formData.append('estimate_due_date', estimateDueDate);
            formData.append('start_date', startDate);
            formData.append('end_date', endDate);
            formData.append('status', 'pending');

            allDocuments.forEach((doc, index) => {
                formData.append(`attachments[${index}][file]`, doc.file, doc.name);
                formData.append(`attachments[${index}][description]`, doc.description);
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}common/projects/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: formData,
            });

            const result = await response.json();
            console.log('API Response:', result);

            if (response.status === 401) {
                setErrors({ api: 'Session expired. Please log in again.' });
                localStorage.removeItem('token');
                router.push('/auth/login');
                return;
            }

            if (!response.ok) {
                let errorMsg = 'Failed to create project.';
                if (typeof result.message === 'string') {
                    errorMsg = result.message;
                } else if (Array.isArray(result.message)) {
                    errorMsg = result.message[0] || errorMsg;
                } else if (result.errors) {
                    const firstField = Object.keys(result.errors)[0];
                    errorMsg = result.errors[firstField][0] || errorMsg;
                } else if (typeof result.error === 'string') {
                    errorMsg = result.error;
                }

                setErrors({ api: errorMsg });
                return;
            }

            // ✅ Success
            console.log('✅ Project created:', result);
            router.push('/general-contractor/edit-job-post');

        } catch (error) {
            console.error('Network error:', error);
            setErrors({ api: 'Network error. Please check your connection.' });
        } finally {
            setIsSubmitting(false);
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

                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="row g-3">
                                {/* LEFT SIDE */}
                                <div className="col-lg-8">
                                    {/* Category Dropdown */}
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
                                                    ? categories.find((c) => c.id === selectedCategory)?.name || 'Select category'
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
                                                            clearError('category');
                                                        }}
                                                    >
                                                        {cat.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {errors.category && (
                                            <span className="text-danger animate-slide-up">{errors.category}</span>
                                        )}
                                    </div>

                                    {/* Input Fields */}
                                    <div className="row g-4">
                                        {[
                                            {
                                                label: 'City *',
                                                value: city,
                                                setter: setCity,
                                                field: 'city',
                                                type: 'text',
                                                placeholder: 'Enter city',
                                            },
                                            {
                                                label: 'State *',
                                                value: state,
                                                setter: setState,
                                                field: 'state',
                                                type: 'text',
                                                placeholder: 'Enter state',
                                            },
                                            {
                                                label: 'Zip Code *',
                                                value: zip,
                                                setter: setZip,
                                                field: 'zip',
                                                type: 'text',
                                                placeholder: 'Enter ZIP',
                                            },
                                            {
                                                label: 'Estimate Due Date *',
                                                value: estimateDueDate,
                                                setter: setEstimateDueDate,
                                                field: 'estimateDueDate',
                                                type: 'date',
                                            },
                                            {
                                                label: 'Project Start Date *',
                                                value: startDate,
                                                setter: setStartDate,
                                                field: 'startDate',
                                                type: 'date',
                                            },
                                            {
                                                label: 'Project End Date *',
                                                value: endDate,
                                                setter: setEndDate,
                                                field: 'endDate',
                                                type: 'date',
                                            },
                                        ].map((field, index) => (
                                            <div className="col-lg-4" key={index}>
                                                <div className="input-wrapper">
                                                    <div className="label mb-1 fw-semibold">{field.label}</div>
                                                    <input
                                                        type={field.type}
                                                        placeholder={field.placeholder || ''}
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange(field.setter, field.field)(e.target.value)}
                                                        required
                                                    />
                                                    {errors[field.field] && (
                                                        <span className="text-danger animate-slide-up">
                                                            {errors[field.field]}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Description */}
                                        <div className="col-12">
                                            <div className="label mb-1 fw-semibold">Description *</div>
                                            <div className="input-wrapper mb-5 d-block">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={description}
                                                    onChange={(val) => {
                                                        setDescription(val);
                                                        clearError('description');
                                                    }}
                                                    placeholder="Write project description..."
                                                />
                                                {errors.description && (
                                                    <span className="text-danger animate-slide-up">
                                                        {errors.description}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Documents Description — Now just a heading */}
                                    <div className="mb-2 fw-semibold fs-5">Documents Description</div>
                                    <div className="documents-wrapper mb-4">
                                        {allDocuments.length === 0 ? (
                                            <div className="text-center">
                                                <Image
                                                    src="/assets/img/post.webp"
                                                    className="d-block mx-auto mb-2"
                                                    width={166}
                                                    height={161}
                                                    alt="No Document"
                                                    loading="lazy"
                                                />
                                                <div className="fs-14 fw-medium">No Document added</div>
                                            </div>
                                        ) : (
                                            allDocuments.map((doc) => (
                                                <div
                                                    className="document-item mb-3 p-2 border rounded d-flex align-items-center justify-content-between"
                                                    key={doc.id}
                                                >
                                                    <div className="d-flex align-items-center gap-2">
                                                        {/* File Icon or Preview based on extension */}
                                                        {doc.name.endsWith('.pdf') ? (
                                                            <img
                                                                src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg    "
                                                                width={24}
                                                                height={24}
                                                                alt="PDF"
                                                                className="me-2"
                                                            />
                                                        ) : doc.name.endsWith('.doc') || doc.name.endsWith('.docx') ? (
                                                            <img
                                                                src="https://upload.wikimedia.org/wikipedia/commons/4/43/Microsoft_Word_2013_logo.svg    "
                                                                width={24}
                                                                height={24}
                                                                alt="DOC"
                                                                className="me-2"
                                                            />
                                                        ) : doc.url ? (
                                                            // 👇 Show actual image preview
                                                            <Image
                                                                src={doc.url}
                                                                width={24}
                                                                height={24}
                                                                alt={doc.name}
                                                                className="me-2"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <img
                                                                src="https://upload.wikimedia.org/wikipedia/commons/4/48/Image_file_icon.svg    "
                                                                width={24}
                                                                height={24}
                                                                alt="File"
                                                                className="me-2"
                                                            />
                                                        )}
                                                        <span className="d-block fs-14 fw-semibold">{doc.name}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger ms-2"
                                                        onClick={() => handleRemoveFile(doc.id)}
                                                        aria-label="Remove file"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* 🔴 API-level error */}
                                    {errors.api && (
                                        <div className="my-4">
                                            <p className="text-danger animate-slide-up">{errors.api}</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary rounded-3 w-100 justify-content-center mt-4"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Add Project'}
                                    </button>
                                </div>

                                {/* RIGHT SIDE — Only for Upload */}
                                <div className="col-lg-4">
                                    <div className="attachment-wrapper">
                                        <div className="fw-semibold mb-3">Attachment</div>
                                        <div
                                            className="attachment-box"
                                            id="dropZone"
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <div className="upload-content">
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
                                                    Drag and drop files here<br />
                                                    or click to upload
                                                </p>
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
                                        <div className="uploaded-files-preview d-flex align-items-center gap-2 flex-wrap mt-4">
                                            {allDocuments.map((doc) => (
                                                <div
                                                    key={doc.id}
                                                    className="uploaded-file-card  d-flex align-items-center justify-content-center gap-2"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '4px',
                                                        overflow: 'hidden',
                                                        backgroundColor: 'transparent',
                                                        padding: '6px',
                                                        objectFit:'contain',
                                                        border: '1px solid #B7C627',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.2s',
                                                    }}
                                                    onmouseenter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                    onmouseleave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                >
                                                    {/* File Icon or Preview based on extension */}
                                                    {doc.name.endsWith('.pdf') ? (
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg    "
                                                            width={50}
                                                            height={50}
                                                            alt="PDF"
                                                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                        />
                                                    ) : doc.name.endsWith('.doc') || doc.name.endsWith('.docx') ? (
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/4/43/Microsoft_Word_2013_logo.svg    "
                                                            width={50}
                                                            height={50}
                                                            alt="DOC"
                                                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                        />
                                                    ) : doc.url ? (
                                                        // 👇 Show actual image preview
                                                        <Image
                                                            src={doc.url}
                                                            width={50}
                                                            height={50}
                                                            alt={doc.name}
                                                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/4/48/Image_file_icon.svg    "
                                                            width={50}
                                                            height={50}
                                                            alt="File"
                                                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Uploaded Files Preview — Exact Screenshot Style */}

                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}