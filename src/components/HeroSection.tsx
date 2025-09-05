"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Users, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2E4374] via-[#91ADC8] to-[#DDE6ED]">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Government Building"
          className="w-full h-full object-cover opacity-35"
        />
      </motion.div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/30 via-[#1E201E]/25 to-[#697565]/30"></div>

      {/* Moving Background Blobs (Soft & Slow) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-[#91ADC8] rounded-full mix-blend-screen filter blur-3xl opacity-25"
        animate={{ x: [0, 50, -50, 0], y: [0, 40, -40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[26rem] h-[26rem] bg-[#7BD3EA] rounded-full mix-blend-screen filter blur-3xl opacity-20"
        animate={{ x: [0, -60, 60, 0], y: [0, -40, 40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-[22rem] h-[22rem] bg-[#FFEDCB] rounded-full mix-blend-screen filter blur-3xl opacity-20"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.25 },
            },
          }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-white mb-8 shadow-md border border-white/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Shield className="h-5 w-5 text-white" />
            <span className="text-sm font-medium">
              Government of Jharkhand Initiative
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="relative text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Secure Certificate Verification
            {/* Gentle Shimmer */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ transform: "skewX(-20deg)" }}
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 6, repeat: Infinity }}
            ></motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Jharkhand's premier digital platform for authenticating academic
            certificates and detecting fraudulent documents through advanced AI
            and blockchain technology.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3 }}
          >
            <Link to="/auth">
              <Button
                variant="hero"
                size="xl"
                className="group relative overflow-hidden transition-all bg-white text-[#2E4374] hover:shadow-2xl hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#697565] to-[#91ADC8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  <FileCheck className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Verify Certificate
                </span>
              </Button>
            </Link>
            <a href="#about">
              <Button
                variant="outline"
                size="xl"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {/* Accuracy */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition-all duration-300 border border-white/20"
              whileHover={{ y: -5 }}
            >
              <CheckCircle className="h-12 w-12 text-[#7BD3EA] mx-auto mb-4 animate-pulse" />
              <h3 className="text-3xl font-bold text-white mb-2">99.9%</h3>
              <p className="text-white/80">Accuracy Rate</p>
            </motion.div>

            {/* Institutions */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition-all duration-300 border border-white/20"
              whileHover={{ y: -5 }}
            >
              <Users className="h-12 w-12 text-[#FFEDCB] mx-auto mb-4 animate-pulse" />
              <h3 className="text-3xl font-bold text-white mb-2">150+</h3>
              <p className="text-white/80">Institutions Connected</p>
            </motion.div>

            {/* Verified */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition-all duration-300 border border-white/20"
              whileHover={{ y: -5 }}
            >
              <Shield className="h-12 w-12 text-[#91ADC8] mx-auto mb-4 animate-pulse" />
              <h3 className="text-3xl font-bold text-white mb-2">50K+</h3>
              <p className="text-white/80">Certificates Verified</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
