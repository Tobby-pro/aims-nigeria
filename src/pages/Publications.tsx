// pages/Publications.tsx
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton"; // ✅ imported back button

const Publications = () => {
  return (
    <>
      {/* Back Button at the top with spacing */}
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      {/* Page Header */}
      <PageHeader
        title="Publications"
        subtitle="Research papers, journals, and official publications"
        backgroundImage="/images/buses.png"
      />

      {/* Page Content */}
      <Container>
        <div className="py-16 max-w-3xl">
          <p className="text-gray-700 leading-relaxed">
            AIMS Nigeria publishes professional journals, research findings,
            and policy documents that contribute to the growth of information
            and management science in Nigeria.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Publications;
