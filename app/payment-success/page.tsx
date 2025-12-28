'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface VerificationResult {
    success: boolean;
    order_id?: string;
    total_amount?: string;
    message?: string;
    pidx?: string;
}

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const [verificationData, setVerificationData] = useState<VerificationResult | null>(null);
    const [countdown, setCountdown] = useState(5);
    const [isPopup, setIsPopup] = useState(false);

    useEffect(() => {
        // Check if opened in popup
        setIsPopup(window.opener !== null);

        // Extract pidx from URL
        const pidx = searchParams.get('pidx');
        const status = searchParams.get('status');
        const purchaseOrderId = searchParams.get('purchase_order_id');
        const transactionId = searchParams.get('transaction_id');

        console.log('Payment callback params:', { pidx, status, purchaseOrderId, transactionId });

        if (!pidx) {
            setVerificationStatus('failed');
            setVerificationData({
                success: false,
                message: 'Invalid payment link. Missing transaction ID.'
            });
            return;
        }

        // Verify payment
        verifyPayment(pidx);
    }, [searchParams]);

    const verifyPayment = async (pidx: string) => {
        try {
            console.log('Calling verification API with pidx:', pidx);

            const response = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pidx }),
            });

            const data: VerificationResult = await response.json();
            console.log('Verification response:', data);

            if (response.ok && data.success) {
                setVerificationStatus('success');
                setVerificationData(data);

                // Notify parent window (chat widget) if in popup - FIXED STRUCTURE
                if (window.opener) {
                    console.log('Sending payment success message to parent window');
                    window.opener.postMessage({
                        type: 'PAYMENT_SUCCESS',
                        data: {  // ← Wrapped in 'data' object
                            orderId: data.order_id,
                            amount: data.total_amount,
                            pidx: pidx,
                            totalAmount: data.total_amount
                        }
                    }, '*');
                }

                // Start countdown
                startCountdown();
            } else {
                setVerificationStatus('failed');
                setVerificationData(data);
            }
        } catch (error) {
            console.error('Verification error:', error);
            setVerificationStatus('failed');
            setVerificationData({
                success: false,
                message: 'Failed to verify payment. Please contact support.',
                pidx: pidx
            });
        }
    };

    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleRedirect();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleRedirect = () => {
        if (isPopup) {
            window.close();
        } else {
            router.push('/');
        }
    };

    const formatAmount = (amount: string | undefined): string => {
        if (!amount) return '0';
        const numAmount = parseFloat(amount);
        return `NPR ${numAmount.toLocaleString('en-NP')}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8">

                {/* Loading State */}
                {verificationStatus === 'loading' && (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            Verifying Your Payment...
                        </h2>
                        <p className="text-gray-600 dark:text-slate-400">
                            Please wait while we confirm your payment with Khalti.
                        </p>
                    </div>
                )}

                {/* Success State */}
                {verificationStatus === 'success' && verificationData && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            ✅ Payment Successful!
                        </h2>

                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800 rounded-lg p-4 my-4 text-left border border-teal-200 dark:border-slate-700">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-slate-400">Order ID:</span>
                                    <span className="font-semibold text-gray-800 dark:text-white">{verificationData.order_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-slate-400">Amount Paid:</span>
                                    <span className="font-semibold text-teal-700 dark:text-teal-400">
                                        {formatAmount(verificationData.total_amount)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-slate-400">Transaction ID:</span>
                                    <span className="font-mono text-xs text-gray-600 dark:text-slate-400 break-all">{verificationData.pidx}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                📧 A confirmation email has been sent to your email address.
                            </p>
                        </div>

                        <div className="text-sm text-gray-500 mb-4">
                            {isPopup ? '🔄 Returning to chat' : '🏠 Redirecting to homepage'} in <span className="font-bold text-teal-600">{countdown}</span> seconds...
                        </div>

                        <button
                            onClick={handleRedirect}
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                        >
                            {isPopup ? 'Close Window' : 'Go to Homepage'}
                        </button>
                    </div>
                )}

                {/* Failed State */}
                {verificationStatus === 'failed' && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            ❌ Payment Verification Failed
                        </h2>

                        <p className="text-gray-600 dark:text-slate-400 mb-6">
                            {verificationData?.message || 'We couldn\'t verify your payment. Please contact support.'}
                        </p>

                        {verificationData?.pidx && (
                            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3 mb-4 border border-gray-200 dark:border-slate-700">
                                <p className="text-xs text-gray-600 dark:text-slate-400">
                                    Transaction ID: <span className="font-mono break-all">{verificationData.pidx}</span>
                                </p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <a
                                href="mailto:support@nabinnepali.com.np"
                                className="block w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                            >
                                📧 Contact Support
                            </a>
                            <button
                                onClick={() => router.push('/')}
                                className="block w-full bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                            >
                                🏠 Go to Homepage
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Loading details...</p>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
