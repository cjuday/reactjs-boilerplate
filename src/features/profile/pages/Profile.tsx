import ProfileForm from '../forms/ProfileForm';

export default function ProfilePage() {
    return (
        <div className="ml-4 max-w-2xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Update your personal information.
                </p>
            </div>

            <ProfileForm />
        </div>
    );
}