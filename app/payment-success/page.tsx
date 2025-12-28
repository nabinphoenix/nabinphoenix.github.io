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
        setIsPopup(window.opener !== null);

        // 1. Get pidx from various possible sources
        let pidx = searchParams.get('pidx');

        // Manual search params check (sometimes useSearchParams is slow in Next.js)
        if (!pidx && typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            pidx = params.get('pidx');
        }

        // Referrer check (Khalti URL usually contains the pidx)
        if (!pidx && typeof document !== 'undefined' && document.referrer.includes('pidx=')) {
            const match = document.referrer.match(/pidx=([^&]+)/);
            if (match) pidx = match[1];
        }

        // Log the discovery process
        console.log('🔍 Final pidx found:', pidx);

        if (!pidx) {
            console.error('❌ Missing pidx in URL');
            setVerificationStatus('failed');
            setVerificationData({
                success: false,
                message: 'No Transaction ID found in the URL. Please ensure you didn\'t refresh the page or manually edit the link.'
            });
            return;
        }

        verifyPayment(pidx);
    }, [searchParams]);

    const verifyPayment = async (pidx: string) => {
        try {
            setVerificationStatus('loading');

            const response = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pidx })
            });

            const data: VerificationResult = await response.json();

            if (response.ok && data.success) {
                setVerificationStatus('success');
                setVerificationData(data);

                if (window.opener) {
                    window.opener.postMessage({
                        type: 'PAYMENT_SUCCESS',
                        data: {
                            orderId: data.order_id,
                            amount: data.total_amount,
                            pidx: pidx,
                            totalAmount: data.total_amount
                        }
                    }, '*');
                }

                startCountdown();
            } else {
                setVerificationStatus('failed');
                setVerificationData(data);
            }
        } catch (error) {
            setVerificationStatus('failed');
            setVerificationData({
                success: false,
                message: 'Unable to connect to verification server.'
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
        if (isPopup) window.close();
        else router.push('/');
    };

    const formatAmount = (amount: string | undefined): string => {
        if (!amount) return '0';
        const numAmount = parseFloat(amount);
        return `NPR ${(numAmount / 100).toLocaleString('en-NP', { minimumFractionDigits: 2 })}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-100 dark:border-slate-800">

                {verificationStatus === 'loading' && (
                    <div className="text-center py-10">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-teal-100 dark:border-teal-900 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Verifying Payment</h2>
                        <p className="text-slate-500 text-sm">Please wait while we confirm your order...</p>
                    </div>
                )}

                {verificationStatus === 'success' && verificationData && (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Success!</h2>
                        <p className="text-slate-500 text-sm mb-6">Your payment has been received</p>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 mb-6 text-left space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Order ID</span>
                                <span className="font-semibold dark:text-white">{verificationData.order_id}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Total Paid</span>
                                <span className="font-bold text-teal-600 active:text-teal-500 text-lg">{formatAmount(verificationData.total_amount)}</span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 mb-8 font-medium">
                            {isPopup ? 'Closing window' : 'Redirecting'} in <span className="text-teal-600">{countdown}s</span>
                        </p>

                        <button onClick={handleRedirect} className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-opacity">
                            Back to Site
                        </button>
                    </div>
                )}

                {verificationStatus === 'failed' && (
                    <div className="text-center py-4">
                        <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Payment Issue</h2>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            {verificationData?.message || 'Verification timed out. If money was deducted, please contact our support team with your transaction ID.'}
                        </p>

                        <div className="space-y-4">
                            <a href={`mailto:support@nabinnepali.com.np?subject=Payment Issue&body=PIDX: ${verificationData?.pidx || 'Not Available'}`} className="block w-full bg-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-rose-600/20">
                                Email Support
                            </a>
                            <button onClick={() => router.push('/')} className="block w-full text-slate-500 font-semibold py-2">
                                Return to Home
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
        <Suspense fallback={null}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
