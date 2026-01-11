import React from "react";
import { FEATURES } from "../../utils/data";

const Features = () => {
  return (
    <div
      id="features"
      className="relative py-12 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-violet-100 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-violet-900">
              Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Everything you need to
            <span className="block mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Create Your Ebook
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Our platform offers a comprehensive suite of tools designed to
            simplify the ebook creation process, making it accessible for
            everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-violet-200 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 to-purple-50/0 group-hover:from-violet-50/50 group-hover:to-purple-50/30 rounded-2xl transition-all duration-300"></div>

                <div className="relative space-y-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-${feature.gradient}/20 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-900 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-violet-600 text-sm font-medium inline-flex items-center">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="CurrentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Ready to get started?</p>
          <a
            href="/signup"
            className="inline-flex items-center space-x-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
          >
            <span>Start Creating Today</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="CurrentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
