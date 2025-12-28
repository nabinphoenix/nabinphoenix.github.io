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

        // 1. Try to get pidx from URL using multiple methods
        let pidx = searchParams.get('pidx');
        const status = searchParams.get('status');

        // Debugging: Log what we found
        console.log('--- Payment Debug Info ---');
        console.log('Current URL Search Params:', window.location.search);
        console.log('Referrer:', document.referrer);

        // 2. Backup: Check window.location directly if searchParams is empty
        if (!pidx) {
            const urlParams = new URLSearchParams(window.location.search);
            pidx = urlParams.get('pidx');
        }

        // 3. Backup: Check the referrer (Khalti URL) if somehow params were lost in redirect
        if (!pidx && document.referrer.includes('pidx=')) {
            const match = document.referrer.match(/pidx=([^&]+)/);
            if (match) {
                pidx = match[1];
                console.log('Found pidx in referrer:', pidx);
            }
        }

        if (!pidx) {
            console.error('❌ Could not find pidx in URL or Referrer');
            setVerificationStatus('failed');
            setVerificationData({
                success: false,
                message: 'Transaction ID (pidx) not found. Please check your browser address bar for "?pidx=..."'
            });
            return;
        }

        // Verify payment
        verifyPayment(pidx);
    }, [searchParams]);

    const verifyPayment = async (pidx: string) => {
        try {
            console.log('🚀 Calling verification API with pidx:', pidx);

            const response = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pidx: pidx.trim() }),
            });

            const data: VerificationResult = await response.json();
            console.log('📥 Verification response:', data);

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
            console.error('❌ API Error:', error);
            setVerificationStatus('failed');
            setVerificationData({
                success: false,
                message: 'Failed to connect to verification service.',
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
        return `NPR ${(numAmount / 100).toLocaleString('en-NP', { minimumFractionDigits: 2 })}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8">

                {verificationStatus === 'loading' && (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Verifying Payment...</h2>
                        <p className="text-gray-600 dark:text-slate-400 text-sm">Validating with Khalti secure gateway.</p>
                    </div>
                )}

                {verificationStatus === 'success' && verificationData && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">✅ Payment Successful!</h2>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 my-4 text-left border border-slate-100 dark:border-slate-700">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Order ID:</span>
                                    <span className="font-semibold text-gray-800 dark:text-white">{verificationData.order_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Amount:</span>
                                    <span className="font-bold text-teal-600 dark:text-teal-400">{formatAmount(verificationData.total_amount)}</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Transaction ID</span>
                                    <span className="font-mono text-[10px] text-gray-500 break-all">{verificationData.pidx}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-gray-500 mb-6">
                            {isPopup ? '🔄 Returning to chat' : '🏠 Redirecting'} in {countdown}s...
                        </div>

                        <button onClick={handleRedirect} className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition-colors">
                            {isPopup ? 'Close Window' : 'Go to Homepage'}
                        </button>
                    </div>
                )}

                {verificationStatus === 'failed' && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">❌ Verification Failed</h2>
                        <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">{verificationData?.message}</p>
                        <div className="space-y-3">
                            <a href="mailto:support@nabinnepali.com.np" className="block w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg text-center">📧 Contact Support</a>
                            <button onClick={() => router.push('/')} className="block w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors">🏠 Go to Homepage</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div></div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
