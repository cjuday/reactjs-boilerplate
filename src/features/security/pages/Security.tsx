import ChangePasswordForm from '../forms/ChangePasswordForm';

export default function SecurityPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">
                    Security
                </h1>

                <p className="mt-1 text-sm text-muted">
                    Manage your account security settings.
                </p>
                <hr className='border-border mt-1'/>
            </div>
            <div className="mx-auto w-full max-w-2xl">
                <ChangePasswordForm />
            </div>
        </div>
    );
}