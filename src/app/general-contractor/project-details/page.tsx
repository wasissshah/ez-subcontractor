// app/general-contractor/project-details/[id]/page.tsx
import { Suspense } from 'react';
import ProjectDetailsClient from './ProjectDetailsClient';

export default function ProjectDetailsPage({
                                               params,
                                           }: {
    params: { id: string };
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
            <ProjectDetailsClient projectId={params.id} />
        </Suspense>
    );
}