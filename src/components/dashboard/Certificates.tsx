import { motion } from "framer-motion";
import { Award, Lock, Download, FileCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// We keep the type but start with an empty array for a "Newbie" experience
const certificates: { title: string; date: string }[] = [];

const Certificates = () => {
  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className="p-4 md:p-8 max-w-5xl mx-auto space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Official <span className="text-indigo-600">Certifications</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">
            Verified professional credentials from AIMS Nigeria.
          </p>
        </div>
        
        {certificates.length > 0 && (
            <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-2 w-fit">
                <FileCheck size={14} />
                {certificates.length} Documented
            </div>
        )}
      </motion.div>

      {/* Main Content Area */}
      <div className="space-y-4">
        {certificates.length > 0 ? (
          certificates.map((cert, i) => (
            <motion.div
              key={i}
              variants={itemVars}
              whileHover={{ x: 5 }}
              className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-gray-800">{cert.title}</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Issued: {cert.date}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-gray-200">
                <Download size={16} />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            </motion.div>
          ))
        ) : (
          /* --- MODERN EMPTY STATE --- */
          <motion.div 
            variants={itemVars}
            className="bg-white border-2 border-dashed border-gray-200 rounded-[2rem] p-12 md:p-20 flex flex-col items-center text-center space-y-6"
          >
            <div className="relative">
                <div className="bg-indigo-50 p-8 rounded-full">
                    <Award size={64} className="text-indigo-200" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg border border-gray-100">
                    <Lock size={20} className="text-amber-500" />
                </div>
            </div>

            <div className="max-w-sm space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 italic">No certificates found... yet!</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    Complete your training modules and pass the final assessments to earn your professional credentials.
                </p>
            </div>

            <Link 
                to="/dashboard/training" 
                className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-105"
            >
                Start Learning
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* --- FOOTER INFO --- */}
      <motion.div 
        variants={itemVars}
        className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 flex items-start gap-4"
      >
        <div className="text-indigo-600 mt-1">
            <FileCheck size={20} />
        </div>
        <p className="text-xs text-indigo-900/70 leading-relaxed font-medium">
            All certificates issued by AIMS Nigeria are cryptographically signed and can be verified by employers using the unique certificate ID found on the document.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Certificates;