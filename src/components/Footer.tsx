import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-foreground py-3 text-sm shadow-inner mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p>© {new Date().getFullYear()} NextEndeavor. All rights reserved.</p>

        {/* 🔗 Social Icons */}
        <div className="flex gap-5 text-xl mt-2 md:mt-0">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
            <FaTwitter />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
