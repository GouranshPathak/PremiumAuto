import { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestDriveForm from "@/components/TestDriveForm";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Show back arrow when not on home page
  const showBackArrow = location.pathname !== '/';

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Inventory", href: "/inventory" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-card border-b rounded-none">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Back Arrow & Logo */}
          <div className="flex items-center space-x-3">
            {showBackArrow && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gradient">
                PremiumAuto
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <TestDriveForm>
              <Button className="btn-premium">
                Book Test Drive
              </Button>
            </TestDriveForm>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4">
                <TestDriveForm>
                  <Button className="btn-premium w-full">
                    Book Test Drive
                  </Button>
                </TestDriveForm>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;