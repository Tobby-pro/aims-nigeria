// pages/Signup.tsx
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton"; // ✅ imported back button

const Signup = () => {
  return (
    <>
      {/* Back Button at the top with spacing */}
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      {/* Page Header */}
      <PageHeader
        title="Create an Account"
        subtitle="Join AIMS Nigeria today"
        backgroundImage="/images/buses.png"
      />

      {/* Page Content */}
      <Container>
        <div className="py-16 max-w-md mx-auto">
          <p className="text-gray-700 mb-6 text-center">
            Become a member of a recognized professional body in information
            and management science.
          </p>

          {/* form comes later */}
        </div>
      </Container>
    </>
  );
};

export default Signup;
