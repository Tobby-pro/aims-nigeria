// pages/Activities.tsx
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton"; // ✅ imported back button

const Activities = () => {
  return (
    <>
      {/* Back Button at the top with spacing */}
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      {/* Page Header */}
      <PageHeader
        title="Our Activities"
        subtitle="Programs, events, and professional engagements"
        backgroundImage="/images/buses.png"
      />

      {/* Page Content */}
      <Container>
        <div className="py-16 max-w-3xl">
          <p className="text-gray-700 leading-relaxed">
            AIMS Nigeria organizes conferences, workshops, seminars, and
            professional activities aimed at advancing information and
            management science across Nigeria.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Activities;
