import { useState } from "react";
import Container from "../Container";

const AboutPreview = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 max-w-xl">
            {/* Badge */}
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full">
              Certified Professional Body
            </span>

            {/* Heading (short, clean, not repetitive) */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
             Association for Information and Management Science, Nigeria
            </h2>

            {/* Core Preview */}
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              AIMS is a professional body committed to setting standards,
              developing capacity, and promoting excellence in Information and
              Management Science practice across Nigeria.
            </p>

            {/* Expandable Content */}
            {expanded && (
              <p className="text-gray-600 leading-relaxed mb-4 transition-all">
                Established under Act No. 1 of 1990 (Part C), AIMS operates as an
                independent, non-profit institution aligned with global best
                practices, supporting professionals, institutions, and policy
                development in the information sector.
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={() => setExpanded(!expanded)}
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition"
              >
                {expanded ? "Show Less ↑" : "Read More ↓"}
              </button>

              <a
                href="/about"
                className="font-semibold text-gray-900 hover:text-indigo-600 transition"
              >
                Full Profile →
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1">
            <img
              src="/images/new_box.jpg"
              alt="AIMS professional engagement"
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutPreview;
