/**
 * Config for Business Function flip cards: icon + default image per category.
 * Used when category has no imageUrl in LANDING_CATEGORIES.
 */

import type { LucideIcon } from "lucide-react";
import {
  Users,
  Megaphone,
  MessageCircle,
  Package,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import type { BusinessFunctionSlug } from "@/db/schema";

const UNSPLASH_BASE =
  "https://images.unsplash.com/photo-1769985840589-247088733de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export type BusinessFunctionCardConfig = {
  icon: LucideIcon;
  /** Default background image when category has no imageUrl */
  imageUrl: string;
};

const DEFAULT_IMAGES: Record<BusinessFunctionSlug, string> = {
  "recruitment-hr":
    "https://images.unsplash.com/photo-1760085160740-3f0c652116e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "marketing-seo": UNSPLASH_BASE,
  "customer-support":
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ecommerce:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  operations:
    "https://images.unsplash.com/photo-1726770412334-42ea268224fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  finance:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

const ICONS: Record<BusinessFunctionSlug, LucideIcon> = {
  "recruitment-hr": Users,
  "marketing-seo": Megaphone,
  "customer-support": MessageCircle,
  ecommerce: ShoppingBag,
  operations: Package,
  finance: Wallet,
};

export function getBusinessFunctionCardConfig(
  slug: BusinessFunctionSlug,
  categoryImageUrl?: string | null
): BusinessFunctionCardConfig {
  return {
    icon: ICONS[slug],
    imageUrl: categoryImageUrl ?? DEFAULT_IMAGES[slug],
  };
}
