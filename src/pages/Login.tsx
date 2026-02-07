// pages/Login.tsx
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";

const Login = () => {
  return (
    <>
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      <PageHeader
        title="Member Login"
        subtitle="Access your AIMS Nigeria account"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div className="py-16 max-w-md mx-auto">
          <p className="text-gray-700 mb-6 text-center">
            Login to manage your membership, training, and certifications.
          </p>
          {/* form comes later */}
        </div>
      </Container>
    </>
  );
};

export default Login;
