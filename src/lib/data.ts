export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  availability: Availability;
  short: string;
  description: string;
  specs: string[];
  features: string[];
  warranty: string;
  installable: boolean;
  installPrice?: number;
  art: string;
  featured?: boolean;
};

export type CategorySlug =
  | "cctv"
  | "access-control"
  | "electric-fence"
  | "gate-automation"
  | "solar"
  | "networking"
  | "it-equipment";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  art: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "cctv",
    name: "CCTV & Surveillance",
    tagline: "Watch everything that matters",
    description:
      "IP cameras, analog systems, DVR/NVR recorders, storage, cabling and accessories for complete video surveillance.",
    art: "camera",
  },
  {
    slug: "access-control",
    name: "Access Control",
    tagline: "Control who enters — and who doesn't",
    description:
      "Biometric readers, facial recognition, RFID, magnetic locks and door controllers for secure, audited entry.",
    art: "fingerprint",
  },
  {
    slug: "electric-fence",
    name: "Electric Fence",
    tagline: "Perimeter protection that deters",
    description:
      "Energizers, fence wire, insulators, warning signs and backup batteries for robust perimeter security.",
    art: "fence",
  },
  {
    slug: "gate-automation",
    name: "Gate Automation",
    tagline: "Effortless, secure entry",
    description:
      "Sliding and swing gate motors, remotes, GSM controllers, safety sensors and barrier systems.",
    art: "gate",
  },
  {
    slug: "solar",
    name: "Solar & Energy",
    tagline: "Sustainable power, engineered right",
    description:
      "Solar panels, hybrid and off-grid inverters, battery storage, solar lighting and water-pumping equipment.",
    art: "solar",
  },
  {
    slug: "networking",
    name: "Networking & Connectivity",
    tagline: "Connectivity you can rely on",
    description:
      "Routers, switches, access points, structured cabling solutions, racks, patch panels and network accessories.",
    art: "network",
  },
  {
    slug: "it-equipment",
    name: "IT Equipment",
    tagline: "Technology that keeps you working",
    description:
      "Computers, storage, UPS systems, and IT accessories — supplied, configured and supported.",
    art: "it",
  },
];

export const categoryMap: Record<CategorySlug, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<CategorySlug, Category>;

export const availabilityLabel: Record<Availability, { label: string; dot: string }> = {
  in_stock: { label: "In Stock", dot: "bg-green-500" },
  low_stock: { label: "Low Stock", dot: "bg-amber-400" },
  out_of_stock: { label: "Order on Request", dot: "bg-gray-400" },
};

export const PRODUCTS: Product[] = [
  // ── CCTV ──────────────────────────────────────────────────────────────
  {
    slug: "4mp-ip-bullet-camera",
    name: "Hikvision-Style 4MP IP Bullet Camera",
    category: "cctv",
    subcategory: "IP Cameras",
    sku: "MT-CCTV-001",
    price: 13500,
    availability: "in_stock",
    short: "4MP ultra-clear IP bullet camera with infrared night vision and weatherproof housing.",
    description:
      "A 4MP IP bullet camera engineered for crisp day and night surveillance of outdoor areas. Features built-in infrared illumination, IP67 weatherproof casing, and Power-over-Ethernet for a single-cable installation. Ideal for perimeters, parking areas, and external walkways.",
    specs: [
      "4MP (2688 × 1520) resolution",
      "30m IR night vision",
      "IP67 weatherproof rating",
      "H.265 compression",
      "PoE (802.3af) powered",
      "Wide dynamic range (WDR)",
    ],
    features: ["Outdoor rated", "Remote viewing ready", "MicroSD / NVR recording", "Motion detection"],
    warranty: "12 months",
    installable: true,
    installPrice: 3500,
    art: "bullet",
    featured: true,
  },
  {
    slug: "4mp-ip-dome-camera",
    name: "4MP IP Dome Camera",
    category: "cctv",
    subcategory: "IP Cameras",
    sku: "MT-CCTV-002",
    price: 12500,
    availability: "in_stock",
    short: "Discreet 4MP IP dome camera ideal for indoor ceilings and retail spaces.",
    description:
      "A compact 4MP IP dome camera suited for indoor areas where discreet, vandal-resistant surveillance is required. Featuring 3D DNR and smart motion detection, it delivers clear footage in corridors, lobbies, and retail counters.",
    specs: [
      "4MP (2688 × 1520) resolution",
      "2.8mm fixed lens",
      "Vandal-resistant dome",
      "H.265 compression",
      "PoE powered",
      "10m IR / white-light optional",
    ],
    features: ["Indoor rated", "Ceiling mount", "Motion detection", "Remote viewing"],
    warranty: "12 months",
    installable: true,
    installPrice: 3000,
    art: "dome",
  },
  {
    slug: "ptz-ip-camera",
    name: "4MP IP PTZ Camera — 25x Zoom",
    category: "cctv",
    subcategory: "PTZ Cameras",
    sku: "MT-CCTV-003",
    price: 78000,
    compareAtPrice: 85000,
    availability: "in_stock",
    short: "Auto-tracking 4MP PTZ dome with 25x optical zoom and 120m IR.",
    description:
      "A professional pan-tilt-zoom camera with 25x optical zoom and auto-tracking for large open areas. Delivers 360° pan coverage with 120m infrared, ideal for compounds, parking lots, and perimeters that need active monitoring.",
    specs: [
      "4MP resolution",
      "25x optical zoom (4.8–120mm)",
      "360° continuous pan",
      "120m IR night vision",
      "PoE+ powered",
      "Auto-tracking",
    ],
    features: ["Outdoor rated IP66", "Telemetry control", "Preset tours", "Remote PTZ"],
    warranty: "12 months",
    installable: true,
    installPrice: 9000,
    art: "ptz",
    featured: true,
  },
  {
    slug: "8ch-dvr",
    name: "8-Channel HD DVR",
    category: "cctv",
    subcategory: "DVR",
    sku: "MT-CCTV-004",
    price: 28000,
    availability: "in_stock",
    short: "8-channel 1080p DVR with HDMI output and mobile remote viewing.",
    description:
      "An 8-channel analog HD DVR supporting 1080p input, one-touch mobile remote viewing, and intuitive playback. Includes 4 audio-in channels and H.265+ compression to store more footage per drive. Works with PoE or analog cameras via BNC adapter when required.",
    specs: [
      "8 × 1080p channels",
      "H.265+ compression",
      "1 SATA bay (up to 8TB)",
      "HDMI + VGA output",
      "Remote viewing (iOS / Android)",
      "Motion detection recording",
    ],
    features: ["Easy mobile setup", "Search & export", "Alarm in/out"],
    warranty: "12 months",
    installable: true,
    installPrice: 2500,
    art: "dvr",
  },
  {
    slug: "16ch-dvr",
    name: "16-Channel HD DVR",
    category: "cctv",
    subcategory: "DVR",
    sku: "MT-CCTV-005",
    price: 46000,
    availability: "low_stock",
    short: "16-channel 1080p DVR for larger properties with dual-stream recording.",
    description:
      "A 16-channel HD DVR built for bigger installations. Dual-stream output, built-in scheduling, and multi-user access make it a strong hub for commercial CCTV systems. Supports up to 1 × 10TB SATA drive.",
    specs: [
      "16 × 1080p channels",
      "H.265+ compression",
      "1 SATA bay (up to 10TB)",
      "HDMI 4K output",
      "16-channel audio support",
      "Multi-user remote access",
    ],
    features: ["Smart search", "Backup via USB", "Alarm sensors"],
    warranty: "12 months",
    installable: true,
    installPrice: 3000,
    art: "dvr",
  },
  {
    slug: "8ch-nvr",
    name: "8-Channel PoE NVR",
    category: "cctv",
    subcategory: "NVR",
    sku: "MT-CCTV-006",
    price: 39500,
    availability: "in_stock",
    short: "8-channel PoE NVR with plug-and-play IP camera connection.",
    description:
      "An 8-channel NVR with built-in PoE switch ports — connect IP cameras directly without separate injectors. Supports 4K encoding, motion-based recording, and remote viewing from anywhere. Ideal for modern IP-based installations.",
    specs: [
      "8 × IP channels (4K/H.265)",
      "Built-in 8-port PoE switch",
      "1 SATA bay (up to 8TB)",
      "HDMI + VGA output",
      "Mobile & web remote access",
      "Plug-and-play camera pairing",
    ],
    features: ["PoE powered cameras", "Smart motion detection", "Multi-NVR cascading"],
    warranty: "12 months",
    installable: true,
    installPrice: 3000,
    art: "nvr",
  },
  {
    slug: "16ch-nvr",
    name: "16-Channel PoE NVR",
    category: "cctv",
    subcategory: "NVR",
    sku: "MT-CCTV-007",
    price: 62000,
    availability: "in_stock",
    short: "16-channel PoE NVR for commercial IP surveillance systems.",
    description:
      "A 16-channel PoE NVR for medium-to-large commercial deployments. Provides 16 built-in PoE ports, 4K decoding, and dual HDMI outputs for main and spot monitoring. A dependable recording backbone for IP camera networks.",
    specs: [
      "16 × IP channels (4K/H.265)",
      "Built-in 16-port PoE switch",
      "2 SATA bays (up to 20TB)",
      "Dual HDMI outputs",
      "RAID support",
      "3D smart playback",
    ],
    features: ["Enterprise NVR", "Multi-site management", "HDD health detection"],
    warranty: "12 months",
    installable: true,
    installPrice: 3500,
    art: "nvr",
  },
  {
    slug: "4tb-surveillance-hdd",
    name: "4TB Surveillance Hard Drive",
    category: "cctv",
    subcategory: "Hard Drives",
    sku: "MT-CCTV-008",
    price: 18500,
    availability: "in_stock",
    short: "4TB surveillance-grade HDD rated for 24/7 recorder workloads.",
    description:
      "A 4TB surveillance hard drive engineered for continuous recording. Optimized firmware and vibration tolerance keep DVR/NVR writes stable even in high-temperature enclosures.",
    specs: ["4TB capacity", "5400RPM", "SATA 6Gb/s", "Surveillance-optimized"],
    features: ["24/7 rated", "Low power draw", "36 months warranty"],
    warranty: "36 months",
    installable: false,
    art: "hdd",
  },
  {
    slug: "cctv-cable-100m",
    name: "CCTV Coax Cable — 100m Roll",
    category: "cctv",
    subcategory: "CCTV Cables",
    sku: "MT-CCTV-009",
    price: 4500,
    availability: "in_stock",
    short: "100m RG59 coax cable for analog CCTV runs.",
    description:
      "A 100m roll of RG59 coax video cable with a full copper core and 75Ω impedance, suitable for analog CCTV systems with clean signal transmission over long runs.",
    specs: ["100m roll", "RG59 + power (Siamese)", "75Ω impedance", "Full copper core"],
    features: ["Outdoor rated", "Low attenuation"],
    warranty: "N/A",
    installable: false,
    art: "cable",
  },
  {
    slug: "cctv-power-supply",
    name: "12V CCTV Power Supply",
    category: "cctv",
    subcategory: "Power Supplies",
    sku: "MT-CCTV-010",
    price: 2500,
    availability: "in_stock",
    short: "12V 3A regulated power supply for camera clusters.",
    description:
      "A regulated 12V DC power supply that delivers clean, stable voltage to multiple cameras through distribution wiring. Essential for reliable analog/DVR based camera systems.",
    specs: ["12V DC output", "3A continuous", "Short-circuit protection", "Surge protection"],
    features: ["Multi-camera split", "LED status indicator"],
    warranty: "6 months",
    installable: false,
    art: "psu",
  },
  // ── ACCESS CONTROL ───────────────────────────────────────────────────
  {
    slug: "fingerprint-time-attendance",
    name: "Fingerprint Time & Attendance Terminal",
    category: "access-control",
    subcategory: "Fingerprint Devices",
    sku: "MT-ACC-001",
    price: 16000,
    availability: "in_stock",
    short: "Standalone 1000-user fingerprint terminal with TCP/IP and USB export.",
    description:
      "A standalone fingerprint terminal that manages door access and attendance for up to 1000 users. Featuring a 2.8\" TFT display, TCP/IP connectivity, and USB data export for payroll and reporting.",
    specs: [
      "1,000 user capacity",
      "3,000 fingerprint templates",
      "2.8\" color TFT display",
      "TCP/IP + USB host",
      "RFID card option included",
      "Audio feedback",
    ],
    features: ["Time & attendance", "Access control relay", "Simple PC sync"],
    warranty: "12 months",
    installable: true,
    installPrice: 3500,
    art: "fingerprint",
    featured: true,
  },
  {
    slug: "face-recognition-terminal",
    name: "Face Recognition Access Terminal",
    category: "access-control",
    subcategory: "Facial Recognition",
    sku: "MT-ACC-002",
    price: 45000,
    availability: "in_stock",
    short: "Contactless face recognition terminal with mask detection and live photo anti-spoofing.",
    description:
      "A contactless facial recognition terminal for modern premises. Uses deep-learning algorithms with liveness detection, mask detection, and a wide-angle camera. Delivers fast, hygienic entry for offices and institutions.",
    specs: [
      "Face + card + PIN modes",
      "1,000 face capacity",
      "Anti-spoof / liveness detection",
      "7\" touchscreen",
      "TCP/IP + Wi-Fi optional",
      "Distance 0.3 – 1.5m",
    ],
    features: ["Contactless entry", "Mask detection", "Attendance export"],
    warranty: "12 months",
    installable: true,
    installPrice: 4500,
    art: "face",
  },
  {
    slug: "rfid-standalone-reader",
    name: "RFID Standalone Access Reader",
    category: "access-control",
    subcategory: "RFID Readers",
    sku: "MT-ACC-003",
    price: 8900,
    availability: "in_stock",
    short: "125kHz standalone RFID reader supporting 2,000 card users.",
    description:
      "A compact standalone RFID reader/controller that manages door entry with standard 125kHz EM cards. Supports 2,000 users and connects directly to a magnetic lock or electric strike via its relay.",
    specs: ["125kHz EM RFID", "2,000 user capacity", "Relay output for lock", "12V DC input", "Waterproof keypad version available"],
    features: ["Standalone operation", "Card + PIN", "Interlock support"],
    warranty: "12 months",
    installable: true,
    installPrice: 2500,
    art: "rfid",
  },
  {
    slug: "rfid-card-pack-50",
    name: "RFID Access Cards — Pack of 50",
    category: "access-control",
    subcategory: "RFID Cards",
    sku: "MT-ACC-004",
    price: 1500,
    availability: "in_stock",
    short: "Standard 125kHz EM RFID cards, PVC, pack of 50.",
    description:
      "Standard EM4100-compatible 125kHz RFID cards for use with NexGuard access readers. Sold in packs of 50; custom printing available on request.",
    specs: ["EM4100 / 125kHz", "PVC 85.6 × 54mm", "Print ready"],
    features: ["Writable", "Cost-effective"],
    warranty: "N/A",
    installable: false,
    art: "card",
  },
  {
    slug: "magnetic-lock-600lbs",
    name: "600lbs Magnetic Lock Kit",
    category: "access-control",
    subcategory: "Magnetic Locks",
    sku: "MT-ACC-005",
    price: 6500,
    availability: "in_stock",
    short: "600lbs holding-force electromagnetic lock with bracket and Z-plate.",
    description:
      "A 600lbs electromagnetic lock delivering strong, fail-safe door holding force for glass and wooden doors. Includes mounting bracket, Z-plate, and power supply accessories.",
    specs: ["600lbs (272kg) holding force", "12V DC", "Fail-safe design", "Stainless steel housing", "Bracket + Z-plate included"],
    features: ["Glass door compatible", "Lightweight install"],
    warranty: "12 months",
    installable: true,
    installPrice: 2000,
    art: "maglock",
  },
  {
    slug: "exit-button",
    name: "Request-to-Exit Push Button",
    category: "access-control",
    subcategory: "Exit Buttons",
    sku: "MT-ACC-006",
    price: 1200,
    availability: "in_stock",
    short: "Flush-mount REX exit button for magnetic lock release.",
    description:
      "A flush-mount request-to-exit button that releases magnetic locks from the inside. Wide-cap design, momentary action, and clean stainless finish.",
    specs: ["Momentary / toggle", "Dry contact relay", "12–24V compatible"],
    features: ["LED illumination", "Corrosion resistant"],
    warranty: "6 months",
    installable: false,
    art: "exit",
  },
  {
    slug: "single-door-controller",
    name: "Single Door TCP/IP Controller",
    category: "access-control",
    subcategory: "Door Controllers",
    sku: "MT-ACC-007",
    price: 18500,
    availability: "in_stock",
    short: "Networked single-door access controller for pro systems.",
    description:
      "A professional single-door access controller with real-time monitoring over TCP/IP. Supports Wiegand readers, multiple time zones, and event logs — ideal for managed multi-site access control.",
    specs: ["1 door / 2 readers", "30,000 card capacity", "TCP/IP + PoE", "Wiegand 26/34", "Holiday schedule support"],
    features: ["Real-time monitoring", "Door sensor input", "Anti-passback"],
    warranty: "12 months",
    installable: true,
    installPrice: 2500,
    art: "controller",
  },
  // ── ELECTRIC FENCE ────────────────────────────────────────────────────
  {
    slug: "electric-fence-energizer-3j",
    name: "3-Joule Electric Fence Energizer",
    category: "electric-fence",
    subcategory: "Energizers",
    sku: "MT-FNC-001",
    price: 28000,
    availability: "in_stock",
    short: "3J mains energizer for medium-size properties with alarm output.",
    description:
      "A 3-joule mains-powered energizer delivering strong, compliant shock along several kilometres of fence. Includes alarm output for connection to siren or security system, and a compact weather-resistant housing.",
    specs: ["3 joule output", "Mains 230V", "3km fence range", "Dual zone output", "12V battery backup ready", "Alarm output"],
    features: ["Dual zone", "Buzzer status", "Temporary cut monitoring"],
    warranty: "12 months",
    installable: true,
    installPrice: 6000,
    art: "energizer",
    featured: true,
  },
  {
    slug: "electric-fence-energizer-6j",
    name: "6-Joule Electric Fence Energizer",
    category: "electric-fence",
    subcategory: "Energizers",
    sku: "MT-FNC-002",
    price: 42000,
    availability: "in_stock",
    short: "6J dual-zone energizer for commercial and institutional perimeters.",
    description:
      "A high-output 6-joule dual-zone energizer suited to commercial and institutional perimeters. Offers extensive fence coverage, full alarm integration, and monitoring of both fence zones independently.",
    specs: ["6 joule output", "Dual zone independent", "5km fence range", "Alarm / siren output", "Data-driven diagnostics"],
    features: ["Full perimeter monitoring", "Rain mode", "Fail-safe battery"],
    warranty: "12 months",
    installable: true,
    installPrice: 8000,
    art: "energizer",
  },
  {
    slug: "galvanized-fence-wire-250m",
    name: "Galvanized High-Tensile Fence Wire — 250m",
    category: "electric-fence",
    subcategory: "Fence Wire",
    sku: "MT-FNC-003",
    price: 8500,
    availability: "in_stock",
    short: "High-tensile galvanized electrified wire, 250m coil.",
    description:
      "High-tensile galvanized steel wire for electrified fencing. Corrosion-resistant, highly conductive, and supplied in 250m coils. Suitable for 6–12 strand fence construction per SANS spec.",
    specs: ["2.5mm heavy gauge", "Galvanized", "250m coil", "Per SANS compliant"],
    features: ["Corrosion-resistant", "High conductivity"],
    warranty: "N/A",
    installable: false,
    art: "wire",
  },
  {
    slug: "poly-wire-80m",
    name: "Electrified Poly-Wire — 80m",
    category: "electric-fence",
    subcategory: "Fence Wire",
    sku: "MT-FNC-004",
    price: 3500,
    availability: "in_stock",
    short: "High-visibility 6-strand poly-wire for temporary and permanent fences.",
    description:
      "Six-strand poly-wire braided with stainless conductors. High visibility deters intrusion while the conductor reliably carries the energizer pulse. 80m roll.",
    specs: ["6 strand construction", "Stainless conductors", "80m roll"],
    features: ["High visibility", "Lightweight"],
    warranty: "N/A",
    installable: false,
    art: "polywire",
  },
  {
    slug: "fence-insulators-pack-100",
    name: "Anti-Climb Fence Insulators — Pack of 100",
    category: "electric-fence",
    subcategory: "Insulators",
    sku: "MT-FNC-005",
    price: 3000,
    availability: "in_stock",
    short: "Heavy-duty anti-climb insulators, pack of 100.",
    description:
      "Weather-resistant anti-climb insulators holding fence wire securely off posts and walls. Pack of 100 suited to a multi-strand residential perimeter.",
    specs: ["Heavy-duty UV stabilized", "Pack of 100", "Universal post fit"],
    features: ["Anti-climb profile", "UV stable"],
    warranty: "N/A",
    installable: false,
    art: "insulator",
  },
  {
    slug: "electric-fence-warning-signs",
    name: "Electric Fence Warning Signs — Pack of 10",
    category: "electric-fence",
    subcategory: "Warning Signs",
    sku: "MT-FNC-006",
    price: 1500,
    availability: "in_stock",
    short: "Compliance warning signs, pack of 10.",
    description:
      "Compliance 'DANGER — Electric Fence' warning signage for displaying along electrified perimeter runs. Reflective print for night visibility.",
    specs: ["Pack of 10", "Reflective print", "UV resistant PVC"],
    features: ["Compliance ready"],
    warranty: "N/A",
    installable: false,
    art: "sign",
  },
  {
    slug: "fence-backup-battery-12v-9ah",
    name: "12V 9Ah Fence Backup Battery",
    category: "electric-fence",
    subcategory: "Backup Batteries",
    sku: "MT-FNC-007",
    price: 4500,
    availability: "in_stock",
    short: "Maintenance-free 12V 9Ah battery for energizer backup.",
    description:
      "Maintenance-free sealed lead-acid 12V 9Ah battery that keeps the fence energized during power cuts. Compatible with NexGuard energizers' battery-backup input.",
    specs: ["12V 9Ah", "Sealed maintenance-free", "Terminal M5"],
    features: ["Power-cut backup"],
    warranty: "6 months",
    installable: false,
    art: "battery",
  },
  // ── GATE AUTOMATION ───────────────────────────────────────────────────
  {
    slug: "sliding-gate-motor-800kg",
    name: "Sliding Gate Motor — 800kg",
    category: "gate-automation",
    subcategory: "Sliding Gate Motors",
    sku: "MT-GATE-001",
    price: 42000,
    availability: "in_stock",
    short: "800kg capacity sliding gate opener with soft start/stop.",
    description:
      "A robust 800kg sliding gate opener featuring soft start/stop, reliable limit switches, and remote control capability. Suited to residential and light-commercial estate gates.",
    specs: ["800kg gate capacity", "230V motor", "Soft start / stop", "Limit switch control", "2 remote controls included", "Drop-out brake"],
    features: ["Low noise operation", "Photocell ready", "GSM expandable"],
    warranty: "12 months",
    installable: true,
    installPrice: 8000,
    art: "slidemotor",
    featured: true,
  },
  {
    slug: "swing-gate-motor",
    name: "Swing Gate Motor Kit — Single Leaf",
    category: "gate-automation",
    subcategory: "Swing Gate Motors",
    sku: "MT-GATE-002",
    price: 38500,
    availability: "in_stock",
    short: "Electromechanical swing gate arm with lockable mechanism.",
    description:
      "An electromechanical swing gate operator for single-leaf gates up to 3m. Includes key-release mechanism for manual opening during power outages and electronic torque limiting.",
    specs: ["For gates to 3m / 300kg", "24V electromechanical arm", "Manual release key", "Torque limiting", "2 remotes included"],
    features: ["Quiet operation", "Battery-ready", "Photocell input"],
    warranty: "12 months",
    installable: true,
    installPrice: 8000,
    art: "swingmotor",
  },
  {
    slug: "roll-remote-4-button",
    name: "4-Button Rolling Code Remote",
    category: "gate-automation",
    subcategory: "Remotes",
    sku: "MT-GATE-003",
    price: 1800,
    availability: "in_stock",
    short: "433MHz rolling-code 4-button remote for gate and barrier control.",
    description:
      "A 433MHz rolling-code 4-channel remote that pairs with NexGuard gate controllers. Compact case with high-visibility buttons and up to 100m range.",
    specs: ["433MHz", "Rolling code", "4 channels", "100m range"],
    features: ["Replacement remote", "Pairs to receiver"],
    warranty: "6 months",
    installable: false,
    art: "remote",
  },
  {
    slug: "gsm-gate-controller",
    name: "GSM Gate Controller",
    category: "gate-automation",
    subcategory: "GSM Controllers",
    sku: "MT-GATE-004",
    price: 13500,
    availability: "in_stock",
    short: "Open your gate by phone call or SMS from anywhere.",
    description:
      "A GSM gate controller that lets you open gates, barriers, and electric doors with a phone call or SMS — from anywhere. Requires a standard SIM and provides 2 outputs.",
    specs: ["Call / SMS triggering", "Dual relay outputs", "12V DC powered", "AUX input for sensors"],
    features: ["Contactless entry", "Works nationwide"],
    warranty: "12 months",
    installable: true,
    installPrice: 2500,
    art: "gsm",
  },
  {
    slug: "gate-photocell",
    name: "Gate Safety Photocell Set",
    category: "gate-automation",
    subcategory: "Safety Sensors",
    sku: "MT-GATE-005",
    price: 2500,
    availability: "in_stock",
    short: "Infrared photocell pair that stops the gate when a person or vehicle is in the path.",
    description:
      "A waterproof infrared photocell pair that halts gate travel when the beam is interrupted — essential compliance safety equipment for automated gates.",
    specs: ["Up to 15m range", "Weatherproof housing", "Normally-open output", "12V/24V compatible"],
    features: ["Safety compliance", "Easy alignment"],
    warranty: "6 months",
    installable: false,
    art: "photocell",
  },
  {
    slug: "boom-barrier-6m",
    name: "Automatic Boom Barrier — 6m",
    category: "gate-automation",
    subcategory: "Barrier Systems",
    sku: "MT-GATE-006",
    price: 95000,
    availability: "in_stock",
    short: "6m heavy-duty boom barrier for parking and estate entrances.",
    description:
      "A heavy-duty automatic boom barrier with 6m arm for parking lots, estates, and controlled entry points. Includes manual release, remote control, and loop detector input.",
    specs: ["6m boom", "230V motor", "Photo-manual release", "Remote + loop detector inputs", "Anti-crush function"],
    features: ["Traffic control", "GSM ready"],
    warranty: "12 months",
    installable: true,
    installPrice: 12000,
    art: "barrier",
  },
  // ── SOLAR ─────────────────────────────────────────────────────────────
  {
    slug: "solar-panel-450w",
    name: "450W Mono Solar Panel",
    category: "solar",
    subcategory: "Solar Panels",
    sku: "MT-SOL-001",
    price: 15500,
    availability: "in_stock",
    short: "450W monocrystalline half-cut solar panel, 25-year performance warranty.",
    description:
      "A 450W monocrystalline half-cut solar panel with favourable efficiency for rooftop and ground-mount systems. High wind and snow load rated; backed by a 25-year performance guarantee.",
    specs: ["450W output", "Monocrystalline half-cut", "25-year performance warranty", "IP68 junction box", "Fire class C"],
    features: ["High efficiency", "Durable frame"],
    warranty: "300 months performance · 120 months product",
    installable: true,
    installPrice: 2500,
    art: "panel",
    featured: true,
  },
  {
    slug: "hybrid-inverter-8kw",
    name: "8kW Hybrid Inverter",
    category: "solar",
    subcategory: "Hybrid Inverters",
    sku: "MT-SOL-002",
    price: 175000,
    availability: "in_stock",
    short: "8kW hybrid inverter with on/off-grid operation and app monitoring.",
    description:
      "An 8kW hybrid inverter enabling solar self-consumption, backup power, and feed-in capability. Dual MPPT trackers, parallel operation support, and smartphone monitoring make it ideal for modern homes and offices.",
    specs: ["8kW output", "Dual MPPT", "Parallel up to 16kW", "On/off-grid", "App monitoring", "IP21 indoor"],
    features: ["Battery-ready", "Grid or generator input"],
    warranty: "24 months",
    installable: true,
    installPrice: 8000,
    art: "inverter-hybrid",
  },
  {
    slug: "offgrid-inverter-5kva",
    name: "5kVA Off-Grid Inverter",
    category: "solar",
    subcategory: "Off-Grid Inverters",
    sku: "MT-SOL-003",
    price: 75000,
    availability: "in_stock",
    short: "5kVA pure sine-wave off-grid inverter-charger.",
    description:
      "A 5kVA pure sine-wave off-grid inverter-charger for homes and small businesses. Combines inverter, charger, and transfer switch; supports deep-cycle battery banks for reliable nighttime power.",
    specs: ["5kVA / 4kW", "Pure sine wave", "50A charger", "48V system", "PV charge ready"],
    features: ["Silent operation", "LCD status"],
    warranty: "12 months",
    installable: true,
    installPrice: 6000,
    art: "inverter-offgrid",
  },
  {
    slug: "lithium-battery-5kwh",
    name: "5kWh Lithium Battery (48V)",
    category: "solar",
    subcategory: "Batteries",
    sku: "MT-SOL-004",
    price: 165000,
    availability: "in_stock",
    short: "Wall-mount 48V lithium battery with BMS for solar storage.",
    description:
      "A wall-mount 48V LiFePO4 battery delivering 5kWh of usable storage with an integrated BMS. High cycle life, low self-discharge, and safe chemistry for daily solar cycling.",
    specs: ["5.12kWh capacity", "48V nominal", "LiFePO4", "Built-in BMS", "6000+ cycles", "Wall mount"],
    features: ["Deep cycling", "Discharge 100A"],
    warranty: "60 months",
    installable: true,
    installPrice: 3000,
    art: "lithium",
  },
  {
    slug: "gel-battery-200ah",
    name: "200Ah Deep-Cycle Gel Battery",
    category: "solar",
    subcategory: "Batteries",
    sku: "MT-SOL-005",
    price: 52000,
    availability: "in_stock",
    short: "Maintenance-free 200Ah gel battery for solar backup banks.",
    description:
      "A maintenance-free deep-cycle gel battery for solar and backup applications. Delivers steady power over long discharge cycles with excellent cycling tolerances.",
    specs: ["200Ah @ 12V", "Gel technology", "Maintenance-free", "Deep-cycle rated"],
    features: ["Forgiving discharge", "Low self-discharge"],
    warranty: "12 months",
    installable: true,
    installPrice: 1500,
    art: "gel",
  },
  {
    slug: "solar-flood-light-30w",
    name: "30W All-in-One Solar Floodlight",
    category: "solar",
    subcategory: "Solar Lights",
    sku: "MT-SOL-006",
    price: 6500,
    availability: "in_stock",
    short: "All-in-one 30W solar floodlight with motion sensor.",
    description:
      "An all-in-one solar floodlight with integrated panel, battery, and PIR motion sensor. Mounts anywhere for instant, off-grid perimeter and compound lighting.",
    specs: ["30W LED", "Integrated solar + battery", "PIR motion sensor", "IP65", "Remote control"],
    features: ["No wiring needed", "Automatic dusk-to-dawn"],
    warranty: "12 months",
    installable: true,
    installPrice: 2000,
    art: "flood",
  },
  {
    slug: "solar-borehole-pump",
    name: "Solar Water Pump — Borehole Kit",
    category: "solar",
    subcategory: "Solar Water Pumping",
    sku: "MT-SOL-007",
    price: 220000,
    availability: "out_of_stock",
    short: "Complete solar borehole pumping kit with submersible pump and controller.",
    description:
      "A complete solar water-pumping kit including a submersible pump, surface controller, and compatible solar array for borehole installation. Delivers consistent water supply for farms and rural properties.",
    specs: ["Submersible pump", "MPPT controller", "Flows to 12m³/day", "Works with 6 × 450W panels", "Dry-run protection"],
    features: ["Automatic start/stop", "Low maintenance"],
    warranty: "12 months",
    installable: true,
    installPrice: 20000,
    art: "pump",
  },
  {
    slug: "solar-cable-6mm",
    name: "Solar DC Cable — 6mm² (50m)",
    category: "solar",
    subcategory: "Cables & Protection",
    sku: "MT-SOL-008",
    price: 3500,
    availability: "in_stock",
    short: "UV-rated 6mm² solar DC cable, 50m.",
    description:
      "UV-stabilized 6mm² solar DC cable for panel-to-inverter connections. Dual insulated, weather resistant, and supplied in a 50m roll.",
    specs: ["6mm² copper", "UV-stabilized insulation", "50m roll"],
    features: ["Solar-rated", "Outdoor durable"],
    warranty: "N/A",
    installable: false,
    art: "cable",
  },
  // ── NETWORKING ────────────────────────────────────────────────────────
  {
    slug: "wifi6-router",
    name: "Wi-Fi 6 Gigabit Router",
    category: "networking",
    subcategory: "Routers",
    sku: "MT-NET-001",
    price: 16000,
    availability: "in_stock",
    short: "AX3000 dual-band Wi-Fi 6 router with gigabit ports.",
    description:
      "An AX3000 dual-band Wi-Fi 6 router delivering fast, stable coverage for homes and small offices. Gigabit WAN/LAN, easy app setup, and strong parental and security controls.",
    specs: ["AX3000 (2402 + 574 Mbps)", "Dual-band 2.4/5GHz", "4 × Gigabit LAN", "App management", "MU-MIMO + OFDMA"],
    features: ["Wi-Fi 6", "Guest network", "Parental controls"],
    warranty: "12 months",
    installable: true,
    installPrice: 2500,
    art: "router",
    featured: true,
  },
  {
    slug: "24port-gigabit-switch",
    name: "24-Port Gigabit Managed Switch",
    category: "networking",
    subcategory: "Switches",
    sku: "MT-NET-002",
    price: 68000,
    availability: "in_stock",
    short: "L2 managed 24-port gigabit switch with SFP uplinks.",
    description:
      "A 24-port gigabit Layer-2 managed switch with 4 SFP uplinks for business networks. VLAN, QoS, link aggregation, and web/SNMP management support.",
    specs: ["24 × Gigabit ports", "4 × SFP uplinks", "L2 management", "VLAN / QoS / IGMP", "Web + CLI + SNMP"],
    features: ["Rack mountable", "Energy efficient"],
    warranty: "24 months",
    installable: true,
    installPrice: 4000,
    art: "switch",
  },
  {
    slug: "wifi6-access-point",
    name: "Wi-Fi 6 Ceiling Access Point",
    category: "networking",
    subcategory: "Access Points",
    sku: "MT-NET-003",
    price: 22000,
    availability: "in_stock",
    short: "PoE ceiling-mounted Wi-Fi 6 AP for offices and homes.",
    description:
      "A ceiling-mounted Wi-Fi 6 access point powered by PoE — provides high-density coverage for offices, schools, and larger homes. Central controller support for roaming.",
    specs: ["AX1500", "PoE powered (802.3af)", "Ceiling mount", "Controller support", "VLAN tagging"],
    features: ["High-density client", "Roaming ready"],
    warranty: "12 months",
    installable: true,
    installPrice: 3500,
    art: "ap",
  },
  {
    slug: "cat6-cable-305m",
    name: "CAT6 UTP Cable — 305m Box",
    category: "networking",
    subcategory: "Ethernet Cables",
    sku: "MT-NET-004",
    price: 18500,
    availability: "in_stock",
    short: "Full copper CAT6 UTP cable, 305m box.",
    description:
      "Full-copper CAT6 UTP cable in a 305m box delivering gigabit performance for structured cabling runs. Available in standard colours.",
    specs: ["305m box", "CAT6 UTP", "24AWG full copper", "Gigabit certified"],
    features: ["Structured cabling", "Colours on request"],
    warranty: "N/A",
    installable: false,
    art: "ethcable",
  },
  {
    slug: "cat6-keystone-rj45",
    name: "CAT6 Keystone RJ45 Jacks — Pack of 10",
    category: "networking",
    subcategory: "Network Accessories",
    sku: "MT-NET-005",
    price: 2500,
    availability: "in_stock",
    short: "CAT6 shielded keystone jacks, pack of 10.",
    description:
      "Reliable CAT6 keystone jacks for face-plate network terminations. Pack of 10 with IDC termination for tidy, certified structured cabling.",
    specs: ["CAT6 rated", "IDC termination", "Pack of 10"],
    features: ["Toolless option"],
    warranty: "N/A",
    installable: false,
    art: "keystone",
  },
  {
    slug: "wall-mount-rack-6u",
    name: "6U Wall-Mount Network Rack",
    category: "networking",
    subcategory: "Racks",
    sku: "MT-NET-006",
    price: 24000,
    availability: "in_stock",
    short: "6U steel wall-mount rack for network equipment.",
    description:
      "A 6U wall-mount steel rack with glass front door and cooling vents — perfect for housing switches, patch panels, and routers in offices and server corners.",
    specs: ["6U capacity", "Steel construction", "Glass front door", "Lockable", "Vertical cable managers"],
    features: ["Space efficient", "Lockable"],
    warranty: "12 months",
    installable: true,
    installPrice: 3000,
    art: "rack",
  },
  {
    slug: "24port-patch-panel",
    name: "24-Port CAT6 Patch Panel",
    category: "networking",
    subcategory: "Patch Panels",
    sku: "MT-NET-007",
    price: 9500,
    availability: "in_stock",
    short: "1U 24-port CAT6 patch panel with rear cable bar.",
    description:
      "A 1U 24-port CAT6 patch panel for clean, maintainable structured cabling. Rear cable management bar keeps terminations organized.",
    specs: ["1U 24-port", "CAT6 rated", "Rear cable bar", "IDC termination"],
    features: ["Colour coding", "High density"],
    warranty: "12 months",
    installable: false,
    art: "patch",
  },
  {
    slug: "starlink-mount-kit-pro",
    name: "Starlink Professional Mount Kit",
    category: "networking",
    subcategory: "Starlink Accessories",
    sku: "MT-NET-008",
    price: 13500,
    availability: "in_stock",
    short: "Ridge or wall mounting kit for permanent Starlink dish installation.",
    description:
      "A professional Starlink mounting kit with galvanized bracket, weatherhead cable gland, and stainless hardware — ensures secure, swept installation that withstands weather. Installation by our certified team on request.",
    specs: ["Galvanized steel bracket", "Weatherhead gland", "Stainless hardware", "Ridge / wall / pole configurable"],
    features: ["Professional install", "Cable management"],
    warranty: "12 months",
    installable: true,
    installPrice: 6000,
    art: "starlink",
    featured: true,
  },
  // ── IT EQUIPMENT ──────────────────────────────────────────────────────
  {
    slug: "business-desktop-core-i5",
    name: "Business Desktop — Core i5 / 16GB / 512GB SSD",
    category: "it-equipment",
    subcategory: "Computers",
    sku: "MT-IT-001",
    price: 88000,
    availability: "in_stock",
    short: "Office-ready desktop PC with Windows 11 Professional.",
    description:
      "An office-ready desktop built for everyday business applications. Core i5 processor, 16GB RAM, and 512GB NVMe SSD with Windows 11 Pro pre-installed and configured.",
    specs: ["Intel Core i5 (13th Gen)", "16GB DDR4 RAM", "512GB NVMe SSD", "Windows 11 Pro", "23\" monitor option", "USB 3.2 + HDMI"],
    features: ["Wired warranty period included", "Pre-configured"],
    warranty: "12 months",
    installable: false,
    art: "desktop",
  },
  {
    slug: "ups-1500va",
    name: "1500VA Line-Interactive UPS",
    category: "it-equipment",
    subcategory: "UPS Systems",
    sku: "MT-IT-002",
    price: 32000,
    availability: "in_stock",
    short: "1500VA UPS with surge protection and extended backup option.",
    description:
      "A 1500VA line-interactive UPS protecting computers and network gear during outages and power surges. Features AVR, USB monitoring, and outlets for a PC + monitor.",
    specs: ["1500VA / 900W", "AVR regulation", "USB monitoring", "4 × outlets", "LED status"],
    features: ["Surge protection", "Hot-swap battery"],
    warranty: "12 months",
    installable: false,
    art: "ups",
  },
  {
    slug: "portable-ssd-1tb",
    name: "1TB Portable SSD",
    category: "it-equipment",
    subcategory: "Storage Devices",
    sku: "MT-IT-003",
    price: 14500,
    availability: "in_stock",
    short: "USB-C 1TB portable SSD with fast transfer speeds.",
    description:
      "A compact 1TB portable SSD with USB-C and 3.2 Gen 2 speeds for fast backup and file transport. Shock-resistant aluminium body.",
    specs: ["1TB capacity", "USB 3.2 Gen 2", "Up to 1000MB/s", "IP54 rating"],
    features: ["Rugged & portable", "Backup-ready"],
    warranty: "24 months",
    installable: false,
    art: "ssd",
  },
  {
    slug: "mechanical-keyboard-kit",
    name: "Wireless Keyboard & Mouse Combo",
    category: "it-equipment",
    subcategory: "Accessories",
    sku: "MT-IT-004",
    price: 4500,
    availability: "in_stock",
    short: "Quiet wireless keyboard and mouse combo for office use.",
    description:
      "A wireless keyboard and mouse combo with quiet keys and a reliable 2.4GHz connection. One nano-receiver powers both devices.",
    specs: ["2.4GHz wireless", "Quiet keys", "1100DPI mouse", "1 receiver for both"],
    features: ["Long battery life"],
    warranty: "6 months",
    installable: false,
    art: "keyboard",
  },
];

export type Solution = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  points: string[];
  apps: string[];
  photo: string;
  art: string;
  color: string;
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "cctv",
    number: "01",
    title: "CCTV Surveillance",
    subtitle: "Monitoring & Security Systems",
    desc: "We design and install modern CCTV systems that enhance security, monitor activity, and deter crime in both residential and commercial environments. Our solutions combine high-resolution cameras with remote access capabilities for complete peace of mind.",
    points: [
      "Site survey & camera placement design",
      "Indoor & outdoor CCTV installation",
      "IP and analog camera systems",
      "DVR and NVR configuration",
      "Remote viewing via mobile & desktop",
      "Preventive maintenance & fault repair",
    ],
    apps: ["Offices & commercial buildings", "Homes & residential estates", "Schools, hospitals & warehouses", "Retail shops & parking areas"],
    photo: "/images/photos/cctv-install.jpg",
    art: "camera",
    color: "from-emerald-500/20",
  },
  {
    slug: "access",
    number: "02",
    title: "Access Control",
    subtitle: "Secure Entry & Exit Management",
    desc: "Our access control systems regulate who enters and exits your premises, improve accountability, and significantly enhance overall security. We integrate the latest biometric and card-based technologies to meet your specific security requirements.",
    points: [
      "Biometric access (fingerprint / facial)",
      "RFID card and PIN-based systems",
      "Door automation & magnetic locks",
      "Integration with CCTV & alarms",
      "Multi-door & multi-site management",
      "Full audit trail and access logs",
    ],
    apps: ["Restricted areas", "Staff & visitor management", "Office & institutional buildings"],
    photo: "/images/photos/access-plant.jpg",
    art: "fingerprint",
    color: "from-green-500/20",
  },
  {
    slug: "fence",
    number: "03",
    title: "Electric Fence",
    subtitle: "Perimeter Protection Solutions",
    desc: "We provide professional electric fence solutions to strengthen perimeter security for residential, commercial, and institutional properties. Our systems serve as a powerful deterrent and provide early warning alerts to prevent intrusion before it happens.",
    points: [
      "Perimeter assessment & system design",
      "Electric fence installation",
      "Alarm & monitoring integration",
      "Maintenance, testing & repairs",
      "Energizer & battery backup supply",
      "Gate configuration & integration",
    ],
    apps: ["Residential & estates", "Commercial & industrial", "Schools & institutions"],
    photo: "/images/photos/fence-line.jpg",
    art: "fence",
    color: "from-emerald-500/20",
  },
  {
    slug: "gate",
    number: "04",
    title: "Gate Automation",
    subtitle: "Access & Barrier Systems",
    desc: "Enhance convenience, security, and access management with our professional gate automation and barrier systems. We install reliable solutions for residential, commercial, and institutional properties, enabling smooth and controlled vehicle and pedestrian access.",
    points: [
      "Sliding and swing gate automation",
      "Automatic gate motor installation",
      "Remote control and GSM access systems",
      "Safety sensors and obstacle detection",
      "Gate barrier systems for parking",
      "Maintenance, servicing & repairs",
    ],
    apps: ["Homes & gated communities", "Commercial buildings", "Parking facilities & offices"],
    photo: "/images/photos/gate-motor.jpg",
    art: "gate",
    color: "from-teal-500/20",
  },
  {
    slug: "solar",
    number: "05",
    title: "Solar & Green Energy",
    subtitle: "Sustainable Power Solutions",
    desc: "We provide efficient solar energy solutions that help homes and businesses reduce electricity costs while ensuring a reliable and sustainable power supply. From design to installation and maintenance, we deliver systems built for long-term performance.",
    points: [
      "Solar system design and consultation",
      "Solar panel installation",
      "Inverter installation and configuration",
      "Battery backup systems",
      "Solar water pumping solutions",
      "System maintenance & performance checks",
    ],
    apps: ["Residential homes", "Offices & commercial", "Farms & rural properties", "Schools & institutions"],
    photo: "/images/photos/solar-panels.jpg",
    art: "solar",
    color: "from-lime-500/20",
  },
  {
    slug: "network",
    number: "06",
    title: "Networking & Connectivity",
    subtitle: "Data & Connectivity Infrastructure",
    desc: "NexGuard Technologies Ltd delivers reliable networking solutions that support secure data communication and efficient business operations. We design, install, and maintain network infrastructure that keeps your organization connected and productive.",
    points: [
      "Local Area Network (LAN) setup",
      "Structured cabling (data & voice)",
      "Router & switch configuration",
      "Wireless network installation",
      "Network troubleshooting & optimization",
      "Wi-Fi coverage design",
    ],
    apps: ["Offices & corporate", "Schools & institutions", "Homes & small business", "Industrial & warehouse"],
    photo: "/images/photos/networking-rack.jpg",
    art: "network",
    color: "from-cyan-500/20",
  },
  {
    slug: "starlink",
    number: "07",
    title: "Starlink Installation",
    subtitle: "High-Speed Satellite Internet",
    desc: "Stay connected with high-speed satellite internet through our professional Starlink installation services. We provide expert setup, configuration, and optimization to ensure reliable internet connectivity for homes, businesses, schools, and remote locations.",
    points: [
      "Site survey and installation planning",
      "Starlink dish mounting and alignment",
      "Router setup and Wi-Fi configuration",
      "Network integration with existing infrastructure",
      "Cable routing & professional cable management",
      "Maintenance, troubleshooting & support",
    ],
    apps: ["Homes & offices", "Schools & institutions", "Farms & remote locations", "Hotels & temporary sites"],
    photo: "/images/photos/starlink-dish.jpg",
    art: "starlink",
    color: "from-sky-500/20",
  },
  {
    slug: "it",
    number: "08",
    title: "IT Support",
    subtitle: "Technical Support & Maintenance",
    desc: "We help clients maintain reliable and efficient computer systems through professional IT support services. Our team provides rapid diagnostics, repair, and preventive maintenance to minimize downtime and maximize system performance.",
    points: [
      "Hardware diagnostics & repair",
      "Computer upgrades & replacements",
      "Software installation & updates",
      "Virus & malware removal",
      "Preventive maintenance contracts",
      "Data backup & recovery",
    ],
    apps: ["Offices & businesses", "Institutions", "Home users"],
    photo: "/images/photos/it-support.jpg",
    art: "it",
    color: "from-green-500/20",
  },
];

export const solutionMap: Record<string, Solution> = Object.fromEntries(
  SOLUTIONS.map((s) => [s.slug, s])
);

export type BookingService = {
  slug: string;
  name: string;
  desc: string;
};

export const BOOKING_SERVICES: BookingService[] = [
  { slug: "cctv-installation", name: "CCTV Installation", desc: "Professional CCTV system design and installation." },
  { slug: "cctv-repair", name: "CCTV Repair", desc: "Diagnostics and fault repair for existing CCTV systems." },
  { slug: "cctv-maintenance", name: "CCTV Maintenance", desc: "Preventive maintenance and cleaning contracts." },
  { slug: "electric-fence-installation", name: "Electric Fence Installation", desc: "Perimeter electric fencing supply and installation." },
  { slug: "access-control-installation", name: "Access Control Installation", desc: "Biometric, RFID and card access systems." },
  { slug: "solar-installation", name: "Solar Installation", desc: "Solar panels, inverters, and battery backup systems." },
  { slug: "gate-automation", name: "Gate Automation", desc: "Gate motor installation, repair, and maintenance." },
  { slug: "networking", name: "Networking", desc: "LAN, structured cabling, Wi-Fi and routers." },
  { slug: "starlink-installation", name: "Starlink Installation", desc: "Professional Starlink dish mounting and setup." },
  { slug: "it-support", name: "IT Support", desc: "Computer diagnostics, repairs, and maintenance." },
];

export const PROPERTY_TYPES = [
  "Home",
  "Apartment",
  "Office",
  "Shop",
  "School",
  "Hospital",
  "Warehouse",
  "Farm",
  "Industrial",
  "Other",
];

export const BUDGET_RANGES = [
  "Under KES 50,000",
  "KES 50,000 – 150,000",
  "KES 150,000 – 500,000",
  "KES 500,000 – 1,000,000",
  "Above KES 1,000,000",
];

export type QuoteFlow =
  | "cctv"
  | "access-control"
  | "electric-fence"
  | "gate-automation"
  | "solar"
  | "networking"
  | "starlink"
  | "it-support"
  | "general";

export const QUOTE_SERVICES: { slug: QuoteFlow; name: string }[] = [
  { slug: "cctv", name: "CCTV Surveillance" },
  { slug: "access-control", name: "Access Control" },
  { slug: "electric-fence", name: "Electric Fence" },
  { slug: "gate-automation", name: "Gate Automation" },
  { slug: "solar", name: "Solar & Green Energy" },
  { slug: "networking", name: "Networking" },
  { slug: "starlink", name: "Starlink Installation" },
  { slug: "it-support", name: "IT Support" },
];

export type QuoteQuestion = {
  id: string;
  label: string;
  type: "select" | "number" | "checkbox" | "radio" | "text";
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

export const QUOTE_QUESTIONS: Record<QuoteFlow, QuoteQuestion[]> = {
  cctv: [
    { id: "cameras", label: "Number of cameras required", type: "select", options: ["1 – 4", "5 – 8", "9 – 16", "16+"], required: true },
    { id: "placement", label: "Camera placement", type: "checkbox", options: ["Indoor", "Outdoor", "Both"] },
    { id: "night_vision", label: "Require night vision (IR) cameras?", type: "radio", options: ["Yes", "No"] },
    { id: "remote_viewing", label: "Require remote viewing on phone/desktop?", type: "radio", options: ["Yes", "No"] },
    { id: "recording", label: "Desired recording duration", type: "select", options: ["7 days", "14 days", "30 days", "3 months+"] },
    { id: "existing", label: "Do you have an existing system?", type: "radio", options: ["No", "Yes — needs upgrade", "Yes — needs repair"] },
  ],
  "access-control": [
    { id: "doors", label: "Number of doors to secure", type: "number", required: true, placeholder: "e.g. 3" },
    { id: "users", label: "Number of users / staff", type: "number", placeholder: "e.g. 50" },
    { id: "method", label: "Preferred access method", type: "checkbox", options: ["Fingerprint", "Facial recognition", "RFID cards", "PIN codes"] },
    { id: "integration", label: "Integration with CCTV or alarms?", type: "radio", options: ["Yes", "No", "Not sure"] },
  ],
  "electric-fence": [
    { id: "perimeter", label: "Approximate perimeter length", type: "select", options: ["Under 200m", "200 – 500m", "500m – 1km", "Over 1km"], required: true },
    { id: "existing_fence", label: "Existing fence or wall?", type: "radio", options: ["Yes", "No", "Partial"] },
    { id: "gate", label: "Gate configuration", type: "select", options: ["Single gate", "Multiple gates", "Vehicle access only", "Pedestrian + vehicle"] },
    { id: "battery", label: "Battery backup required?", type: "radio", options: ["Yes", "No"] },
  ],
  "gate-automation": [
    { id: "gate_type", label: "Gate type", type: "radio", options: ["Sliding gate", "Swing gate", "Both", "Barrier / boom"], required: true },
    { id: "gate_count", label: "Number of gates", type: "number", placeholder: "e.g. 2" },
    { id: "access", label: "Preferred access control", type: "checkbox", options: ["Remote control", "GSM / phone", "Keypad", "RFID / biometric"] },
  ],
  solar: [
    { id: "usage", label: "Average monthly electricity usage", type: "select", options: ["Under 200 kWh", "200 – 500 kWh", "500 – 1,000 kWh", "Over 1,000 kWh"], required: true },
    { id: "backup", label: "Desired backup duration", type: "select", options: ["2 – 4 hours", "6 – 8 hours", "Full day", "Full day + night"] },
    { id: "appliances", label: "Key appliances to power", type: "text", placeholder: "e.g. TVs, fridge, lights, wifi, laptop" },
    { id: "existing_solar", label: "Existing solar system?", type: "radio", options: ["No", "Yes — panels only", "Yes — full system"] },
    { id: "capacity", label: "Desired solar capacity", type: "select", options: ["1 – 3kW", "3 – 8kW", "8 – 15kW", "Not sure — advise me"] },
  ],
  networking: [
    { id: "scale", label: "Network scale", type: "radio", options: ["Single room", "House / small office", "Multi-floor / large office", "Multiple sites"], required: true },
    { id: "devices", label: "Approximate number of devices", type: "number", placeholder: "e.g. 40" },
    { id: "needs", label: "What is needed?", type: "checkbox", options: ["New install", "Cabling", "Wi-Fi upgrade", "Troubleshooting"] },
  ],
  starlink: [
    { id: "internet", label: "Do you have a Starlink kit?", type: "radio", options: ["Yes — I have the kit", "No — I need advice"], required: true },
    { id: "site", label: "Installation site type", type: "select", options: ["House", "Office", "School", "Farm / remote", "Hotel"] },
    { id: "roof", label: "Roof / mounting type", type: "select", options: ["Pitched roof", "Flat roof", "Wall mount", "Pole / tower", "Not sure"] },
  ],
  "it-support": [
    { id: "devices_count", label: "Number of computers / devices", type: "number", placeholder: "e.g. 20" },
    { id: "issue", label: "Type of support needed", type: "checkbox", options: ["Diagnostics & repair", "Upgrades", "Software / installation", "Virus & malware removal", "Preventive maintenance"] },
    { id: "support_model", label: "Preferred support model", type: "radio", options: ["One-off", "Monthly maintenance", "Contract retainer"] },
  ],
  general: [
    { id: "requirements", label: "Tell us what you need", type: "text", required: true, placeholder: "Describe your requirements…" },
    { id: "timeline", label: "Expected timeline", type: "select", options: ["Immediately", "Within a month", "2 – 3 months", "Just exploring"] },
  ],
};

export type Project = {
  slug: string;
  category: string;
  title: string;
  location: string;
  clientType: string;
  solution: string;
  description: string;
  equipment: string[];
  date: string;
  art: string;
  beforeAfter?: boolean;
};

export const PROJECT_CATEGORIES = [
  "Security",
  "Solar",
  "Networking",
  "Gate Automation",
  "Access Control",
  "IT",
  "Connectivity",
];

export const PROJECTS: Project[] = [
  {
    slug: "residential-estate-cctv",
    category: "Security",
    title: "Residential Estate CCTV Overhaul",
    location: "Nairobi",
    clientType: "Gated Community",
    solution: "32-camera IP surveillance with NVR and remote monitoring",
    description:
      "Complete CCTV upgrade for a gated residential estate: 32 IP cameras covering entry points, car parks and perimeters, centralized NVR storage with 30-day retention, and remote viewing for the residents' committee.",
    equipment: ["4MP IP bullet cameras", "16-channel PoE NVR ×2", "4TB surveillance HDD", "Structured cabling", "Monitor & viewing station"],
    date: "2025",
    art: "camera",
  },
  {
    slug: "school-access-and-fence",
    category: "Access Control",
    title: "School Perimeter & Access Control",
    location: "Kiambu",
    clientType: "Educational Institution",
    solution: "25kV electric fence, biometric staff entry and CCTV",
    description:
      "Perimeter and access modernization for a learning institution: electric fence energizer system around the campus, biometric access control at staff and visitor entrances, and CCTV coverage of dormitory and admin blocks.",
    equipment: ["6J dual-zone energizer", "High-tensile fence wire", "Fingerprint terminals ×4", "RFID cards", "4MP dome cameras"],
    date: "2025",
    art: "fence",
  },
  {
    slug: "warehouse-solar-backup",
    category: "Solar",
    title: "Warehouse Solar Power & Backup",
    location: "Athi River",
    clientType: "Industrial / Warehouse",
    solution: "20kW rooftop solar with battery backup and grid hybrid operation",
    description:
      "Design and installation of a 20kW rooftop solar system for a distribution warehouse, with 30kWh lithium storage to sustain operations through outages, plus monitoring dashboards.",
    equipment: ["450W mono panels ×44", "8kW hybrid inverters ×3", "5kWh lithium batteries ×6", "DC & AC protection", "Monitoring gateway"],
    date: "2024",
    art: "solar",
  },
  {
    slug: "office-network-cabling",
    category: "Networking",
    title: "Corporate Office Structured Cabling",
    location: "Westlands, Nairobi",
    clientType: "Corporate Office",
    solution: "60-point structured cabling with Wi-Fi 6 and managed switching",
    description:
      "Full structured cabling for a 4-floor corporate office: 60 data points, gigabit managed switching, Wi-Fi 6 access points, and a tidy locked rack — all certified and documented.",
    equipment: ["CAT6 cabling", "24-port managed switches", "Wi-Fi 6 access points", "6U network rack", "Patch panels"],
    date: "2025",
    art: "network",
  },
  {
    slug: "residential-gate-automation",
    category: "Gate Automation",
    title: "Estate Gate & Barrier Automation",
    location: "Karen, Nairobi",
    clientType: "Residential Estate",
    solution: "Sliding gate motors, GSMs and boom barriers for dual gate entry",
    description:
      "Automation of two estate gate entrances with heavy-duty sliding gate motors, GSM phone-access controllers, safety photocells, and boom barriers for service vehicles.",
    equipment: ["800kg sliding gate motors ×2", "GSM controllers", "Boom barriers ×2", "Safety photocells", "Rolling-code remotes"],
    date: "2024",
    art: "gate",
  },
  {
    slug: "clinic-access-swipes",
    category: "Access Control",
    title: "Clinic Access Control & Audit Logs",
    location: "Nairobi",
    clientType: "Hospital / Clinic",
    solution: "Multi-door card access with staff audit trails and door controllers",
    description:
      "Deployed multi-door RFID access control for a clinic, restricting pharmacy, records and lab areas while maintaining full audit logs and integration with the existing CCTV.",
    equipment: ["Standalone RFID readers ×8", "Magnetic locks", "Door controllers", "Exit buttons", "RFID cards"],
    date: "2025",
    art: "fingerprint",
  },
  {
    slug: "hotel-starlink-connectivity",
    category: "Connectivity",
    title: "Hotel Starlink & Guest Wi-Fi",
    location: "Naivasha",
    clientType: "Hotel / Hospitality",
    solution: "Starlink business internet with managed guest Wi-Fi network",
    description:
      "Installed Starlink business internet with professional rooftop mounting, then built a managed guest Wi-Fi network with coverage across rooms, lobby and pool area.",
    equipment: ["Starlink business kit", "Professional mount kit", "Wi-Fi 6 access points ×6", "Managed switch", "Guest portal"],
    date: "2025",
    art: "starlink",
  },
  {
    slug: "farm-solar-pumping",
    category: "Solar",
    title: "Farm Solar Water Pumping",
    location: "Naivasha",
    clientType: "Farm",
    solution: "Solar borehole pumping kit delivering up to 12m³/day",
    description:
      "Complete solar water-pumping solution for a horticultural farm, replacing diesel pumping with a solar-driven submersible borehole system and storage tanks.",
    equipment: ["Submersible pump", "MPPT controller", "450W panels ×6", "Tank level sensors"],
    date: "2024",
    art: "pump",
  },
  {
    slug: "office-it-refresh",
    category: "IT",
    title: "Office IT Refresh & Preventive Maintenance",
    location: "Nairobi CBD",
    clientType: "Corporate Office",
    solution: "Fleet upgrade, malware cleanup and 12-month maintenance contract",
    description:
      "Full IT refresh for a 40-seat office: upgraded desktops to SSD, removed malware across the fleet, standardized software, and signed a preventive maintenance contract.",
    equipment: ["Business desktops", "NVMe SSDs", "Windows updates & imaging", "Backup solution"],
    date: "2025",
    art: "it",
  },
];

export const STORE_SHORT = "Supply, installation and maintenance of security, technology and solar equipment — quality certified components only.";