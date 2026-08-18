import PageHeader from '@/components/layouts/PageHeader';
import ChangePasswordForm from '../forms/ChangePasswordForm';

export default function SecurityPage() {
    return (
        <div className="space-y-6">
            <div>
                <PageHeader title="Security" subTitle="Manage your account security settings."/>
            </div>
            <div className="mx-auto w-full max-w-2xl">
                <ChangePasswordForm />
            </div>
        </div>
    );
}