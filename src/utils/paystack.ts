// src/utils/paystack.ts

type PaystackProps = {
  email: string;
  amount: number;
  reference: string; // ✅ must come from backend
  programId?: string;
  publicKey: string; // ✅ ONLY from backend
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
  // 🔥 Safety check (prevents silent failure)
  if (!publicKey) {
    console.error("❌ Missing Paystack public key");
    return;
  }

  console.log("PAYSTACK KEY (from backend):", publicKey);

  const handler = (window as any).PaystackPop.setup({
    key: publicKey, // ✅ LIVE key from backend

    email,
    amount: amount * 100, // ✅ convert to kobo
    currency: "NGN",

    ref: reference, // ✅ MUST match backend exactly

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
      console.log("✅ Payment success:", response);

      // 🔥 Always pass backend reference forward
      if (response?.reference) {
        onSuccess(response.reference);
      } else {
        console.error("❌ No reference returned from Paystack");
      }
    },

    onClose: function () {
      console.log("⚠️ Payment window closed");

      if (onClose) onClose();
    },
  });

  handler.openIframe();
};