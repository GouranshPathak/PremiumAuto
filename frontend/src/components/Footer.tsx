import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const quickLinks = [
    { name: "All Vehicles", href: "/inventory" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Testimonials", href: "/testimonials" }
  ];

  const brands = [
    "Hyundai", "Tata Motors", "Mahindra", "Bajaj", "Maruti Suzuki", "Toyota"
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-4">
                PremiumAuto
              </h3>
              <p className="text-muted-foreground mb-6">
                Your trusted partner for premium vehicles. Experience luxury, 
                quality, and exceptional service with every purchase.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>info@premiumauto.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>123 Auto Plaza, City Center</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Brands</h4>
              <ul className="space-y-2">
                {brands.map((brand) => (
                  <li key={brand}>
                    <span className="text-muted-foreground">{brand}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Operating Hours & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Operating Hours</h4>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex flex-wrap space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 PremiumAuto. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <a href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                Testimonials
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;