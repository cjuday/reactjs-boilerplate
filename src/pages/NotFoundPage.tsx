import { useNavigate } from 'react-router-dom';
import ErrorPage from '@/components/common/ErrorPage';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <ErrorPage
            statusCode={404}
            title="Page not found"
            message="The page you're looking for doesn't exist or may have been moved."
            actionLabel="Go to Dashboard"
            onAction={() => navigate('/dashboard')}
        />
    );
}