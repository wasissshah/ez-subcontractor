import { Suspense } from 'react';
import ProjectDetailsForm from './ProjectDetailsForm';

export default async function ProjectDetailsPage({
                                                     searchParams,
                                                 }: {
    searchParams: Promise<{ id?: string }>;
}) {
    return (
        <Suspense fallback={
            <div className="sections overflow-hidden">
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading project details...</p>
                </div>
            </div>
        }>
            <ProjectDetailsForm searchParams={searchParams} />
        </Suspense>
    );
}