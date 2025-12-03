// app/general-contractor/edit-project/[id]/page.tsx
import { Suspense } from 'react';
import EditProjectClient from './EditProjectClient';

export default function EditProjectPage({
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
                    <p className="mt-3">Loading project...</p>
                </div>
            </div>
        }>
            <EditProjectClient projectId={params.id} />
        </Suspense>
    );
}