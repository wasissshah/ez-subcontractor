// app/auth/register/page.tsx
'use client';
import '../../../../styles/login.css';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Define the category type
interface Category {
    id: string;
    name: string;
}

export default function RegisterPage() {
    const router = useRouter();

    // Step 1: Registration form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company_name: '',
        password: '',
        password_confirmation: '',
    });

    // Step 2: Business details data
    const [businessData, setBusinessData] = useState({
        license_number: '',
        zip: '',
        work_radius: '',
        category: '', // Single category (string)
    });

    // Shared states
    const [currentStep, setCurrentStep] = useState(1); // 1 = Register, 2 = Business Details
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isAgreed, setIsAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Dropdown states for business details
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch categories from API on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}data/specializations`);
                const data = await response.json();

                let fetchedCategories: Category[] = [];

                if (response.ok) {
                    // Try different possible API response formats
                    if (Array.isArray(data)) {
                        fetchedCategories = data;
                    } else if (data && Array.isArray(data.data)) {
                        fetchedCategories = data.data;
                    } else if (data && Array.isArray(data.categories)) {
                        fetchedCategories = data.categories;
                    } else {
                        console.warn('Unexpected API response format:', data);
                    }
                } else {
                    console.error('Failed to fetch categories:', data.message);
                }

                // Set categories (ensure it's always an array)
                setCategories(fetchedCategories.length > 0 ? fetchedCategories : [
                    { id: '1', name: 'Plumbing' },
                    { id: '2', name: 'Electric Work' },
                    { id: '3', name: 'Framing' },
                    { id: '4', name: 'Roofing' },
                ]);
            } catch (err) {
                console.error('Error fetching categories:', err);
                // Fallback categories if API fails
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

    // Handle form input changes for Step 1
    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof typeof errors];
                return newErrors;
            });
        }
    };

    // Handle form input changes for Step 2
    const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBusinessData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof typeof errors];
                return newErrors;
            });
        }
    };

    // Validate Step 1
    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Full Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone Number is required';
        }

        if (!formData.company_name.trim()) {
            newErrors.company_name = 'Company Name is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.password_confirmation.trim()) {
            newErrors.password_confirmation = 'Confirm Password is required';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        if (!isAgreed) {
            newErrors.agreement = 'You must agree to the terms and conditions';
        }

        return newErrors;
    };

    // Validate Step 2
    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};

        if (!businessData.category) {
            newErrors.category = 'Please select a category';
        }

        if (!businessData.license_number.trim()) {
            newErrors.license_number = 'License Number is required';
        }

        if (!businessData.zip.trim()) {
            newErrors.zip = 'Zip Code is required';
        }

        if (!businessData.work_radius.trim()) {
            newErrors.work_radius = 'Work Radius is required';
        }

        return newErrors;
    };

    // Handle Step 1 submission (validate and go to Step 2)
    const handleStep1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const newErrors = validateStep1();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            console.log('Validation failed:', newErrors);
            return;
        }

        // ✅ Step 1 passed - go to Step 2
        console.log('✅ Step 1 passed! Moving to Step 2...');
        setCurrentStep(2);
        setIsLoading(false);
    };

    // Handle Step 2 submission (complete registration with full API payload)
    const handleStep2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const newErrors = validateStep2();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const finalPayload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company_name: formData.company_name,
                license_number: businessData.license_number,
                zip: businessData.zip,
                work_radius: parseInt(businessData.work_radius) || 0,
                category: [parseInt(businessData.category)], // Array of single category
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                role: 'subcontractor',
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalPayload),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('✅ Registration completed:', data);
                router.push('/sub-contractor/subscription');
            } else {
                setErrors({ api: data.message || 'Registration failed' });
            }
        } catch (err) {
            setErrors({ api: 'Something went wrong. Please try again.' });
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="hero-sec login overflow-hidden position-static">
            <div className="image-wrapper">
                <Image
                    src="/assets/img/left-image.webp"
                    className="left-image"
                    alt="Section Image"
                    width={500}
                    height={800}
                />
                <p className="main-title mb-0">
                    Developed by:
                    <Link href="https://designspartans.com/" target="_blank" className="text-primary fw-semibold"> Design Spartans</Link>
                </p>
            </div>

            <div className="row">
                <div className="col-lg-6 offset-lg-6">
                    <div
                        style={{ padding: '20px' }}
                        className="content-wrapper d-flex align-items-center justify-content-center"
                    >
                        <div style={{ maxWidth: '482px', position: 'relative', minHeight: '600px' }} className="content w-100 mx-auto">
                            <Link href="/" className="d-block mb-4">
                                <Image
                                    src="/assets/img/icons/logo.webp"
                                    width={350}
                                    height={100}
                                    alt="Login Logo"
                                    style={{ maxWidth: '350px' }}
                                    className="img-fluid d-block w-100 mx-auto"
                                />
                            </Link>

                            {/* Step Container with Animation */}
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                {/* Step 1: Registration Form */}
                                {currentStep === 1 && (
                                    <div
                                        className="step-one transition-all duration-300 ease-in-out"
                                        style={{ transition: 'all 0.3s ease-in-out' }}
                                    >
                                        <div className="fw-semibold fs-2 mb-4 text-center">Register</div>

                                        <div className="register-topbar mb-3">
                                            <Image
                                                src="/assets/img/construction-worker-big.webp"
                                                width={50}
                                                height={50}
                                                alt="Worker Image"
                                            />
                                            <div className="fw-semibold">Subcontractor</div>
                                        </div>

                                        <form className="form" onSubmit={handleStep1Submit}>
                                            <div className="input-wrapper d-flex flex-column">
                                                <label htmlFor="name" className="mb-1 fw-semibold">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleRegisterChange}
                                                />
                                                {errors.name && <span className="text-danger animate-slide-up">{errors.name}</span>}
                                            </div>

                                            <div className="input-wrapper d-flex flex-column">
                                                <label htmlFor="email" className="mb-1 fw-semibold">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleRegisterChange}
                                                />
                                                {errors.email && <span className="text-danger animate-slide-up">{errors.email}</span>}
                                            </div>

                                            <div className="input-wrapper d-flex flex-column">
                                                <label htmlFor="phone" className="mb-1 fw-semibold">
                                                    Phone Number
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="(555) 123-4567"
                                                    value={formData.phone}
                                                    onChange={handleRegisterChange}
                                                />
                                                {errors.phone && <span className="text-danger animate-slide-up">{errors.phone}</span>}
                                            </div>

                                            <div className="input-wrapper d-flex flex-column">
                                                <label htmlFor="company_name" className="mb-1 fw-semibold">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="company_name"
                                                    name="company_name"
                                                    placeholder="JD Construction"
                                                    value={formData.company_name}
                                                    onChange={handleRegisterChange}
                                                />
                                                {errors.company_name && <span className="text-danger animate-slide-up">{errors.company_name}</span>}
                                            </div>

                                            <div className="input-wrapper d-flex flex-column position-relative">
                                                <label htmlFor="password" className="mb-1 fw-semibold">
                                                    Password
                                                </label>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    id="password"
                                                    name="password"
                                                    className="form-control pe-5"
                                                    placeholder="Password123"
                                                    value={formData.password}
                                                    onChange={handleRegisterChange}
                                                />
                                                <span
                                                    className="toggle-password position-absolute"
                                                    style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                                                </span>
                                                {errors.password && <span className="text-danger animate-slide-up">{errors.password}</span>}
                                            </div>

                                            <div className="input-wrapper d-flex flex-column position-relative">
                                                <label htmlFor="password_confirmation" className="mb-1 fw-semibold">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    className="form-control pe-5"
                                                    placeholder="Password123"
                                                    value={formData.password_confirmation}
                                                    onChange={handleRegisterChange}
                                                />
                                                <span
                                                    className="toggle-password position-absolute"
                                                    style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    <i className={`bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                                                </span>
                                                {errors.password_confirmation && <span className="text-danger animate-slide-up">{errors.password_confirmation}</span>}
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="agreement"
                                                        checked={isAgreed}
                                                        onChange={() => setIsAgreed(!isAgreed)}
                                                    />
                                                    <label className="form-check-label fw-semibold" htmlFor="agreement">
                                                        By registering, you confirm that you have reviewed and accepted our{' '}
                                                        <Link href="#" className="text-primary">
                                                            Privacy Policy
                                                        </Link>{' '}
                                                        and{' '}
                                                        <Link href="#" className="text-primary">
                                                            Terms &amp; Conditions.
                                                        </Link>
                                                    </label>
                                                    {errors.agreement && <span className="text-danger animate-slide-up d-block">{errors.agreement}</span>}
                                                </div>
                                            </div>

                                            {/* API Error Message */}
                                            {errors.api && <p className="text-danger animate-slide-up mb-3">{errors.api}</p>}

                                            <input
                                                type="submit"
                                                value={isLoading ? 'Validating...' : 'Next'}
                                                disabled={isLoading}
                                                className="btn btn-primary w-100 rounded-3 d-block mb-2"
                                            />

                                            <div className="text-center fw-medium text-gray-light">
                                                Already have an account?{' '}
                                                <Link href="/auth/login" className="fw-semibold text-black">
                                                    Login
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Step 2: Business Details Form */}
                                {currentStep === 2 && (
                                    <div
                                        className="step-two transition-all duration-300 ease-in-out"
                                        style={{ transition: 'all 0.3s ease-in-out' }}
                                    >
                                        <div className="fw-semibold fs-2 mb-4 text-center">Business Details</div>

                                        <div className="register-topbar justify-content-start mb-3 d-flex align-items-center gap-2">
                                            <Image
                                                src="/assets/img/icons/settings.svg"
                                                width={50}
                                                height={50}
                                                alt="Worker Image"
                                            />
                                            <div className="fw-semibold">Subcontractor</div>
                                        </div>

                                        <form className="form" onSubmit={handleStep2Submit}>
                                            {/* Custom Select */}
                                            <div
                                                className="input-wrapper d-flex flex-column position-relative"
                                                ref={dropdownRef}
                                            >
                                                <label htmlFor="category" className="mb-1 fw-semibold">
                                                    Category *
                                                </label>
                                                {categoriesLoading ? (
                                                    <div className="select-selected text-gray-500">
                                                        Loading categories...
                                                    </div>
                                                ) : categories.length > 0 ? (
                                                    <div className={`custom-select ${dropdownOpen ? 'open' : ''}`}>
                                                        <div
                                                            className="select-selected"
                                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                                        >
                                                            {businessData.category
                                                                ? categories.find((c) => c.id === businessData.category)?.name
                                                                : 'Select category'}
                                                        </div>

                                                        {/* Static SVG Arrow */}
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
                                                                        setBusinessData(prev => ({ ...prev, category: cat.id }));
                                                                        setDropdownOpen(false);
                                                                    }}
                                                                >
                                                                    {cat.name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <div className="select-selected text-danger">
                                                        No categories available
                                                    </div>
                                                )}
                                                {errors.category && <span className="text-danger animate-slide-up">{errors.category}</span>}
                                            </div>

                                            {/* License Number */}
                                            <div className="input-wrapper d-flex flex-column">
                                                <label htmlFor="license_number" className="mb-1 fw-semibold">
                                                    License Number
                                                </label>
                                                <input
                                                    type="text"
                                                    id="license_number"
                                                    name="license_number"
                                                    placeholder="LIC123456"
                                                    value={businessData.license_number}
                                                    onChange={handleBusinessChange}
                                                />
                                                {errors.license_number && <span className="text-danger animate-slide-up">{errors.license_number}</span>}
                                            </div>

                                            {/* Zip Code */}
                                            <div className="input-wrapper d-flex flex-column">
                                                <label htmlFor="zip" className="mb-1 fw-semibold">
                                                    Zip Code
                                                </label>
                                                <input
                                                    type="text"
                                                    id="zip"
                                                    name="zip"
                                                    placeholder="12345"
                                                    value={businessData.zip}
                                                    onChange={handleBusinessChange}
                                                />
                                                {errors.zip && <span className="text-danger animate-slide-up">{errors.zip}</span>}
                                            </div>

                                            {/* Work Radius */}
                                            <div className="input-wrapper d-flex flex-column">
                                                <label htmlFor="work_radius" className="mb-1 fw-semibold">
                                                    Work Radius (miles)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="work_radius"
                                                    name="work_radius"
                                                    placeholder="25"
                                                    value={businessData.work_radius}
                                                    onChange={handleBusinessChange}
                                                />
                                                {errors.work_radius && <span className="text-danger animate-slide-up">{errors.work_radius}</span>}
                                            </div>

                                            {/* API Error Message */}
                                            {errors.api && <p className="text-danger animate-slide-up mb-3">{errors.api}</p>}

                                            {/* ✅ Removed Back Button - Only Submit Button */}
                                            <input
                                                type="submit"
                                                value={isLoading ? 'Registering...' : 'Complete Registration'}
                                                disabled={isLoading}
                                                className="btn btn-primary w-100 rounded-3 d-block"
                                            />
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}