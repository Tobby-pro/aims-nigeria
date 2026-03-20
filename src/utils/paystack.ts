// src/utils/paystack.ts

type PaystackProps = {
  email: string;
  amount: number;
  reference: string; // ✅ REQUIRED (comes from backend)
  programId?: string; // optional (kept for metadata only)
  publicKey: string; // ✅ from backend (single source of truth)
  onSuccess: (reference: string) => void;
  onClose?: () => void;
};

export const payWithPaystack = ({
  email,
  amount,
  reference,
  programId,
  publicKey,
  onSuccess,
  onClose,
}: PaystackProps) => {
  // ✅ Debug (remove in production)
  console.log("PAYSTACK KEY (from backend):", publicKey);

  const handler = (window as any).PaystackPop.setup({
    key: publicKey, // ✅ NOW FROM BACKEND (FIXED)

    email,
    amount: amount * 100, // kobo
    currency: "NGN",

    ref: reference, // ✅🔥 CRITICAL FIX (must match backend)

    // ✅ Metadata is now OPTIONAL (not trusted anymore)
    metadata: programId
      ? {
          custom_fields: [
            {
              display_name: "Program",
              variable_name: "programId",
              value: programId,
            },
          ],
        }
      : undefined,

    callback: function (response: any) {
      console.log("Payment success:", response);

      // ✅ Always return backend reference
      onSuccess(response.reference);
    },

    onClose: function () {
      console.log("Payment closed");

      if (onClose) onClose();
    },
  });

  handler.openIframe();
};