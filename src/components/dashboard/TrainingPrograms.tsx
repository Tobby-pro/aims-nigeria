// src/components/dashboard/TrainingPrograms.tsx
import { motion } from "framer-motion";
import { Lock, BookOpen } from "lucide-react";

const programs = [
  {
    id: "pgdm",
    title: "Post Graduate Diploma in Management",
    duration: "6 Months",
    fee: 120000,
    focus: "Leadership & Strategy",
    locked: true, // ✅ LOCKED
  },
  {
    id: "marketing",
    title: "Higher Diploma in Marketing",
    duration: "5 Months",
    fee: 90000,
    focus: "Marketing",
    locked: true, // ✅ LOCKED
  },
  {
    id: "data-analytics",
    title: "Advanced Data Analytics",
    duration: "4 Months",
    fee: 150000,
    focus: "Data Science",
    locked: true, // ✅ LOCKED
  },
];

const TrainingPrograms = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Training Programs
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            className="relative p-6 rounded-xl shadow bg-gray-100"
          >
            {/* 🔒 LOCK OVERLAY (ALWAYS ACTIVE) */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10">
              <Lock className="text-gray-500 mb-2" size={28} />
              <p className="text-sm font-medium text-gray-600">
                Locked
              </p>
            </div>

            {/* CONTENT */}
            <div className="opacity-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <BookOpen size={20} />
                </div>

                <h3 className="text-lg font-semibold">
                  {program.title}
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                Duration: {program.duration}
              </p>

              <p className="text-sm text-gray-500">
                Focus: {program.focus}
              </p>

              <p className="text-sm font-medium mt-2">
                ₦{program.fee.toLocaleString()}
              </p>

              {/* ❌ BUTTON REMOVED COMPLETELY */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPrograms;