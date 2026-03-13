/**
 * Hotspot data for 360° panorama scenes (pitch/yaw for Pannellum viewer).
 * Reused from fakeit reference; can be moved to DB or JSON when needed.
 */

/** Convert normalized image coords [0,1] to panorama yaw (degrees). */
export function xToYaw(x: number): number {
  return (x - 0.5) * 360;
}
/** Convert normalized image coords [0,1] to panorama pitch (degrees). */
export function yToPitch(y: number): number {
  return (0.5 - y) * 180;
}

export type PanoramaHotspot = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  pitch?: number;
  yaw?: number;
  media?: string;
  link?: string;
};

/** Get pitch/yaw in degrees for a hotspot (uses explicit values or derives from x,y). */
export function getHotspotPitchYaw(h: PanoramaHotspot): {
  pitch: number;
  yaw: number;
} {
  return {
    pitch: h.pitch ?? yToPitch(h.y),
    yaw: h.yaw ?? xToYaw(h.x),
  };
}

/** HR office 360° scene hotspots. */
export const hrHotspots: PanoramaHotspot[] = [
  {
    id: "resume-ai",
    title: "AI Resume Screening",
    description: "Automatically analyze and rank resumes using AI to identify the best candidates faster. The system extracts key skills, qualifications, and experience from large applicant pools, helping you focus on the most relevant candidates while reducing manual review time.",
    x: 0.05,
    y: 0.65,
    link: "https://interview-service-blond.vercel.app/login",
  },
  {
    id: "interview-ai",
    title: "AI Interview Intelligence",
    description: "Conduct AI-assisted video interviews that evaluate candidate responses, communication patterns, and key competencies. Recruiters receive structured insights and candidate summaries to support faster and more informed hiring decisions.",
    x: 0.273,
    y: 0.52,
  },
  {
    id: "analytics-ai",
    title: "Workforce Analytics",
    description: "Gain actionable insights into hiring trends, employee performance, and workforce planning. AI-powered analytics help HR leaders track key metrics, identify talent gaps, and make data-driven decisions for workforce growth.",
    x: 0.5015,
    y: 0.53,
  },
  {
    id: "helpdesk-ai",
    title: "HR Helpdesk AI",
    description: "Provide employees with instant support through an AI-powered HR assistant. Employees can ask questions about policies, benefits, or documents and receive quick answers, reducing HR workload while improving employee experience.",
    x: 0.75,
    y: 0.58,
    media: "/media/acme-corp-hr-portal.mp4",
    link: "https://hr-ai-assistant.copilotinnovations.com/",
  },
  {
    id: "onboarding-ai",
    title: "Onboarding AI",
    description: "Onboarding AI",
    x: 0.87,
    y: 0.63,
  },
];

/** Classroom 360° scene (placeholder until scene-specific image/hotspots exist). */
export const classroomHotspots: PanoramaHotspot[] = [
  {
    id: "visual-aid",
    title: "Teacher creating visual aid",
    description: "Teacher creating visual aid",
    x: 0.1,
    y: 0.6,
  },
  {
    id: "ilustrations-generator",
    title: "AI Illustration Generation",
    description: "AI Illustration Generation",
    x: 0.33,
    y: 0.35,
  },
  {
    id: "visual-materials",
    title: "Students using visual materials",
    description: "Students using visual materials",
    x: 0.5,
    y: 0.55,
  },
  {
    id: "smartboard",
    title: "Interactive Smartboard lesson",
    description: "Interactive Smartboard lesson",
    x: 0.68,
    y: 0.35,
  },
  {
    id: "curriculum",
    title: "Curriculum planning desk",
    description: "Curriculum planning desk",
    x: 0.885,
    y: 0.625,
  },
];

/** Construction 360° scene (placeholder until scene-specific image/hotspots exist). */
export const constructionHotspots: PanoramaHotspot[] = [
  // {
  //   id: "drone-monitoring",
  //   title: "Drone Monitoring",
  //   description: "AI drone monitoring for construction progress and safety.",
  //   x: 0.155,
  //   y: 0.30,
  // },
  // {
  //   id: "safety-camera",
  //   title: "Safety Camera",
  //   description: "Computer vision safety monitoring for workers and hazards.",
  //   x: 0.083,
  //   y: 0.455
  // },
  // {
  //   id: "blueprint-tablet",
  //   title: "Blueprint Tablet",
  //   description: "Interactive blueprint analysis and AI planning tools.",
  //   x: 0.50,
  //   y: 0.60,
  // },
  {
    id: "estimate-ai",
    title: "Estimate AI",
    description: "AI-powered construction cost estimation and planning.",
    x: 0.65,
    y: 0.45,
  },
  // {
  //   id: "equipment-optimization",
  //   title: "Equipment Optimization",
  //   description: "Optimize machinery and equipment usage with AI.",
  //   x: 0.83,
  //   y: 0.53,
  // },
  // {
  //   id: "material-tracking",
  //   title: "Material Tracking",
  //   description: "Track construction materials and deliveries automatically.",
  //   x: 0.95,
  //   y: 0.60,
  // },
  // {
  //   id: "project-dashboard",
  //   title: "Project Dashboard",
  //   description: "Centralized AI dashboard for project monitoring.",
  //   x: 0.93,
  //   y: 0.48,
  // },
];

/** Classroom 360° scene (placeholder until scene-specific image/hotspots exist). */
export const ecommerceHotspots: PanoramaHotspot[] = [
  {
    id: "store-window-marketing-display",
    title: "AI SEO + Lifestyle Images for Apparel",
    description: "Store window marketing display",
    x: 0.1,
    y: 0.4,
    link: "http://ai-seo-agentic-framework.copilotinnovations.com"
  },
  {
    id: "sales-associate-ai-assistant",
    title: "AI Sales Assistant In-Store (200k SKUs)",
    description: "Sales associated AI assistant",
    media: "/media/ai-sales-assistant.mp4",
    x: 0.21,
    y: 0.58,
  },
  {
    id: "customer-mobile-shopping-companion",
    title: "Mobile App In-Store companion",
    description: "Customer mobile shopping companion",
    x: 0.55,
    y: 0.58,
  },
  {
    id: "ai-chatbot-product-recommendations",
    title: "Chatbot + Product Recommendations",
    description: "S&P Chatbot with order verification and product recommendations",
    x: 0.68,
    y: 0.58,
    link: "https://www.silverandpewtergifts.com/"
  },
  {
    id: "checkout-verification-system",
    title: "Order Verification + Checkout AI",
    description: "Checkout verification system",
    x: 0.9,
    y: 0.58,
  },
];

export function getHotspotsForSlug(
  slug: string
): PanoramaHotspot[] {
  switch (slug) {
    case "hr":
      return hrHotspots;
    case "classroom":
      return classroomHotspots;
    case "construction":
      return constructionHotspots;
    case "ecommerce":
      return ecommerceHotspots;
    default:
      return [];
  }
}
