import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialIcon {
  icon: React.ReactNode;
  href: string;
}

interface FooterProps {
  logo?: string;
  brandName?: string;
  bgColor?: string;
  textColor?: string;
  linkColor?: string;
  hoverColor?: string;
  sections: { title: string; links: FooterLink[] }[];
  socialIcons?: SocialIcon[];
  copyrightText?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  brandName = "My Company",
  bgColor = "bg-gray-900",
  textColor = "text-white",
  linkColor = "text-gray-300",
  hoverColor = "hover:text-gray-400",
  sections,
  socialIcons = [],
  copyrightText = "© 2024 My Company. All rights reserved.",
}) => {
  return (
    <footer className={`w-full ${bgColor} ${textColor} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Logo */}
          <div className="flex flex-col items-center md:items-start">
            {logo && <img src={logo} alt="Logo" className="h-12 mb-2" />}
            <h2 className="text-xl font-bold">{brandName}</h2>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <ul className="mt-2 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className={`${linkColor} ${hoverColor} transition duration-300`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media Icons */}
          {socialIcons.length > 0 && (
            <div className="flex justify-center md:justify-end space-x-4">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  className={`${hoverColor} text-2xl`}
                >
                  {icon.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};
