// pages/Leadership.tsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/layout/PageHeader";
import Container from "../components/Container";
import BackButton from "../components/layout/BackButton";

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
    members: ["Prof Segun Folorunso", "Dr T.A Okeowo"],
  },
];

const Leadership = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  // 👉 Auto-focus user on accordion when page loads
  useEffect(() => {
    accordionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      <Container className="pt-4">
        <BackButton fallbackPath="/" />
      </Container>

      <PageHeader
        title="Leadership & Governance"
        subtitle="The people guiding the vision and integrity of AIMS Nigeria"
        backgroundImage="/images/buses.png"
      />

      <Container>
        <div
          ref={accordionRef}
          className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
        >
          {/* ================= LEFT: ACCORDION ================= */}
          <div className="space-y-4">
            {teamData.map((section, index) => {
              const isOpen = openIndex === index;
              const previewMembers = section.members.slice(0, 2);

              return (
                <motion.div
                  key={section.title}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Header */}
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="w-full px-5 py-4 flex justify-between items-center text-left"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {section.title}
                      </h3>

                      {!isOpen && (
                        <p className="text-xs text-gray-500 mt-1">
                          {previewMembers.join(", ")}
                          {section.members.length > 2 && " …"}
                        </p>
                      )}
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-gray-400"
                    >
                      ▼
                    </motion.span>
                  </button>

                  {/* Body */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-5 space-y-2 text-sm text-gray-700"
                      >
                        {section.members.map((member, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            {member}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* ================= RIGHT: IMAGE ================= */}
          <div className="hidden lg:block sticky top-24">
            <img
              src="/images/leads_pro.png"
              alt="AIMS Leadership"
              className="rounded-2xl shadow-lg object-cover w-full"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Leadership;
