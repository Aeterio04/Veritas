import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Jharkhand CertifyTrust</h3>
                <p className="text-sm text-accent-foreground/80">Academic Authenticity Validator</p>
              </div>
            </div>
            <p className="text-accent-foreground/80 mb-6 leading-relaxed">
              Official digital platform by the Government of Jharkhand for authenticating academic certificates 
              and combating educational fraud through advanced AI and blockchain technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-accent-foreground/10 rounded-lg hover:bg-accent-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-accent-foreground/10 rounded-lg hover:bg-accent-foreground/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-accent-foreground/10 rounded-lg hover:bg-accent-foreground/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">Home</Link></li>
              <li><a href="#about" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">About Us</a></li>
              <li><a href="#process" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">Verification Process</a></li>
              <li><a href="#statistics" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">Statistics</a></li>
              <li><a href="#faq" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">FAQ</a></li>
              <li><Link to="/auth" className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">Login / Sign Up</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><span className="text-accent-foreground/80">Certificate Verification</span></li>
              <li><span className="text-accent-foreground/80">Fraud Detection</span></li>
              <li><span className="text-accent-foreground/80">Institutional Integration</span></li>
              <li><span className="text-accent-foreground/80">Bulk Verification</span></li>
              <li><span className="text-accent-foreground/80">API Access</span></li>
              <li><span className="text-accent-foreground/80">Technical Support</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-accent-foreground/80">
                    Higher Education Department<br />
                    Government of Jharkhand<br />
                    Ranchi, Jharkhand - 834001
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <p className="text-accent-foreground/80">+91-651-2xxx-xxx</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <p className="text-accent-foreground/80">support@jharkhancertifytrust.gov.in</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-accent-foreground/5 rounded-lg border border-accent-foreground/10">
              <h5 className="font-semibold text-accent-foreground mb-2">Support Hours</h5>
              <p className="text-sm text-accent-foreground/80">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 2:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-accent-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-4 text-sm text-accent-foreground/80">
              <span>© 2024 Jharkhand CertifyTrust. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span>Government of Jharkhand Initiative</span>
            </div>
            <div className="flex gap-6 text-sm text-accent-foreground/80">
              <a href="#" className="hover:text-accent-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent-foreground transition-colors">Accessibility</a>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-accent-foreground/60">
            <p>
              This platform is developed in compliance with Government of India's Digital India initiative 
              and follows all applicable data protection and privacy regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;