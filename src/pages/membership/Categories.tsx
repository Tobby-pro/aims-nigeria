import PageHeader from "../../components/layout/PageHeader";
import Container from "../../components/Container";

const MembershipCategories = () => {
  return (
    <>
      <PageHeader
        title="Membership Categories"
        subtitle="Find the membership level that fits you"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div className="py-16 max-w-3xl">
          <p className="text-gray-700 leading-relaxed">
            AIMS Nigeria offers various membership categories designed for
            students, professionals, and corporate bodies.
          </p>
        </div>
      </Container>
    </>
  );
};

export default MembershipCategories;
