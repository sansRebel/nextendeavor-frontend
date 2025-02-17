import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 shadow-inner mt-1">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* 🌍 Branding & Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} <span className="text-primary font-semibold">NextEndeavor</span>. All rights reserved.
        </p>

        {/* 🔗 Social Media Links */}
        <div className="flex gap-5 text-xl mt-4 md:mt-0">
          <a
            href="https://instagram.com/khaledalsanafi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#E4405F] transition duration-300 transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/in/khaled-al-sanafi-0251232a0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#0077B5] transition duration-300 transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/sansRebel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 transform hover:scale-110"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
