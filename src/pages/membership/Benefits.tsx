import PageHeader from "../../components/layout/PageHeader";
import Container from "../../components/Container";

const MembershipBenefits = () => {
  return (
    <>
      <PageHeader
        title="Membership Benefits"
        subtitle="Why becoming a member matters"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div className="py-16 max-w-3xl">
          <p className="text-gray-700 leading-relaxed">
            Members of AIMS Nigeria enjoy professional recognition, access to
            training programs, networking opportunities, and career growth.
          </p>
        </div>
      </Container>
    </>
  );
};

export default MembershipBenefits;
