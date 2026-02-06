// components/layout/PageHeader.tsx
import { motion } from "framer-motion";
import Container from "../Container";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  backgroundImage: string;
};

const PageHeader = ({ title, subtitle, backgroundImage }: PageHeaderProps) => {
  return (
    <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Brand gradient overlay (matches Hero feel) */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/85 via-indigo-800/80 to-violet-700/70" />

      {/* Dark edge vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to right,
            rgba(0,0,0,0.55) 0%,
            rgba(0,0,0,0.15) 25%,
            rgba(0,0,0,0.15) 75%,
            rgba(0,0,0,0.55) 100%
          )`,
        }}
      />

      {/* Content */}
      <Container>
        <div className="relative z-10 h-full flex flex-col justify-center max-w-3xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="mt-4 text-sm sm:text-base md:text-lg text-white/90"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PageHeader;
