// constants/officeChairRepair.ts

export interface RepairSection {
  title: string;
  description: string;
  listAttr?: string[];
}

export const OFFICE_CHAIR_REPAIR_CONTENT: RepairSection[] = [
  // {
  //   title: "Restore Comfort and Performance",
  //   description:
  //     "We specialize in repairing the most common office chair failures using premium-quality replacement parts, helping you restore comfort, functionality, and durability without the expense of buying a new chair. Our skilled technicians diagnose the issue and provide reliable repairs that extend the life of your office furniture.",
  // },
  // {
  //   title: "Comprehensive Repair Solutions",
  //   description:
  //     "Our services cover common problems such as faulty gas lift cylinders, broken star bases, damaged caster wheels, worn armrests, malfunctioning tilt mechanisms, loose seat plates, and backrest support issues. Every replacement part is carefully selected to ensure long-lasting performance and compatibility with your chair.",
  // },
  // {
  //   title: "Expert Inspection and Quality Repairs",
  //   description:
  //     "Each repair begins with a detailed inspection to identify both visible and hidden faults. Once diagnosed, we replace defective components using professional tools and thoroughly test the chair to ensure smooth movement, proper height adjustment, stability, and user safety.",
  // },
  // {
  //   title: "Affordable and Sustainable Choice",
  //   description:
  //     "Repairing your office chair is a cost-effective and environmentally friendly alternative to replacement. It reduces waste, saves money, and keeps your existing chair performing like new.",
  // },
  // {
  //   title: "Trusted Service You Can Rely On",
  //   description:
  //     "Whether you need a single chair repaired at home or maintenance for multiple chairs in an office, we provide dependable service with a focus on quality workmanship and customer satisfaction. Trust us to bring your office chair back to optimal condition with durable parts, expert repairs, and lasting results.",
  // },

  {
    title: "Gas Cylinder Replacement",
    description:
      "Is your chair sinking while sitting? We replace worn-out gas lift cylinders with durable heavy-duty cylinders.",
    listAttr: [
      "Chair sinking issue",
      "Height adjustment problem",
      " Premium gas lift installation",
    ],
  },
  {
    title: "Base Plate Replacement",
    description:
      "If your chair won’t recline or lock properly, our technicians replace damaged tilt mechanisms and base plates.",
    listAttr: ["Reclining issue", "Locking mechanism", "Heavy-duty base plate"],
  },
  {
    title: "Star Base Replacement",
    description:
      "Replace cracked or broken chair bases with premium nylon or metal star bases for maximum stability.",
    listAttr: [
      "Broken chair legs",
      "Better stability",
      "Heavy-duty replacement",
    ],
  },
  // {
  //   title: "Affordable and Sustainable Choice",
  //   description:
  //     "Repairing your office chair is a cost-effective and environmentally friendly alternative to replacement. It reduces waste, saves money, and keeps your existing chair performing like new.",
  // },
];
