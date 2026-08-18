import PageHeader from '@/components/layouts/PageHeader';
import ProfileForm from '../forms/ProfileForm';

export default function ProfilePage() {
    return (
        <div>
            <div className="mb-6">
                <PageHeader title="Profile" subTitle="Update your personal information."/>
            </div>
            <div className="mx-auto w-full max-w-2xl">
                <ProfileForm />
            </div>
        </div>
    );
}