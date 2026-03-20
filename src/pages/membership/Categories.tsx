// src/pages/membership/MembershipCategories.tsx
import PageHeader from "../../components/layout/PageHeader";
import Container from "../../components/Container";

const categories = [
  {
    title: "Student Member",
    description:
      "For undergraduate and postgraduate students seeking early exposure to professional development.",
  },
  {
    title: "Associate Member",
    description:
      "For individuals who have completed relevant training or hold foundational qualifications.",
  },
  {
    title: "Full Member",
    description:
      "For experienced professionals with significant contributions in management and leadership.",
  },
  {
    title: "Corporate Member",
    description:
      "For organizations looking to empower their workforce through structured training and certification.",
  },
];

const MembershipCategories = () => {
  return (
    <>
      <PageHeader
        title="Membership Categories"
        subtitle="Find the membership level that fits you"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div className="py-16 grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {cat.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default MembershipCategories;