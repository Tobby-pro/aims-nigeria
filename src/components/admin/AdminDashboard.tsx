// src/components/admin/AdminDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Payment = {
  id: number;
  member_id: number;
  email: string;
  fee_type: string;
  reference: string;
  amount: number;
  status: string;
  created_at: string;
};

const AdminDashboard = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("/api/admin/payments", {
          withCredentials: true, // use cookies if backend sets them
        });
        setPayments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p className="p-6">Loading payments...</p>;
  if (payments.length === 0)
    return <p className="p-6">No payments found yet.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Payments</h2>

      <table className="w-full border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Fee Type</th>
            <th className="p-2 border-b">Reference</th>
            <th className="p-2 border-b">Amount</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="text-sm hover:bg-gray-50">
              <td className="p-2 border-b">{p.id}</td>
              <td className="p-2 border-b">{p.email}</td>
              <td className="p-2 border-b">{p.fee_type}</td>
              <td className="p-2 border-b">{p.reference}</td>
              <td className="p-2 border-b">{p.amount}</td>
              <td className="p-2 border-b">{p.status}</td>
              <td className="p-2 border-b">
                {new Date(p.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;