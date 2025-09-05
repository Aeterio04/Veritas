import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user && profile) {
      const dashboardPath = profile.role === 'admin' ? '/admin-dashboard' : '/university-dashboard';
      navigate(dashboardPath);
    } else {
      navigate('/auth');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Jharkhand CertifyTrust</h1>
              <p className="text-sm text-muted-foreground">Academic Authenticity Validator</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#process" className="text-foreground hover:text-primary transition-colors">Process</a>
            <a href="#statistics" className="text-foreground hover:text-primary transition-colors">Statistics</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user && profile ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {profile.full_name || 'User'}
                </span>
                <Button variant="outline" onClick={handleAuthAction}>
                  {profile.role === 'admin' ? 'Admin Dashboard' : 'University Dashboard'}
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleAuthAction}>Login</Button>
                <Button onClick={handleAuthAction}>Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#process" className="text-foreground hover:text-primary transition-colors">Process</a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
              <div className="flex flex-col gap-2 mt-4">
                {user && profile ? (
                  <>
                    <div className="text-sm text-muted-foreground mb-2">
                      Welcome, {profile.full_name || 'User'}
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => { handleAuthAction(); setIsMenuOpen(false); }}>
                      {profile.role === 'admin' ? 'Admin Dashboard' : 'University Dashboard'}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" onClick={() => { handleAuthAction(); setIsMenuOpen(false); }}>
                      Login
                    </Button>
                    <Button className="w-full" onClick={() => { handleAuthAction(); setIsMenuOpen(false); }}>
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;