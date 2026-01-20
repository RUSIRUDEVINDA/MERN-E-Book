import React from "react";
import { ArrowRight, Sparkles, BookOpen, Zap } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import HERO_IMG from "../../assets/hero-img.png";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative bg-gradient-to-br from-violet-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/*Left Content*/}
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-900">
                AI Powered Publishing
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight"
              style={{
                fontFamily:
                  "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Create Stunning
              <span className="block mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                eBooks in Minutes with AI
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Transform your ideas into beautifully designed eBooks effortlessly
              with our AI-powered platform. Write, format, and publish in
              minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:space-x-4 space-y-4 sm:space-y-0">
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="group inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-600 text-white text-lg font-semibold rounded-lg shadow-lg transition"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">eBooks Created</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">10min</div>
                <div className="text-sm text-gray-600">Avg. Creation Time</div>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative">
              <div className="absolute inset-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl opacity-100 blur-xl"></div>
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <img
                  src={HERO_IMG}
                  alt="AI eBook Creator"
                  className="relative z-10 rounded-xl shadow-lg"
                />

                <div className="absolute top-6 right-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm border border-gray-100 animate-in fade-in slide-in-from-right duration-700 z-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Processing</div>
                      <div className="text-sm font-semibold text-gray-900">
                        AI Generation
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm border border-gray-100 animate-in fade-in slide-in-from-left duration-700 z-50">
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Completed</div>
                        <div className="text-sm font-semibold text-gray-600">
                          247 Pages
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
