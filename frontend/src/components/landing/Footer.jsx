import { Link } from "react-router-dom";
import { BookOpen, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-950 to-violet-950 text-white overflow-hidden">
      {/*Subtle Background Pattern*/}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/*Brand Section*/}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                eBook Creator
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Create, design and publish stunning eBooks with the power of AI.
            </p>

            {/*Social Media Links*/}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://twitter.com/"
                className="w-10 h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="w-10 h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/"
                className="w-10 h-10 bg-white/5 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/*Quick Links Section*/}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 text-sm">Features</li>
                <li className="text-gray-400 text-sm">Pricing</li>
                <li className="text-gray-400 text-sm">Templates</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 text-sm">About</li>
                <li className="text-gray-400 text-sm">Contact</li>
                <li className="text-gray-400 text-sm">Blog</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 text-sm">Terms of Service</li>
                <li className="text-gray-400 text-sm">Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>

        {/*Footer Bottom Section*/}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} eBook Creator. All rights
              reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with <span className="text-violet-400">💖</span> for
              creators.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
