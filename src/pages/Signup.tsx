import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";

const Signup = () => {
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
        <div className="py-12 max-w-md mx-auto tt-form-wrap">
          <div className="tt-form-container bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="tt-form-content p-6">

              {/* Top Info Section */}
              <div className="mb-5 text-center p-3 -mx-6 bg-indigo-100">
                <p className="text-sm text-indigo-800">
                  Complete the form to proceed with your membership application.
                </p>
              </div>

              <form className="space-y-3 text-sm">

                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Tobi john"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="tobijohn@gmail.com"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 pr-9 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      📧
                    </span>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="08012345678"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Membership Category */}
                <div className="form-group">
                  <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
                    Membership Category
                  </label>
                  <select
                    id="category"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Select Category</option>
                    <option value="associate">Associate</option>
                    <option value="graduate">Graduate</option>
                    <option value="student">Student</option>
                    <option value="full">Full Member</option>
                    <option value="fellow">Fellow</option>
                    <option value="corporate">Corporate Member</option>
                    <option value="corporate-fellow">Corporate Fellow</option>
                  </select>
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="w-full h-[40px] rounded-md border border-gray-300 px-3 pr-9 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                    >
                      👁️
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm hover:bg-indigo-700 transition"
                  >
                    Submit Application
                  </button>
                </div>
              </form>

              {/* Testimonial */}
              <div className="mt-6 p-4 rounded-lg bg-gray-100">
                <p className="text-gray-600 text-center text-xs italic">
                  “Joining AIMS has transformed my career — truly a professional community.”
                </p>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
