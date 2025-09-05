"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the certificate verification process work?",
      answer:
        "Our platform uses advanced OCR technology to extract key information from uploaded certificates, then cross-references this data against verified institutional databases. AI algorithms analyze document authenticity, detecting tampering, forgery, and anomalies with 99.9% accuracy.",
    },
    {
      question: "What types of certificates can be verified?",
      answer:
        "We support verification of all academic certificates issued by recognized institutions in Jharkhand, including degree certificates, diplomas, mark sheets, and transcripts. The platform works with both digital certificates and scanned copies of physical documents.",
    },
    {
      question: "Is my document data secure and private?",
      answer:
        "Absolutely. We employ enterprise-grade security with 256-bit encryption. All uploaded documents are processed securely and automatically deleted after verification. We strictly adhere to data privacy regulations and never store personal information longer than necessary.",
    },
    {
      question: "How long does the verification process take?",
      answer:
        "Most verifications are completed within 60 seconds. Complex cases or documents requiring additional cross-referencing may take up to 5 minutes. You'll receive real-time updates throughout the process.",
    },
    {
      question: "What happens if a certificate is flagged as fraudulent?",
      answer:
        "If fraud is detected, the system generates a detailed report highlighting specific issues found. The relevant educational institution and appropriate authorities are notified. The document is flagged in our database to prevent future misuse.",
    },
    {
      question: "Can legacy certificates (pre-digitization) be verified?",
      answer:
        "Yes, our advanced OCR and AI systems are specifically designed to handle legacy certificates. We maintain historical records and can verify documents issued before digital systems were implemented at institutions.",
    },
    {
      question: "Who can access the verification system?",
      answer:
        "The platform serves multiple stakeholders: educational institutions for uploading records, employers for verification, admission offices for student verification, scholarship agencies, and government departments. Each user type has appropriate access controls.",
    },
    {
      question: "Is there a cost for using the verification service?",
      answer:
        "As a government initiative, basic verification services are provided free of charge to promote educational integrity. Premium features for bulk verification and API access may have nominal charges for institutional users.",
    },
    {
      question: "How accurate is the fraud detection system?",
      answer:
        "Our AI-powered system achieves 99.9% accuracy in fraud detection. It can identify tampered grades, forged seals, invalid certificate numbers, non-existent institutions, and cloned documents. The system continuously learns and improves its detection capabilities.",
    },
    {
      question: "What should I do if my legitimate certificate is flagged incorrectly?",
      answer:
        "If you believe your certificate has been incorrectly flagged, you can initiate an appeal process through the platform. Our verification team will manually review the case with your institution. Most appeals are resolved within 48 hours.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="rounded-xl p-4 w-fit mx-auto mb-6 shadow-md"
            style={{ backgroundColor: "#91ADC8" }}
          >
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about our certificate verification platform
            and how it safeguards educational integrity across Jharkhand.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-md border border-border/40 rounded-xl px-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-[#91ADC8] text-lg py-5 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Support Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Still have questions? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@jharkhancertifytrust.gov.in"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: "#91ADC8", color: "white" }}
            >
              <HelpCircle className="h-5 w-5" />
              Contact Support
            </a>
            <a
              href="tel:+91-651-2xxx-xxx"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: "#6BBF59", color: "white" }}
            >
              <Phone className="h-5 w-5" />
              Call Helpline
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
