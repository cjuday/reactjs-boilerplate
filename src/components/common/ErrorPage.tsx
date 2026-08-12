import { Button } from '@/components/ui';

interface ErrorPageProps {
    statusCode: 403 | 404 | 500;
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function ErrorPage({ statusCode, title, message, actionLabel = 'Go to Dashboard', onAction }: ErrorPageProps) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center p-6">
            <div className="w-full max-w-md text-center">
                <p className="text-7xl font-bold text-primary">
                    {statusCode}
                </p>

                <h1 className="mt-4 text-2xl font-semibold text-foreground">
                    {title}
                </h1>

                <p className="mt-2 text-sm text-muted">
                    {message}
                </p>

                {onAction && (
                    <Button
                        className="mt-6"
                        onClick={onAction}
                    >
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    );
}