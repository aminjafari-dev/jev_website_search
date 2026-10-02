export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: "USD";
  description: string;
  tags: string[];
  tone: string;
};

export const products: Product[] = [
  {
    id: "p01",
    name: "Cascade Softshell Jacket",
    category: "Outerwear",
    price: 148,
    currency: "USD",
    description:
      "Lightweight waterproof softshell for hiking and shoulder-season trails. Breathable membrane, packable hood, and quiet stretch fabric.",
    tags: ["waterproof", "hiking", "lightweight", "jacket", "outdoor"],
    tone: "#1f4d3a",
  },
  {
    id: "p02",
    name: "Ridge Merino Base Layer",
    category: "Apparel",
    price: 68,
    currency: "USD",
    description:
      "Fine-gauge merino crew for cool mornings. Odor-resistant, moisture-wicking, and soft enough for travel days.",
    tags: ["merino", "base layer", "travel", "warm", "layering"],
    tone: "#3d5a45",
  },
  {
    id: "p03",
    name: "Summit Alpine Down Vest",
    category: "Outerwear",
    price: 189,
    currency: "USD",
    description:
      "800-fill down vest for alpine camps and cold city walks. Slim cut with wind-blocking face fabric.",
    tags: ["down", "warm", "vest", "cold weather", "packable"],
    tone: "#16352b",
  },
  {
    id: "p04",
    name: "Trailfoam Mid Hiking Boots",
    category: "Footwear",
    price: 164,
    currency: "USD",
    description:
      "Waterproof mid-cut hiking boots with cushioned foam midsole. Stable on rocky paths and all-day treks.",
    tags: ["boots", "hiking", "waterproof", "footwear", "trail"],
    tone: "#4a3728",
  },
  {
    id: "p05",
    name: "Harbor Canvas Sneakers",
    category: "Footwear",
    price: 92,
    currency: "USD",
    description:
      "Everyday canvas sneakers with memory-foam insole. Casual, breathable, and easy to dress up or down.",
    tags: ["sneakers", "casual", "everyday", "canvas", "comfortable"],
    tone: "#5c6b73",
  },
  {
    id: "p06",
    name: "Nightshift Running Shoes",
    category: "Footwear",
    price: 128,
    currency: "USD",
    description:
      "Responsive road runners with reflective overlays for early-morning and night miles.",
    tags: ["running", "shoes", "reflective", "road", "athletic"],
    tone: "#1a2a33",
  },
  {
    id: "p07",
    name: "Cedar Frame Daypack 22L",
    category: "Bags",
    price: 118,
    currency: "USD",
    description:
      "Structured 22L daypack with laptop sleeve and side water pockets. Ideal for commute plus weekend hikes.",
    tags: ["backpack", "daypack", "commute", "hiking", "laptop"],
    tone: "#2f3e46",
  },
  {
    id: "p08",
    name: "Foldline Weekender Duffel",
    category: "Bags",
    price: 142,
    currency: "USD",
    description:
      "Compressible weekender with shoe pocket and padded shoulder strap. Carry-on friendly for short trips.",
    tags: ["duffel", "travel", "weekender", "carry-on", "bag"],
    tone: "#3b2f2f",
  },
  {
    id: "p09",
    name: "Field Crossbody Sling",
    category: "Bags",
    price: 64,
    currency: "USD",
    description:
      "Compact sling for phone, keys, and a small bottle. Quick-access for city walking and festivals.",
    tags: ["sling", "crossbody", "compact", "city", "everyday"],
    tone: "#5a4632",
  },
  {
    id: "p10",
    name: "Ember Cast Iron Skillet 10\"",
    category: "Kitchen",
    price: 78,
    currency: "USD",
    description:
      "Pre-seasoned cast iron skillet for searing steaks, cornbread, and camp stove cooking.",
    tags: ["cast iron", "cooking", "skillet", "kitchen", "camp"],
    tone: "#2b2118",
  },
  {
    id: "p11",
    name: "Glassline Pour-Over Kit",
    category: "Kitchen",
    price: 54,
    currency: "USD",
    description:
      "Borosilicate pour-over dripper with server and paper filters. Clean coffee without a machine.",
    tags: ["coffee", "pour-over", "kitchen", "gift", "morning"],
    tone: "#6b5b4b",
  },
  {
    id: "p12",
    name: "Steel Nomad Water Bottle 32oz",
    category: "Drinkware",
    price: 36,
    currency: "USD",
    description:
      "Insulated stainless bottle that keeps drinks cold for 24 hours. Wide mouth for ice and easy cleaning.",
    tags: ["bottle", "insulated", "hydration", "gym", "hiking"],
    tone: "#355070",
  },
  {
    id: "p13",
    name: "Trail Mug Titanium 450ml",
    category: "Drinkware",
    price: 42,
    currency: "USD",
    description:
      "Ultralight titanium mug for backpacking stoves. Nested lid doubles as a small plate.",
    tags: ["titanium", "mug", "ultralight", "backpacking", "camp"],
    tone: "#4b5563",
  },
  {
    id: "p14",
    name: "Horizon Two-Person Tent",
    category: "Camping",
    price: 289,
    currency: "USD",
    description:
      "Freestanding two-person tent with dual vestibules and quick-pitch hub poles. Three-season shelter.",
    tags: ["tent", "camping", "two-person", "backpacking", "shelter"],
    tone: "#1d3557",
  },
  {
    id: "p15",
    name: "Cloudloft Sleeping Quilt",
    category: "Camping",
    price: 214,
    currency: "USD",
    description:
      "20°F down quilt for backpacking. Lighter than a traditional mummy bag with room to move.",
    tags: ["sleeping", "quilt", "down", "backpacking", "camping"],
    tone: "#274c77",
  },
  {
    id: "p16",
    name: "Glowstick Camp Lantern",
    category: "Camping",
    price: 48,
    currency: "USD",
    description:
      "Rechargeable LED lantern with warm and cool modes. Magnetic base for tent poles and picnic tables.",
    tags: ["lantern", "camping", "led", "rechargeable", "light"],
    tone: "#c9a227",
  },
  {
    id: "p17",
    name: "Studio Focus Headphones",
    category: "Audio",
    price: 198,
    currency: "USD",
    description:
      "Over-ear ANC headphones for deep work and flights. Soft pads, 35-hour battery, fold-flat case.",
    tags: ["headphones", "noise cancelling", "travel", "work", "audio"],
    tone: "#111827",
  },
  {
    id: "p18",
    name: "Pocket Clip Bluetooth Speaker",
    category: "Audio",
    price: 59,
    currency: "USD",
    description:
      "IPX7 portable speaker that clips to a backpack or bike. Surprisingly loud for its size.",
    tags: ["speaker", "portable", "bluetooth", "outdoor", "waterproof"],
    tone: "#0f766e",
  },
  {
    id: "p19",
    name: "Paperbark Journal A5",
    category: "Stationery",
    price: 28,
    currency: "USD",
    description:
      "Lay-flat A5 notebook with 120gsm paper. Dot-grid pages for notes, sketches, and trip logs.",
    tags: ["notebook", "journal", "writing", "gift", "stationery"],
    tone: "#7c6a4f",
  },
  {
    id: "p20",
    name: "Inkline Fountain Pen",
    category: "Stationery",
    price: 46,
    currency: "USD",
    description:
      "Everyday fountain pen with a smooth fine nib and converter. Ideal for journaling and letters.",
    tags: ["pen", "fountain", "writing", "gift", "stationery"],
    tone: "#3f3a36",
  },
  {
    id: "p21",
    name: "Lumen Desk Lamp",
    category: "Home",
    price: 112,
    currency: "USD",
    description:
      "Adjustable LED desk lamp with warm dimming and USB-C charging port. Glare-free for late work.",
    tags: ["lamp", "desk", "home office", "led", "work"],
    tone: "#d4c4a8",
  },
  {
    id: "p22",
    name: "Woolthrow Cabin Blanket",
    category: "Home",
    price: 156,
    currency: "USD",
    description:
      "Heavyweight wool throw for sofas and cold nights. Fringed edges and classic cabin pattern.",
    tags: ["blanket", "wool", "cozy", "home", "winter"],
    tone: "#8b4513",
  },
  {
    id: "p23",
    name: "Stoneware Dinner Set for 4",
    category: "Kitchen",
    price: 124,
    currency: "USD",
    description:
      "Matte stoneware plates and bowls for four. Microwave and dishwasher safe with organic shapes.",
    tags: ["dinnerware", "kitchen", "stoneware", "home", "hosting"],
    tone: "#a8a29e",
  },
  {
    id: "p24",
    name: "Coastal Linen Shirt",
    category: "Apparel",
    price: 88,
    currency: "USD",
    description:
      "Breathable linen button-down for warm weather and travel. Slightly oversized, easy to layer.",
    tags: ["linen", "shirt", "summer", "travel", "casual"],
    tone: "#9aa7b1",
  },
  {
    id: "p25",
    name: "Riverwalk Chino Pants",
    category: "Apparel",
    price: 96,
    currency: "USD",
    description:
      "Stretch chinos with a clean taper. Dressy enough for meetings, comfortable for weekend walks.",
    tags: ["pants", "chinos", "work", "casual", "stretch"],
    tone: "#4b5563",
  },
  {
    id: "p26",
    name: "Peak Performance Yoga Mat",
    category: "Fitness",
    price: 72,
    currency: "USD",
    description:
      "5mm natural rubber yoga mat with grippy closed-cell surface. Rolls tight for studio bags.",
    tags: ["yoga", "mat", "fitness", "studio", "grip"],
    tone: "#365314",
  },
  {
    id: "p27",
    name: "Iron Circuit Adjustable Dumbbells",
    category: "Fitness",
    price: 249,
    currency: "USD",
    description:
      "Pair of adjustable dumbbells from 5–52.5 lb. Compact home gym strength without a rack.",
    tags: ["dumbbells", "strength", "home gym", "fitness", "weights"],
    tone: "#1c1917",
  },
  {
    id: "p28",
    name: "Pulse Heart Rate Band",
    category: "Fitness",
    price: 79,
    currency: "USD",
    description:
      "Optical heart-rate band for runs and HIIT. Syncs with phones and watches over Bluetooth.",
    tags: ["fitness", "heart rate", "running", "tracker", "training"],
    tone: "#7f1d1d",
  },
  {
    id: "p29",
    name: "Garden Bed Raised Planter",
    category: "Garden",
    price: 134,
    currency: "USD",
    description:
      "Cedar raised planter for herbs and vegetables. Drainage layer and open bottom for deep roots.",
    tags: ["garden", "planter", "herbs", "outdoor", "cedar"],
    tone: "#5c4033",
  },
  {
    id: "p30",
    name: "Rainmaker Watering Can 2L",
    category: "Garden",
    price: 32,
    currency: "USD",
    description:
      "Powder-coated steel watering can with a soft rose spout for indoor plants and seedlings.",
    tags: ["watering can", "plants", "garden", "indoor", "home"],
    tone: "#166534",
  },
  {
    id: "p31",
    name: "Vista Polarized Sunglasses",
    category: "Accessories",
    price: 118,
    currency: "USD",
    description:
      "Polarized acetate sunglasses with UV400 lenses. Lightweight frames for driving and bright trails.",
    tags: ["sunglasses", "polarized", "summer", "driving", "accessory"],
    tone: "#1e293b",
  },
  {
    id: "p32",
    name: "Harbor Wool Beanie",
    category: "Accessories",
    price: 34,
    currency: "USD",
    description:
      "Ribbed merino-blend beanie for cold walks and ski lifts. Soft cuff with a clean silhouette.",
    tags: ["beanie", "winter", "wool", "hat", "cold weather"],
    tone: "#334155",
  },
  {
    id: "p33",
    name: "Atlas Leather Belt",
    category: "Accessories",
    price: 58,
    currency: "USD",
    description:
      "Full-grain leather belt with a brushed brass buckle. Ages with a rich patina over time.",
    tags: ["belt", "leather", "everyday", "accessory", "classic"],
    tone: "#78350f",
  },
  {
    id: "p34",
    name: "Quiet Hours White Noise Machine",
    category: "Home",
    price: 69,
    currency: "USD",
    description:
      "Compact sleep sound machine with rain, fan, and brown noise. Soft amber night light.",
    tags: ["sleep", "white noise", "bedroom", "home", "relaxation"],
    tone: "#312e81",
  },
  {
    id: "p35",
    name: "Forge Chef Knife 8\"",
    category: "Kitchen",
    price: 138,
    currency: "USD",
    description:
      "High-carbon stainless chef knife with a balanced full tang. Everyday chopping and precise slicing.",
    tags: ["knife", "chef", "kitchen", "cooking", "cutlery"],
    tone: "#44403c",
  },
  {
    id: "p36",
    name: "Drift Recycled Surf Poncho",
    category: "Apparel",
    price: 84,
    currency: "USD",
    description:
      "Hooded changing poncho from recycled towels. Warm cover-up after ocean swims and cold showers.",
    tags: ["poncho", "surf", "beach", "towel", "outdoor"],
    tone: "#0e7490",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getCatalogForModel() {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price_usd: product.price,
    description: product.description,
    tags: product.tags,
  }));
}
