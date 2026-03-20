// src/api/payments.ts
import API from "./auth"; // ✅ reuse the SAME axios instance

export const initiatePayment = (programId: string) => {
  return API.post("/payments/initiate", { programId });
};

export const verifyPayment = (reference: string) => {
  return API.post("/payments/verify", { reference });
};