import { Mail } from 'lucide-react';
import { Button } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';
import { formatCountdown } from '@/shared/utils/formatCountdown';

interface VerifyEmailModalProps {
  open: boolean;
  email: string;
  onResend: () => void;
  onClose: () => void;
  countdown: number;
  isResending?: boolean;
}

export default function VerifyEmailModal({ open, email, onResend, onClose, countdown, isResending = false }: VerifyEmailModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Verify your email"
      size="md"
      showCloseButton
      closeOnEsc
      closeOnOutsideClick
    >
      <div className="flex flex-col items-center text-center">

        <div className="mb-5 rounded-full bg-blue-100 p-4">
          <Mail
            className="text-blue-600"
            size={32}
          />
        </div>

        <p className="text-slate-600">
          We've sent a verification email to
        </p>

        <p className="mt-2 font-semibold break-all">
          {email}
        </p>

        <p className="mt-5 text-sm text-slate-500">
          Please verify your email before continuing.
        </p>

        <Button
          className="mt-6"
          fullWidth
          disabled={countdown > 0}
          loading={isResending}
          onClick={onResend}
        >
          {countdown > 0
            ? `Resend in ${formatCountdown(countdown)}`
            : 'Resend Email'
          }
        </Button>
      </div>
    </Modal>
  );
}