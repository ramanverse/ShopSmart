export const BRANDS = [
  "BMW", "Mercedes-Benz", "Audi", "Porsche", "Land Rover",
  "Ferrari", "Lamborghini", "Bentley", "McLaren", "Rolls-Royce",
  "Maserati", "Jaguar", "Lexus", "Volvo", "Tesla",
];

export const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];

export const BODY_TYPES = ["SUV", "Sedan", "Coupe", "Convertible", "Hatchback", "Crossover"];

export const TRANSMISSIONS = ["Automatic", "Manual"];

export const COLORS = [
  "Black", "White", "Silver", "Grey", "Blue",
  "Red", "Green", "Brown", "Gold", "Pearl",
];

export const STATES = [
  "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana",
  "Gujarat", "Rajasthan", "Uttar Pradesh", "Punjab", "Haryana",
  "West Bengal", "Kerala", "Goa",
];

export const CITIES = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune"];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "km_asc", label: "KM: Low to High" },
  { value: "year_desc", label: "Year: Newest First" },
];

export const BLOG_CATEGORIES = [
  "Buying Tips", "Car Reviews", "Maintenance", "Industry News", "Guides",
];

export const ENQUIRY_STATUSES = ["new", "contacted", "in_progress", "closed"];

export const SELL_REQUEST_STATUSES = [
  "new", "inspection_scheduled", "offer_made", "completed",
];

export const TEST_DRIVE_STATUSES = ["pending", "confirmed", "cancelled", "completed"];

export const NAV_LINKS = [
  { href: "/cars", label: "Buy Cars" },
  { href: "/sell", label: "Sell Your Car" },
  { href: "/emi-calculator", label: "EMI Calculator" },
  { href: "/showrooms", label: "Showrooms" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const STATS = [
  { value: "5000+", label: "Cars Listed" },
  { value: "15,000+", label: "Happy Customers" },
  { value: "15+", label: "Cities" },
  { value: "12", label: "Years in Business" },
];

export const USPS = [
  {
    icon: "Shield",
    title: "200-Point Inspection",
    description: "Every car undergoes rigorous inspection by certified mechanics",
  },
  {
    icon: "Award",
    title: "Certified Quality",
    description: "All vehicles come with authenticity and quality certification",
  },
  {
    icon: "Clock",
    title: "30-Min Sell Process",
    description: "Get instant offers and complete the sale in under 30 minutes",
  },
  {
    icon: "BadgeCheck",
    title: "Best Price Guarantee",
    description: "We guarantee the best market price for buying and selling",
  },
  {
    icon: "Headphones",
    title: "24/7 Support",
    description: "Our experts are available round the clock to assist you",
  },
  {
    icon: "FileText",
    title: "Zero Paperwork",
    description: "We handle all RTO transfers and documentation for you",
  },
];
