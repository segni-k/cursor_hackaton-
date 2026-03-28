import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { motion } from 'framer-motion';
import { QrCodeIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

export default function QRScanner() {
    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState('');
    const scannerRef = useRef(null);

    const { data, setData, post, processing } = useForm({ qr_code: '' });

    const submit = (e) => {
        e.preventDefault();
        post('/pharmacy/orders/verify-qr');
    };

    const startScanner = async () => {
        setScanning(true);
        try {
            const { Html5Qrcode } = await import('html5-qrcode');
            const scanner = new Html5Qrcode('qr-reader');
            scannerRef.current = scanner;
            await scanner.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decoded) => {
                    setData('qr_code', decoded);
                    setScanResult(decoded);
                    scanner.stop();
                    setScanning(false);
                },
                () => {}
            );
        } catch (err) {
            console.error('Scanner error:', err);
            setScanning(false);
        }
    };

    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(() => {});
            }
        };
    }, []);

    return (
        <AuthenticatedLayout header="QR Scanner">
            <Head title="QR Scanner" />

            <div className="max-w-lg mx-auto space-y-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-endode-100 dark:bg-endode-900/30 rounded-2xl flex items-center justify-center mb-4">
                        <QrCodeIcon className="h-8 w-8 text-endode-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scan Order QR Code</h2>
                    <p className="text-sm text-gray-500 mt-1">Scan the patient's QR code to verify and complete the order.</p>

                    <div className="mt-6">
                        {!scanning ? (
                            <button onClick={startScanner} className="btn-primary flex items-center gap-2 mx-auto">
                                <CameraIcon className="h-5 w-5" /> Start Camera Scanner
                            </button>
                        ) : (
                            <div className="border-2 border-endode-500 rounded-xl overflow-hidden">
                                <div id="qr-reader" className="w-full" />
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="card p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Or Enter QR Code Manually</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <TextInput
                            value={data.qr_code}
                            onChange={(e) => setData('qr_code', e.target.value)}
                            placeholder="Paste QR code here..."
                        />
                        <PrimaryButton className="w-full justify-center" disabled={processing || !data.qr_code}>
                            {processing ? 'Verifying...' : 'Verify QR Code'}
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
