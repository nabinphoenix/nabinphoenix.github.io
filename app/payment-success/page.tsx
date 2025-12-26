"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight, XCircle } from "lucide-react";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const [countdown, setCountdown] = useState(5);
    const [verificationStatus, setVerificationStatus] = useState<'checking' | 'success' | 'failed'>('checking');
    const [orderDetails, setOrderDetails] = useState<any>(null);

    const pidx = searchParams.get("pidx");
    const status = searchParams.get("status");
    const txnId = searchParams.get("transaction_id");
    const amount = searchParams.get("amount");
    const purchaseOrderId = searchParams.get("purchase_order_id");

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // If we have pidx from URL, use it
                let paymentId = pidx;

                // If no pidx in URL, try to get it from the Khalti payment URL
                if (!paymentId) {
                    const referrer = document.referrer;
                    const match = referrer.match(/pidx=([^&]+)/);
                    if (match) {
                        paymentId = match[1];
                    }
                }

                if (!paymentId) {
                    console.error('❌ No pidx found');
                    setVerificationStatus('failed');
                    return;
                }

                console.log('🔍 Verifying payment with pidx:', paymentId);

                // Call n8n webhook to verify and process payment
                const webhookUrl = new URL('https://nabin8n.tridevinnovation.com/webhook/payment-verify');
                webhookUrl.searchParams.append('pidx', paymentId);
                webhookUrl.searchParams.append('status', status || 'Completed');
                if (txnId) webhookUrl.searchParams.append('transaction_id', txnId);
                if (purchaseOrderId) webhookUrl.searchParams.append('purchase_order_id', purchaseOrderId);
                if (amount) webhookUrl.searchParams.append('amount', amount);

                console.log('🔔 Calling n8n webhook:', webhookUrl.toString());

                const response = await fetch(webhookUrl.toString(), { method: 'GET' });

                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Backend verified payment:', data);

                    setOrderDetails(data);
                    setVerificationStatus('success');

                    // Notify chat widget
                    if (window.opener) {
                        window.opener.postMessage(
                            {
                                type: 'PAYMENT_SUCCESS',
                                data: {
                                    pidx: paymentId,
                                    orderId: purchaseOrderId || data.order_id,
                                    amount: amount || data.total_amount,
                                },
                            },
                            "*"
                        );
                    }

                    // Start countdown to close
                    let count = 5;
                    const timer = setInterval(() => {
                        count--;
                        setCountdown(count);
                        if (count <= 0) {
                            clearInterval(timer);
                            if (window.opener) {
                                window.close();
                            } else {
                                window.location.href = "/";
                            }
                        }
                    }, 1000);

                    return () => clearInterval(timer);
                } else {
                    console.error('❌ Backend verification failed:', response.status);
                    setVerificationStatus('failed');
                }
            } catch (error) {
                console.error('❌ Error verifying payment:', error);
                setVerificationStatus('failed');
            }
        };

        verifyPayment();
    }, [pidx, status, txnId, purchaseOrderId, amount]);

    if (verificationStatus === 'checking') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <Loader2 className="w-16 h-16 text-teal-600 animate-spin" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Verifying Payment...</h1>
                    <p className="text-slate-600">Please wait while we confirm your payment.</p>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'failed') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-12 h-12 text-red-500" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Verification Failed</h1>
                    <p className="text-slate-600 mb-8">We couldn't verify your payment. Please contact support.</p>
                    <button
                        onClick={() => (window.opener ? window.close() : (window.location.href = "/"))}
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
                <p className="text-slate-600 mb-8">Your order has been confirmed and is being processed.</p>

                <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Order ID:</span>
                        <span className="font-semibold text-slate-900">{orderDetails?.order_id || purchaseOrderId || "Processing..."}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Transaction ID:</span>
                        <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded text-slate-700">
                            {pidx || txnId || "N/A"}
                        </span>
                    </div>
                    <div className="w-full border-t border-slate-200 my-2"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-900 font-medium text-lg text-teal-600">Total Paid:</span>
                        <span className="text-2xl font-bold text-teal-600">
                            Rs. {Number(orderDetails?.total_amount || amount || 0) / 100}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                        ✅ Order confirmed! Check your email for details.
                    </p>
                    <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                        Closing in <span className="font-bold text-teal-600 w-4">{countdown}</span> seconds...
                    </p>
                    <button
                        onClick={() => (window.opener ? window.close() : (window.location.href = "/"))}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-teal-200"
                    >
                        {window.opener ? "Return to Chat" : "Go to Homepage"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Loading payment details...</p>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
