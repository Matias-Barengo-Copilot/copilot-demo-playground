/**
 * Landing section: 6 category cards (large, 2 columns).
 * Each card can have an optional image; structure is ready for when we have assets.
 */

import type { BusinessFunctionSlug } from "@/db/schema";

export type LandingCategory = {
  id: BusinessFunctionSlug;
  title: string;
  description: string;
  /** Route to the list of demos for this category */
  href: string;
  /** Number of demos (can be derived from catalog later) */
  demoCount: number;
  /**
   * Optional image URL. When set, the card shows the image; otherwise a placeholder.
   * Ready for when we generate or obtain images.
   */
  imageUrl?: string;
};

export const LANDING_CATEGORIES: LandingCategory[] = [
  {
    id: "recruitment-hr",
    title: "Recruitment & HR",
    href: "/demos/business-functions/recruitment-hr",
    description:
      "AI-powered hiring workflows including resume screening, candidate ranking, interview scheduling, and onboarding—all in the context of Mountain View Coffee.",
    demoCount: 1,
    // imageUrl: "/images/landing/recruitment-hr.jpg",
  },
  {
    id: "marketing-seo",
    title: "Marketing & SEO",
    href: "/demos/business-functions/marketing-seo",
    description:
      "Content generation, social media management, SEO optimization, campaign analytics, and seasonal promotions for the brand.",
    demoCount: 1,
    // imageUrl: "/images/landing/marketing-seo.jpg",
  },
  {
    id: "customer-support",
    title: "Customer Support",
    href: "/demos/business-functions/customer-support",
    description:
      "Intelligent ticket routing, automated response suggestions, sentiment analysis, and satisfaction follow-up for order and service issues.",
    demoCount: 1,
    // imageUrl: "/images/landing/customer-support.jpg",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    href: "/demos/business-functions/ecommerce",
    description:
      "Product listing optimization, inventory management, order processing, and sales forecasting within the coffee shop’s retail flow.",
    demoCount: 0,
    // imageUrl: "/images/landing/ecommerce.jpg",
  },
  {
    id: "operations",
    title: "Operations",
    href: "/demos/business-functions/operations",
    description:
      "Supply chain optimization, scheduling automation, resource allocation, and process improvements for daily operations.",
    demoCount: 0,
    // imageUrl: "/images/landing/operations.jpg",
  },
  {
    id: "finance",
    title: "Finance",
    href: "/demos/business-functions/finance",
    description:
      "Invoice processing, expense tracking, financial reporting, and cash flow monitoring for the business.",
    demoCount: 0,
    // imageUrl: "/images/landing/finance.jpg",
  },
];
