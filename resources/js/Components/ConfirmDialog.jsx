import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import DangerButton from './DangerButton';
import SecondaryButton from './SecondaryButton';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ConfirmDialog({ show, title, message, confirmLabel = 'Confirm', variant = 'danger', onConfirm, onCancel, processing = false }) {
    const ButtonComponent = variant === 'danger' ? DangerButton : PrimaryButton;

    return (
        <Modal show={show} onClose={onCancel} maxWidth="sm">
            <div className="text-center sm:text-left">
                <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
                <ButtonComponent onClick={onConfirm} disabled={processing}>
                    {processing ? 'Processing...' : confirmLabel}
                </ButtonComponent>
            </div>
        </Modal>
    );
}
