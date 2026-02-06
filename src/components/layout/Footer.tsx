import { Link } from "react-router-dom";
import Container from "../Container";
import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative mt-16">
      {/* Purple gradient overlay (same as hero) */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/85 via-indigo-800/80 to-violet-700/70" />

      {/* Darker edges overlay (same as hero) */}
      <div
        className="absolute inset-0 pointer-events-none"
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

      {/* Footer content */}
      <div className="relative z-10 text-violet-100">
        <Container>
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14">
            {/* Logo + Authority */}
            <div>
              <img src="/images/logo.png" alt="AIMS Nigeria Logo" className="h-14 mb-4" />
              <p className="text-sm leading-relaxed text-violet-100/90">
                Advancing Information Management, ICT, and administrative
                sciences through professional standards, training, research,
                and national development.
              </p>
              <p className="mt-3 text-xs text-violet-200/80">
                Established under Act No. 1 of 1990 (Part C)
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About AIMS</Link></li>
                <li><Link to="/membership/categories" className="hover:text-white transition">Membership</Link></li>
                <li><Link to="/training" className="hover:text-white transition">Training & Services</Link></li>
                <li><Link to="/publications" className="hover:text-white transition">Publications</Link></li>
              </ul>
            </div>

            {/* Membership */}
            <div>
              <h4 className="text-white font-semibold mb-4">Membership</h4>
              <ul className="space-y-2 text-sm text-violet-100/90">
                <li>Associate</li>
                <li>Graduate</li>
                <li>Student</li>
                <li>Full Member</li>
                <li>Fellow</li>
                <li>Corporate Member</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <FiMapPin className="mt-1" />
                  <span>161, Ikorodu Road,<br />Onipanu Bus-Stop, Lagos</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiPhone />
                  <span>08103059590, 09012456251</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiMail />
                  <span>info@aimsinstituteng.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiGlobe />
                  <span>www.aimsinstituteng.org</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-violet-400/40 py-6 text-sm text-violet-100/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} AIMS Nigeria. All rights reserved.</p>
            <p className="text-center md:text-right">Certified Professional Association</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
