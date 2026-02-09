// pages/About.tsx
import { motion } from "framer-motion";
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";

const About = () => {
  return (
    <>
      {/* Back Button */}
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
        <div className="py-16 space-y-16 max-w-5xl mx-auto">
          {/* ================= INTRODUCTION ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
              ASSOCIATION FOR INFORMATION AND MANAGEMENT SCIENCE, NIGERIA
              (AIMS) is a professional and educational institute dedicated to
              advancing the practice of Information Management in line with
              global best practices. Established as a non-profit body under
              Companies and Allied Matters Decree 1, 1990 (Certificate No.
              35445), AIMS is strategically positioned to enhance the use of
              Information Technology (IT) in corporate planning and decision
              making across private and public organizations.
            </p>
          </motion.div>

          {/* ================= OBJECTIVES ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
              Our Objectives
            </h2>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
              <li>
                Promote and professionalize Information Management across all
                disciplines such as Marketing, ICT, Logistics, General
                Management, Economics, Computer Science, Medicine, Engineering,
                Psychology, Sociology, Environmental Science, Mathematics, etc.
              </li>
              <li>
                Support educational and professional development through
                training, research, conferences, and workshops.
              </li>
              <li>
                Collaborate with institutions to develop curricula in Information
                and Management Sciences, Logistics, and Cybernetic Management.
              </li>
              <li>
                Encourage appropriate use of ICT for corporate and national
                problem solving.
              </li>
              <li>
                Build skillful and self-reliant Information Management
                professionals through ICT, entrepreneurial development, and
                innovation.
              </li>
              <li>
                Publish teaching-learning materials in Management and ICT.
              </li>
            </ul>
          </motion.div>

          {/* ================= LEGAL STATUS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-indigo-50 rounded-xl p-6 shadow-md"
          >
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">
              Legal & Certification
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">
              Certified Professional Body | Established under Act No. 1 of 1990,
              Certificate No. 35445
            </p>
          </motion.div>

          {/* ================= WHO WE SERVE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-6 md:space-y-0"
          >
            {/* Text */}
            <div className="md:w-2/3">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Who We Serve
              </h2>
              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                AIMS represents a broad and diverse set of professionals and
                organizations in ICT, Planning, Research, Statistics, Engineering,
                Banking, Finance, Education, Legal Practice, Oil & Gas,
                Transportation, Logistics, Environmental Studies, Public
                Administration, and more. We set standards, regulate the profession,
                and support members in achieving their professional ambitions.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/3">
              <img
                src="/images/about02.png"
                alt="AIMS Overview"
                className="rounded-xl shadow-lg object-cover w-full h-auto"
              />
            </div>
          </motion.div>

          {/* ================= MEMBERSHIP CTA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-100 rounded-xl p-8 text-center shadow-md"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Join AIMS Today
            </h2>
            <p className="text-gray-700 mb-6 text-xs sm:text-sm md:text-base">
              Become a member and access professional resources, training,
              networking opportunities, and more.
            </p>
            <a
              href="/membership"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Learn About Membership
            </a>
          </motion.div>
        </div>
      </Container>
    </>
  );
};

export default About;
