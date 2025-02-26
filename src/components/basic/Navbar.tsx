import React, { useState } from "react";

interface NavItem {
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
}

interface NavbarProps {
  logo?: string;
  brandName?: string;
  menuItems: NavItem[];
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
  mobileMenuBg?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  brandName = "Brand",
  menuItems,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  hoverColor = "hover:bg-blue-700",
  mobileMenuBg = "bg-blue-800",
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  return (
    <nav className={`w-full ${bgColor} ${textColor} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Brand */}
          <div className="flex items-center">
            {logo && <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />}
            <span className="text-xl font-bold">{brandName}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.submenu ? (
                  <div
                    className="relative cursor-pointer"
                    onMouseEnter={() => setDropdownOpen(item.label)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <span
                      className={`px-4 py-2 rounded-md flex items-center gap-1 ${hoverColor}`}
                    >
                      {item.label}{" "}
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="10px"
                        width="10px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                      </svg>
                    </span>
                    {/* Dropdown */}
                    {dropdownOpen === item.label && (
                      <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                        {item.submenu.map((sub, subIndex) => (
                          <a
                            key={subIndex}
                            href={sub.href}
                            className="block px-4 py-2 hover:bg-gray-200"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`px-4 py-2 rounded-md ${hoverColor}`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className={`md:hidden ${mobileMenuBg} py-2 rounded-lg`}>
            {menuItems.map((item, index) => (
              <div key={index} className="text-center">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      className={`w-full py-2 flex items-center justify-center gap-1 ${hoverColor}`}
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}{" "}
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="10px"
                        width="10px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                      </svg>
                    </button>
                    {dropdownOpen === item.label && (
                      <div className="bg-white text-black rounded-md shadow-md mt-2">
                        {item.submenu.map((sub, subIndex) => (
                          <a
                            key={subIndex}
                            href={sub.href}
                            className="block px-4 py-2 hover:bg-gray-200"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a href={item.href} className={`block py-2 ${hoverColor}`}>
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
