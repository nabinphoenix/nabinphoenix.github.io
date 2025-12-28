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
    const [debugUrl, setDebugUrl] = useState('');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // 1. Log the full URL for debugging
        const fullUrl = window.location.href;
        setDebugUrl(fullUrl);
        console.log('📍 Starting pidx search. Full URL:', fullUrl);

        // 2. Try to find pidx using 5 different fallback methods
        let pidx = searchParams.get('pidx');

        // Method 2: Manual Regex on current URL
        if (!pidx) {
            const pidxMatch = fullUrl.match(/[?&]pidx=([^&]+)/);
            if (pidxMatch) {
                pidx = pidxMatch[1];
                console.log('🔍 Found pidx via Regex on URL:', pidx);
            }
        }

        // Method 3: Check localStorage backup (Saved when user clicked "Pay Now")
        if (!pidx) {
            const backupPidx = localStorage.getItem('last_pidx');
            if (backupPidx) {
                pidx = backupPidx;
                console.log('🔍 Found pidx in localStorage backup:', pidx);
            }
        }

        // Method 4: Scan the entire search string manually
        if (!pidx) {
            const urlParams = new URLSearchParams(window.location.search);
            pidx = urlParams.get('pidx') || urlParams.get('transaction_id');
        }

        // Method 5: Check document referrer
        if (!pidx && document.referrer.includes('pidx=')) {
            const refMatch = document.referrer.match(/[?&]pidx=([^&]+)/);
            if (refMatch) pidx = refMatch[1];
        }

        if (!pidx) {
            console.error('❌ Payment verification failed: No Transaction ID (pidx) could be detected.');
            setVerificationStatus('failed');
            return;
        }

        console.log('✅ Success! Proceeding to verify pidx:', pidx);
        verifyPayment(pidx);
    }, [searchParams]);

    const verifyPayment = async (pidx: string) => {
        try {
            const response = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pidx: pidx.trim() })
            });

            const data: VerificationResult = await response.json();

            if (response.ok && data.success) {
                setVerificationStatus('success');
                setVerificationData(data);

                // This notifies Maya chat automatically
                if (window.opener) {
                    window.opener.postMessage({
                        type: 'PAYMENT_SUCCESS',
                        data: {
                            orderId: data.order_id,
                            amount: data.total_amount,
                            pidx: pidx
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
            setVerificationData({ success: false, message: 'Server connection error.' });
        }
    };

    const startCountdown = () => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (window.opener) window.close();
                    else router.push('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatAmount = (amount: string | undefined): string => {
        if (!amount) return '0';
        return `Rs. ${(parseFloat(amount) / 100).toLocaleString()}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 border border-slate-100">

                {verificationStatus === 'loading' && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-xl font-bold text-slate-800">Verifying Payment...</h2>
                    </div>
                )}

                {verificationStatus === 'success' && (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Success!</h2>
                        <p className="text-slate-500 mb-6">Order #{verificationData?.order_id} confirmed.</p>
                        <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-sm flex justify-between">
                            <span className="text-slate-400">Paid:</span>
                            <span className="font-bold text-teal-600">{formatAmount(verificationData?.total_amount)}</span>
                        </div>
                        <p className="text-xs text-slate-400">Closing in {countdown}s...</p>
                    </div>
                )}

                {verificationStatus === 'failed' && (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Issue</h2>
                        <p className="text-slate-500 text-sm mb-6">{verificationData?.message || "We couldn't find the transaction data."}</p>

                        <div className="text-[10px] text-left bg-slate-50 p-2 rounded mb-6 overflow-hidden">
                            <p className="font-bold text-slate-400 uppercase mb-1">Debug Info:</p>
                            <code className="block break-all text-slate-500">{debugUrl}</code>
                        </div>

                        <button onClick={() => window.location.reload()} className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-xl mb-3">
                            Try Again
                        </button>
                        <button onClick={() => router.push('/')} className="w-full text-slate-400 text-sm">Return Home</button>
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
