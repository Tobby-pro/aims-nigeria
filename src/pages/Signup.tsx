import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";

interface Category {
  id: number;
  name: string;
  description: string;
}

const Signup = () => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Auto scroll + focus
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    firstInputRef.current?.focus();
  }, []);

  // Fetch membership categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/membership-categories"
        );
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !categoryId) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post("http://localhost:3000/api/members/register", {
        full_name: fullName,
        email,
        category_id: categoryId,
      });

      setMessage(
        "✅ Registration successful. Please check your email to verify."
      );

      setFullName("");
      setEmail("");
      setCategoryId("");
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      <PageHeader
        title="Become a Member"
        subtitle="Begin your professional journey with AIMS Nigeria"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div className="py-12 flex justify-center">
          <div
            ref={formRef}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* LEFT SIDE */}
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Join AIMS Membership
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                {/* Membership Category */}
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Membership Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) =>
                      setCategoryId(Number(e.target.value))
                    }
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 rounded-md"
                >
                  {loading ? "Processing..." : "Become a Member"}
                </button>

                {message && (
                  <p className="text-sm mt-2 text-center">{message}</p>
                )}
              </form>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div
              className="relative flex items-end justify-center p-6"
              style={{
                backgroundImage: "url('/images/login_pro01.png')",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
   