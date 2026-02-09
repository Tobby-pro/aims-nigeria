import { useEffect, useRef } from "react";
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";

const Signup = () => {
  // ---- refs ----
  const formRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // ---- auto scroll + focus on load ----
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    firstInputRef.current?.focus();
  }, []);

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
            className="
              w-full max-w-4xl
              grid grid-cols-1 md:grid-cols-2
              bg-white rounded-xl shadow-lg overflow-hidden
            "
          >
            {/* ================= LEFT: FORM ================= */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create your account
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Register to access AIMS membership services.
                </p>
              </div>

              <form className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    placeholder="Tobi John"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="tobijohn@gmail.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="08012345678"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md text-sm hover:bg-indigo-700 transition"
                >
                  Create Account
                </button>
              </form>
            </div>

            {/* ================= RIGHT: CLAY IMAGE + GLASS ================= */}
            <div
              className="relative flex items-end justify-center p-6"
              style={{
                backgroundImage: "url('/images/login_pro01.png')",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Glass Card — lowered */}
              <div
                className="
                  mb-6
                  backdrop-blur-xl bg-white/20
                  border border-white/30
                  rounded-2xl p-6 max-w-sm
                  shadow-2xl
                "
              >
                <div className="flex gap-1 mb-3 text-yellow-400">
                  ⭐ ⭐ ⭐ ⭐ ⭐
                </div>

                <p className="text-sm leading-relaxed text-gray-800">
                  “AIMS gives professionals credibility, structure, and real growth.
                  Being a member opened doors for me.”
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src="/images/baby01.jpg"
                    alt="member"
                    className="w-10 h-10 rounded-full object-cover border border-white/40"
                  />
                  <div>
                    <p className="text-sm font-semibold text-indigo-600">
                      AIMS Member
                    </p>
                    <span className="text-xs text-gray-600">
                      Verified Professional
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
