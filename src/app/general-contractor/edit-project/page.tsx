import {Suspense} from 'react';
import EditProjectForm from './EditProjectForm';

// 🔹 Next.js automatically injects searchParams as a Promise when using this signature
export default async function EditProjectPage({
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
            <EditProjectForm searchParams={searchParams}/>
        </Suspense>
    );
}