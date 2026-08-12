import { useNavigate } from 'react-router-dom';
import ErrorPage from '@/components/common/ErrorPage';

export default function ServerErrorPage() {
    const navigate = useNavigate();

    return (
        <ErrorPage
            statusCode={500}
            title="Something went wrong"
            message="An unexpected error occurred. Please try again later."
            actionLabel="Go to Dashboard"
            onAction={() => navigate('/dashboard')}
        />
    );
}