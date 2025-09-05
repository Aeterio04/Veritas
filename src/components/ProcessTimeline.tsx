"use client";

import { useState } from "react";
import {
  Upload,
  Cpu,
  Search,
  CheckCircle,
  Clock,
  Shield,
  GraduationCap,
  FileCheck,
} from "lucide-react";

const steps = [
  {
    title: "Upload Document",
    description:
      "Securely upload your certificate or degree document in PDF, JPEG, or PNG format. Our system accepts both digital and scanned copies.",
    details:
      "Advanced encryption ensures your documents are processed securely with military-grade protection.",
    duration: "30 seconds",
    icon: Upload,
  },
  {
    title: "AI Analysis",
    description:
      "Advanced machine learning algorithms analyze document structure, extract key information, and detect signs of tampering or forgery.",
    details:
      "Neural networks trained on millions of documents provide 99.8% accuracy in fraud detection.",
    duration: "15 seconds",
    icon: Cpu,
  },
  {
    title: "Database Verification",
    description:
      "Cross-reference extracted data with our comprehensive database of verified institutions and authentic certificate records.",
    details:
      "Real-time access to 250+ verified institutions across Jharkhand with blockchain validation.",
    duration: "10 seconds",
    icon: Search,
  },
  {
    title: "Instant Results",
    description:
      "Receive immediate verification results with detailed analysis report, confidence score, and authenticity confirmation.",
    details:
      "Comprehensive reports with blockchain proof and downloadable verification certificates.",
    duration: "5 seconds",
    icon: CheckCircle,
  },
];

const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section
      id="process"
      className="relative w-full bg-[#91ADC8] py-20 overflow-hidden"
    >
      {/* Decorative Floating Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Shield className="absolute top-10 left-10 size-14 animate-pulse" />
        <GraduationCap className="absolute bottom-16 right-20 size-14 animate-bounce" />
        <FileCheck className="absolute top-1/3 left-1/4 size-14 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Our streamlined verification process ensures quick and accurate
            certificate authentication using cutting-edge AI, blockchain
            technology, and comprehensive database verification.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative w-full">
          {/* Connecting Timeline Line */}
          <div className="absolute top-16 left-24 right-24 h-1 bg-white rounded-full hidden md:block"></div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-6 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-1 max-w-xs text-center relative z-10"
              >
                {/* Step Number */}
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center cursor-pointer font-bold text-xl shadow-lg transition-all duration-300 ${
                    activeStep === index
                      ? "bg-white text-[#1E201E] scale-110 shadow-2xl"
                      : "bg-[#1E201E] text-white hover:scale-105"
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {index + 1}
                </div>

                {/* Step Card */}
                <div
                  className={`p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 border ${
                    activeStep === index
                      ? "bg-white border-white scale-105 shadow-xl"
                      : "bg-white/90 border-transparent hover:shadow-xl"
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Icon */}
                  <div
                    className={`mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-xl transition-all duration-300 ${
                      activeStep === index
                        ? "bg-[#1E201E] scale-105 rotate-3"
                        : "bg-[#1E201E] hover:scale-105"
                    }`}
                  >
                    <step.icon size={36} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#1E201E] mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Duration */}
                  <span className="inline-flex items-center gap-2 bg-[#1E201E] text-white px-3 py-1 rounded-full text-xs font-medium">
                    <Clock size={14} /> {step.duration}
                  </span>

                  {/* Details */}
                  {activeStep === index && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-700 border border-gray-300">
                      {step.details}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 text-center">
          <div className="text-white text-lg font-medium mb-3">
            Verification Progress
          </div>
          <div className="w-4/5 mx-auto h-3 bg-white/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
