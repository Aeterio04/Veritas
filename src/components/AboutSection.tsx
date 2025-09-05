"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Brain, Link as LinkIcon, Database, Eye, CheckCircle } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description:
        "Advanced machine learning algorithms identify document anomalies and detect forgeries with high accuracy.",
    },
    {
      icon: LinkIcon,
      title: "Blockchain Security",
      description:
        "Immutable verification records ensure tamper-proof and trustworthy certificate validation.",
    },
    {
      icon: Eye,
      title: "OCR Technology",
      description:
        "Intelligent text extraction and analysis from scanned documents for seamless verification.",
    },
    {
      icon: Database,
      title: "Centralized Database",
      description:
        "Comprehensive registry of all verified educational institutions across Jharkhand.",
    },
    {
      icon: CheckCircle,
      title: "Trusted & Reliable",
      description:
        "Government-backed initiative ensuring secure, transparent, and accurate certificate verification.",
    },
    {
      icon: Shield,
      title: "Cutting-Edge Security",
      description:
        "Multi-layer protection with advanced AI, blockchain, and OCR integration.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The <span className="font-semibold">Academic Authenticity Validator</span> is a cutting-edge solution 
            developed for the Government of Jharkhand to combat the growing issue of fake academic credentials. 
            Our platform leverages AI, blockchain, and OCR technology to safeguard the integrity of educational achievements.
          </p>
        </div>


        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border border-border/40 bg-card/50 backdrop-blur-md rounded-2xl"
            >
              <CardContent className="p-8">
                <div
  className="rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md"
  style={{ backgroundColor: "#91ADC8" }}
>
  <feature.icon className="h-8 w-8 text-white" />
</div>
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
