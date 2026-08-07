import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { useVerifyEmailMutation } from '../api/authApi';
import { useAppDispatch } from '@/app/hooks';
import { updateUser } from '../store/auth.slice';

type Status = 'loading' | 'success' | 'error';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = searchParams.get('token');
    const [verifyEmail, { isSuccess, isError, error }] = useVerifyEmailMutation();
    const hasVerified = useRef(false);

    useEffect(() => {
        if (!token || hasVerified.current) return;

        hasVerified.current = true;

        (async () => {
            try {
                await verifyEmail({ token }).unwrap();

                dispatch(
                    updateUser({
                        isEmailVerified: true,
                        emailVerificationExpiresAt: null,
                    }),
                );
            } catch {
                //
            }
        })();
    }, [token, verifyEmail, dispatch]);

    let status: Status = 'loading';

    if (isSuccess) status = 'success';
    if (isError) status = 'error';

    return (
        <div className="flex min-h-screen items-center justify-center text-[var(--foreground)] p-6">
            <div className="w-full max-w-md rounded-xl border bg-[var(--surface)] p-8 shadow-sm">

                {status === 'loading' && (
                    <div className="flex flex-col items-center text-center">
                        <Loader2
                            className="animate-spin text-blue-600"
                            size={48}
                        />

                        <h2 className="mt-6 text-xl font-semibold">
                            Verifying your email...
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Please wait a moment.
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center text-center">
                        <CheckCircle
                            className="text-green-600"
                            size={56}
                        />

                        <h2 className="mt-6 text-xl font-semibold">
                            Email Verified
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Your email has been verified successfully.
                        </p>

                        <Button
                            className="mt-6"
                            fullWidth
                            onClick={() => navigate('/dashboard')}
                        >
                            Go to Dashboard
                        </Button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center text-center">
                        <XCircle
                            className="text-red-600"
                            size={56}
                        />

                        <h2 className="mt-6 text-xl font-semibold">
                            Verification Failed
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Something went wrong!
                        </p>

                        <Button
                            className="mt-6"
                            variant="outline"
                            fullWidth
                            onClick={() => navigate('/')}
                        >
                            Go to Login
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}