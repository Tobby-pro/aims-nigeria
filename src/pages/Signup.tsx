// pages/Signup.tsx
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
        <div className="py-16 max-w-md mx-auto">
          <p className="text-gray-700 mb-6 text-center">
            Become a member of a recognized professional body in information and management science.
          </p>
          {/* form comes later */}
        </div>
      </Container>
    </>
  );
};

export default Signup;
