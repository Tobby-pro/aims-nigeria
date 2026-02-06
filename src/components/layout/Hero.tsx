// components/layout/Hero.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../Container";

const MotionLink = motion(Link);

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[calc(80vh-4rem)] pt-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/dope1.png)" }}
      />

      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/85 via-indigo-800/80 to-violet-700/70" />

      {/* Darker edges overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to right, 
            rgba(0,0,0,0.5) 0%,
            rgba(0,0,0,0) 20%,
            rgba(0,0,0,0) 80%,
            rgba(0,0,0,0.5) 100%
          )`,
        }}
      />

      {/* Hero content */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col justify-center h-[80vh] max-w-3xl text-white"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4"
          >
            ASSOCIATION FOR INFORMATION AND MANAGEMENT SCIENCE, NIGERIA
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-sm sm:text-lg lg:text-2xl leading-relaxed mb-6"
          >
            Certified Professional Body
            <br />
            Established under Act No. 1 of 1990 Part C
          </motion.p>

          {/* ✅ FIXED CTA */}
          <MotionLink
            to="/about"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block w-fit px-5 py-3 text-sm sm:text-base bg-white text-indigo-700 font-semibold rounded shadow hover:bg-gray-100 transition"
          >
            Learn More
          </MotionLink>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
