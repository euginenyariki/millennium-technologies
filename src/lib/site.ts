export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Millennium Technologies Ltd",
  shortName: "Millennium Tech",
  phone: process.env.NEXT_PUBLIC_PHONE || "+254703621053",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+254 703 621 053",
  email: process.env.NEXT_PUBLIC_EMAIL || "millenniumtechnologies20@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+254703621053",
  location: process.env.NEXT_PUBLIC_LOCATION || "Nairobi, Kenya",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  tagline: "Smart Security & Reliable Technology Solutions",
  heroHeadline: "SMART SECURITY. RELIABLE TECHNOLOGY. SUSTAINABLE ENERGY.",
  heroSub:
    "Integrated security, technology and solar solutions designed, supplied and professionally installed for homes, businesses and institutions.",
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "200+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
  ],
  process: [
    {
      num: "01",
      title: "Consultation & Site Assessment",
      desc: "Understanding client needs and conducting a thorough site evaluation to design the right solution.",
    },
    {
      num: "02",
      title: "System Design & Quotation",
      desc: "Customized solution design with clear cost breakdowns and transparent pricing — no hidden costs.",
    },
    {
      num: "03",
      title: "Installation & Configuration",
      desc: "Professional installation by skilled technicians using industry best practices and quality equipment.",
    },
    {
      num: "04",
      title: "Testing & Handover",
      desc: "Comprehensive system testing, client orientation, and formal handover with full documentation.",
    },
    {
      num: "05",
      title: "Maintenance & Support",
      desc: "Ongoing technical support, preventive maintenance contracts, and rapid fault response.",
    },
  ],
  values: [
    {
      letter: "R",
      title: "Reliability",
      desc: "We deliver solutions you can depend on — every time, without compromise.",
    },
    {
      letter: "T",
      title: "Technical Excellence",
      desc: "Skilled workmanship and the latest technology in every installation.",
    },
    {
      letter: "C",
      title: "Customer Focus",
      desc: "Tailored solutions designed around your specific needs and environment.",
    },
    {
      letter: "I",
      title: "Integrity",
      desc: "Honest service, transparent pricing, and zero hidden costs.",
    },
    {
      letter: "N",
      title: "Innovation",
      desc: "Continuously adapting to evolving security and IT industry trends.",
    },
  ],
  industries: [
    {
      slug: "residential",
      title: "Residential Homes",
      desc: "Reliable CCTV, perimeter security, and solar solutions for homeowners and residential estates.",
    },
    {
      slug: "corporate",
      title: "Corporate Offices",
      desc: "Modern integrated security, access control, and IT infrastructure for professional office environments.",
    },
    {
      slug: "schools",
      title: "Schools & Institutions",
      desc: "Safe, monitored environments for students and staff with scalable security solutions.",
    },
    {
      slug: "hospitals",
      title: "Hospitals & Clinics",
      desc: "Strict access control, 24/7 surveillance, and secure connectivity for healthcare facilities.",
    },
    {
      slug: "retail",
      title: "Retail & Commercial",
      desc: "Inventory protection, customer access management, and commercial connectivity systems.",
    },
    {
      slug: "industrial",
      title: "Industrial & Warehouses",
      desc: "Perimeter protection, gate automation, and network infrastructure for large-scale facilities.",
    },
    {
      slug: "hospitality",
      title: "Hotels & Hospitality",
      desc: "Comprehensive security and connectivity solutions for guest satisfaction and asset protection.",
    },
    {
      slug: "agriculture",
      title: "Farms & Rural",
      desc: "Solar power, Starlink connectivity, perimeter security for remote and agricultural properties.",
    },
  ],
};

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/solutions",
    label: "Solutions",
    children: [
      { href: "/solutions#cctv", label: "CCTV Surveillance" },
      { href: "/solutions#access", label: "Access Control" },
      { href: "/solutions#fence", label: "Electric Fence" },
      { href: "/solutions#gate", label: "Gate Automation" },
      { href: "/solutions#solar", label: "Solar & Green Energy" },
      { href: "/solutions#network", label: "Networking" },
      { href: "/solutions#starlink", label: "Starlink" },
      { href: "/solutions#it", label: "IT Support" },
    ],
  },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
