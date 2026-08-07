import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button, FormField, ReadonlyField } from '@/components/ui';
import { useAppSelector } from '@/app/hooks';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';

import { useProfile } from '../hooks/use-profile';
import {
    profileSchema,
    type ProfileFormValues,
} from '../schemas/profile.schema';

export default function ProfileForm() {
    const user = useAppSelector(
        (state) => state.auth.user,
    );

    const {
        update,
        isLoading,
    } = useProfile();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name ?? '',
            phoneNumber: user?.phoneNumber ?? '',
        },
    });

    useEffect(() => {
        if (!user) {
            return;
        }

        reset({
            name: user.name,
            phoneNumber: user.phoneNumber ?? '',
        });
    }, [user, reset]);

    const onSubmit = async (
        values: ProfileFormValues,
    ) => {
        console.log('Submitting...', values);
        try {
            const response = await update(
                values.name,
                values.phoneNumber,
            );

            toast.success(response.message);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    if (!user) {
        return null;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border bg-[var(--surface)] p-6 shadow-sm space-y-5"
        >
            <FormField
                label="Full Name"
                required
                placeholder="Enter your full name"
                autoComplete="name"
                registration={register('name')}
                error={errors.name?.message}
            />

            <ReadonlyField
                label="Email"
                value={user.email}
                helperText="Your email address cannot be changed."
            />

            <FormField
                label="Phone Number"
                required
                placeholder="+8801712345678"
                autoComplete="tel"
                registration={register('phoneNumber')}
                error={errors.phoneNumber?.message}
            />

            <div className="flex justify-end">
                <Button
                    type="submit"
                    loading={isLoading}
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );
}