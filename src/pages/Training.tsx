// src/pages/Training.tsx
import { motion } from "framer-motion";
import { FiAward, FiBookOpen } from "react-icons/fi";
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";

const courses = [
  "Diploma",
  "Higher Diploma",
  "Graduate Certificate",
  "Post Graduate Diploma",
];

const areas = [
  "General Management",
  "Marketing",
  "Human Resources (HR)",
  "Finance",
  "Operations",
  "ICT",
  "Project Management",
  "Leadership & Strategy",
];

const Training = () => {
  return (
    <>
      {/* Back Button */}
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
        <div className="py-16 max-w-5xl mx-auto space-y-16">

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-700 leading-relaxed text-lg"
          >
            <p>
              Our training programs are designed to equip professionals with
              practical skills, modern tools, and globally relevant knowledge
              in information and management science. Explore our long-duration
              courses and focus areas below.
            </p>
          </motion.div>

          {/* Hero Image Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <img
              src="/images/graduate01.png"
              alt="Graduate character with heart icon"
              className="w-full max-w-sm object-contain"
            />
          </motion.div>

          {/* Featured Program Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-xl shadow-md flex items-center gap-4 cursor-pointer hover:scale-102 transition-transform"
          >
            <div className="text-indigo-600 text-3xl">
              <FiAward />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Featured Program: Post Graduate Diploma in Management
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                A comprehensive program designed for professionals looking to
                enhance leadership, strategic thinking, and management skills
                in dynamic business environments.
              </p>
            </div>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Long-Duration Courses
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <motion.div
                  key={course}
                  whileHover={{ scale: 1.03 }}
                  className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-100 flex items-center justify-center text-center font-semibold text-indigo-700 text-lg transition"
                >
                  <FiBookOpen className="mr-2 text-indigo-600" />
                  {course}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Areas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Focus Areas
            </h2>

            <div className="flex flex-wrap gap-3">
              {areas.map((area) => (
                <motion.div
                  key={area}
                  whileHover={{ scale: 1.05 }}
                  className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium text-sm cursor-default shadow-sm transition"
                >
                  {area}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call-to-Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-700 mb-4">
              Ready to advance your career? Enroll in one of our professional
              programs today.
            </p>
            <a
              href="/signup"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-indigo-500 transition"
            >
              Become a Member
            </a>
          </motion.div>

        </div>
      </Container>
    </>
  );
};

export default Training;