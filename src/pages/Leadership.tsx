// pages/Leadership.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/layout/PageHeader"; // ✅ fixed path
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton"; // ✅ imported back button

type TeamSection = {
  title: string;
  members: string[];
};

const teamData: TeamSection[] = [
  {
    title: "Management Team",
    members: [
      "Dr Lucky",
      "Mr Awe O. J",
      "Barr Sunday Fiola",
      "Favour Adekunle",
      "Mr Faithful",
      "Mr Tijani Ademola",
      "Mr Olatubosun",
      "Mr Koleosho",
      "Mr Emmanuel Akinsade",
      "Mr Wasiu Olalekan",
      "Mr Alleh Segun",
      "Mr Fatola",
    ],
  },
  {
    title: "Program Coordinators",
    members: [
      "Mr Adeboye",
      "Mr Dahood",
      "Mr Ishola Kolawole",
      "Mr Oduntan Oluwatoyin",
      "Mr Abidoye",
    ],
  },
  {
    title: "Governing Board",
    members: [
      "Dr Adeyinka Bakare",
      "Engr Dr Ezekiel Odinmayo",
      "Mr Durosimi Adekunle",
      "Prof Adedeji Oyenuga",
      "Dr Samuel Adekunle",
      "Dr Lucky",
      "Barr Sunday Fiola",
      "Engr Akeem Bayewu",
      "Dr Adeosun Olayiwola",
    ],
  },
  {
    title: "Advisory Board",
    members: [
      "Prof Segun Folorunso",
      "Dr T.A Okeowo",
      "", // placeholder
      "", // placeholder
      "",
    ],
  },
];

const Leadership = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      {/* Back Button at the top with spacing */}
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      {/* Page Header */}
      <PageHeader
        title="Leadership & Governance"
        subtitle="Meet the Teams Driving AIMS Nigeria"
        backgroundImage="/images/buses.png"
      />

      {/* Page Content */}
      <Container>
        <div className="py-16 max-w-3xl mx-auto space-y-6">
          {/* Captivating Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-700 text-base sm:text-lg md:text-base leading-relaxed px-4"
          >
            At AIMS Nigeria, our leadership team, coordinators, and boards
            work tirelessly to ensure excellence in all our programs and
            initiatives. Explore the teams below to learn more about the
            people driving our vision.
          </motion.div>

          {/* Accordion Sections */}
          {teamData.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border rounded-md overflow-hidden shadow-sm"
            >
              {/* Accordion Header */}
              <motion.button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-indigo-50 text-indigo-800 font-medium text-left focus:outline-none text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{section.title}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              {/* Accordion Body */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-3 bg-white text-gray-700 list-disc list-inside space-y-1 text-sm sm:text-base"
                  >
                    {section.members.map((member, idx) => (
                      <li key={idx}>{member || "—"}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Leadership;
