// components/layout/AboutPreview.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../Container";

const AboutPreview = () => {
  const [expanded, setExpanded] = useState(false);

  // 🔥 Typewriter state
  const texts = [
    "Empowering Information Professionals",
    "Driving Excellence in Management Science",
    "Shaping the Future of Data & Innovation",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
      }

      // Done typing
      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 1200);
      }

      // Done deleting → move to next
      if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex]);

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT CONTENT */}
          <div className="flex-1 max-w-xl">
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full">
              Certified Professional Body
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Association for Information and Management Science, Nigeria
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              AIMS is a professional body committed to setting standards,
              developing capacity, and promoting excellence in Information and
              Management Science practice across Nigeria.
            </p>

            {expanded && (
              <p className="text-gray-600 leading-relaxed mb-4 transition-all">
                Established under Act No. 1 of 1990 (Part C), AIMS operates as an
                independent, non-profit institution aligned with global best
                practices, supporting professionals, institutions, and policy
                development in the information sector.
              </p>
            )}

            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={() => setExpanded(!expanded)}
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition"
              >
                {expanded ? "Show Less ↑" : "Read More ↓"}
              </button>

              <Link
                to="/about"
                className="font-semibold text-gray-900 hover:text-indigo-600 transition"
              >
                Full Profile →
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE WITH TYPEWRITER */}
          <div className="flex-1 relative w-full max-w-md mx-auto">

            {/* IMAGE */}
            <img
              src="/images/new_box.jpg"
              alt="AIMS professional engagement"
              className="w-full rounded-2xl shadow-lg object-cover"
            />

            {/* DARK OVERLAY FOR READABILITY */}
            <div className="absolute inset-0 rounded-2xl bg-black/40" />

            {/* TYPEWRITER TEXT */}
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl leading-snug">
                {displayedText}
                <span className="animate-pulse">|</span>
              </h3>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutPreview;