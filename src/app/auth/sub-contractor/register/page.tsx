'use client';
import '../../../../styles/login.css';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isAgreed, setIsAgreed] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!isAgreed) {
            newErrors.agreement = 'You must accept the Privacy Policy and Terms & Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Registration data:', formData);
            // Redirect to subscription page
            router.push('/sub-contractor/subscription');
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
                    <span className="text-primary fw-semibold"> Design Spartans</span>
                </p>
            </div>

            <div className="row">
                <div className="col-lg-6 offset-lg-6">
                    <div
                        style={{ padding: '20px' }}
                        className="content-wrapper d-flex align-items-center justify-content-center"
                    >
                        <div style={{ maxWidth: '482px' }} className="content w-100 mx-auto">
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

                            <div className="fw-semibold fs-2 mb-4 text-center">Register</div>

                            <div className="register-topbar mb-3">
                                <Image
                                    src="/assets/img/icons/settings.svg"
                                    width={50}
                                    height={50}
                                    alt="Worker Image"
                                />
                                <div className="fw-semibold">Subcontractor</div>
                            </div>

                            <form className="form" onSubmit={handleSubmit}>
                                <div className="input-wrapper d-flex flex-column">
                                    <label htmlFor="fullName" className="mb-1 fw-semibold">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Jason Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                    {errors.fullName && <span className="text-danger fs-6">{errors.fullName}</span>}
                                </div>

                                <div className="input-wrapper d-flex flex-column">
                                    <label htmlFor="companyName" className="mb-1 fw-semibold">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        placeholder="Jason Tiles Limited"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                    {errors.companyName && <span className="text-danger fs-6">{errors.companyName}</span>}
                                </div>

                                <div className="input-wrapper d-flex flex-column">
                                    <label htmlFor="email" className="mb-1 fw-semibold">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="hello@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="text-danger fs-6">{errors.email}</span>}
                                </div>

                                <div className="input-wrapper d-flex flex-column">
                                    <label htmlFor="phone" className="mb-1 fw-semibold">
                                        Phone Number *
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        className="form-control"
                                        placeholder="(000) 000-0000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && <span className="text-danger fs-6">{errors.phone}</span>}
                                </div>

                                <div className="input-wrapper d-flex flex-column position-relative">
                                    <label htmlFor="password" className="mb-1 fw-semibold">
                                        Password *
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="form-control pe-5"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <span
                                        className="toggle-password position-absolute"
                                        style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                                    </span>
                                    {errors.password && <span className="text-danger fs-6">{errors.password}</span>}
                                </div>

                                <div className="input-wrapper d-flex flex-column position-relative">
                                    <label htmlFor="confirmPassword" className="mb-1 fw-semibold">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control pe-5"
                                        placeholder="Re enter password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <span
                                        className="toggle-password position-absolute"
                                        style={{ right: '10px', top: '38px', cursor: 'pointer' }}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <i className={`bi ${showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                                    </span>
                                    {errors.confirmPassword && <span className="text-danger fs-6">{errors.confirmPassword}</span>}
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={isAgreed}
                                            onChange={() => setIsAgreed(!isAgreed)}
                                            id="agreement"
                                        />
                                        <label
                                            className="form-check-label fw-semibold"
                                            htmlFor="agreement"
                                        >
                                            By registering, you confirm that you have reviewed and
                                            accepted our{' '}
                                            <Link href="#" className="text-primary">
                                                Privacy Policy
                                            </Link>{' '}
                                            and{' '}
                                            <Link href="#" className="text-primary">
                                                Terms &amp; Conditions.
                                            </Link>
                                        </label>
                                        {errors.agreement && <span className="text-danger fs-6">{errors.agreement}</span>}
                                    </div>
                                </div>

                                <input
                                    type="submit"
                                    value="Next"
                                    className="btn btn-primary w-100 rounded-3 d-block mb-2"
                                />

                                <div className="text-center fw-medium text-gray-light">
                                    Already have an account?{' '}
                                    <Link href="#" className="fw-semibold text-black">
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
