import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/auth";

const Verify = () => {
  const [status, setStatus] = useState("Verifying...");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Invalid verification link.");
      setStatus("");
      return;
    }

    const verify = async () => {
      try {
        const res = await API.get(`/members/verify?token=${token}`);
        if (res.data.success) {
          setStatus("✅ Verification successful! Redirecting to dashboard...");
          setTimeout(() => navigate("/dashboard"), 2500);
        } else {
          setError(res.data.message || "Verification failed.");
          setStatus("");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Verification failed.");
        setStatus("");
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status && <p className="text-green-600">{status}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Verify;