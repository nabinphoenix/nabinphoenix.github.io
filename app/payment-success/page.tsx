"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, Loader2, Home } from "lucide-react";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const [countdown, setCountdown] = useState(5);
    const [isNotified, setIsNotified] = useState(false);

    const pidx = searchParams.get("pidx");
    const txnId = searchParams.get("transaction_id");
    const amount = searchParams.get("amount");
    const purchaseOrderId = searchParams.get("purchase_order_id");
    const status = searchParams.get("status");

    useEffect(() => {
        // Notify the parent window (chat widget) about the success
        if (status === "Completed" && !isNotified) {
            // 1. Notify chat widget
            if (window.opener) {
                window.opener.postMessage(
                    {
                        type: "PAYMENT_SUCCESS",
                        data: {
                            pidx,
                            transaction_id: txnId,
                            purchase_order_id: purchaseOrderId,
                            amount,
                        },
                    },
                    "*"
                );
            }

            // 2. Notify n8n backend to process order
            const notifyBackend = async () => {
                try {
                    const webhookUrl = new URL('https://nabin8n.tridevinnovation.com/webhook/payment-verify');
                    if (pidx) webhookUrl.searchParams.append('pidx', pidx);
                    if (status) webhookUrl.searchParams.append('status', status);
                    if (txnId) webhookUrl.searchParams.append('transaction_id', txnId);
                    if (purchaseOrderId) webhookUrl.searchParams.append('purchase_order_id', purchaseOrderId);
                    if (amount) webhookUrl.searchParams.append('amount', amount);

                    console.log('🔔 Calling n8n webhook:', webhookUrl.toString());
                    const response = await fetch(webhookUrl.toString(), { method: 'GET' });

                    if (response.ok) {
                        console.log('✅ Backend notified successfully');
                    } else {
                        console.error('❌ Backend notification failed:', response.status);
                    }
                } catch (error) {
                    console.error('❌ Error notifying backend:', error);
                }
            };

            notifyBackend();
            setIsNotified(true);
        }

        // Auto-close or redirect countdown
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (window.opener) {
                        window.close();
                    } else {
                        window.location.href = "/";
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [status, pidx, txnId, purchaseOrderId, amount, isNotified]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
                <p className="text-slate-600 mb-8">Your transaction has been completed successfully.</p>

                <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Order ID:</span>
                        <span className="font-semibold text-slate-900">{purchaseOrderId || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Transaction ID:</span>
                        <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded text-slate-700">
                            {txnId || "N/A"}
                        </span>
                    </div>
                    <div className="w-full border-t border-slate-200 my-2"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-900 font-medium text-lg text-teal-600">Total Paid:</span>
                        <span className="text-2xl font-bold text-teal-600">Rs. {Number(amount || 0) / 100}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                        Closing this window in <span className="font-bold text-teal-600 w-4">{countdown}</span> seconds...
                    </p>
                    <button
                        onClick={() => (window.opener ? window.close() : (window.location.href = "/"))}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-teal-200"
                    >
                        {window.opener ? "Return to Portfolio" : "Go to Homepage"}
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
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center animate-pulse">
                <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Verifying payment details...</p>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
