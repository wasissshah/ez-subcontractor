import {Suspense} from 'react';
import ProjectDetailsPage from './ProjectDetailsForm';

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
                </div>
            </div>
        }>
            <ProjectDetailsPage searchParams={searchParams}/>
        </Suspense>
    );
}