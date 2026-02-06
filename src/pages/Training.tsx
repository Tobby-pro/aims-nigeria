// pages/Training.tsx
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton"; // ✅ imported back button

const Training = () => {
  return (
    <>
      {/* Back Button at the top with spacing */}
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      {/* Page Header */}
      <PageHeader
        title="Training & Development"
        subtitle="Professional training programs and certifications"
        backgroundImage="/images/buses.png"
      />

      {/* Page Content */}
      <Container>
        <div className="py-16 max-w-3xl">
          <p className="text-gray-700 leading-relaxed">
            Our training programs are designed to equip professionals with
            practical skills, modern tools, and globally relevant knowledge
            in information and management science.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Training;
