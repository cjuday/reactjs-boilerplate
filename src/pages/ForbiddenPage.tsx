import { useNavigate } from 'react-router-dom';
import ErrorPage from '@/components/common/ErrorPage';

export default function ForbiddenPage() {
    const navigate = useNavigate();

    return (
        <ErrorPage
            statusCode={403}
            title="Access denied"
            message="You don't have permission to access this page."
            actionLabel="Go to Dashboard"
            onAction={() => navigate('/dashboard')}
        />
    );
}