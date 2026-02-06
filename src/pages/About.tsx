// pages/About.tsx
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton"; // ✅ imported back button

const About = () => {
  return (
    <>
      {/* Back Button at the top with padding */}
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      {/* Page Header */}
      <PageHeader
        title="About AIMS Nigeria"
        subtitle="Advancing information management and professional excellence"
        backgroundImage="/images/buses.png"
      />

      {/* Page Content */}
      <Container>
        <div className="py-16">
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            AIMS Nigeria is a professional body committed to the advancement
            of information and management science through education,
            certification, research, and professional development.
          </p>
        </div>
      </Container>
    </>
  );
};

export default About;
