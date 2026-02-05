import type { IndustryDemo } from "@/lib/demo-catalog";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

type ExternalDemoLinkProps = {
  demo: IndustryDemo;
};

/**
 * Card for an industry demo that opens in an external site.
 * Makes it clear the user is leaving the portal.
 */
export function ExternalDemoLink({ demo }: ExternalDemoLinkProps) {
  return (
    <a
      href={demo.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      aria-label={`Open ${demo.title} (external site, opens in new tab)`}
    >
      <Card className="h-full border-border bg-card transition-shadow hover:shadow-md hover:border-primary/30">
        <CardContent className="pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ExternalLink className="size-3.5" aria-hidden />
            Opens in new tab — you’ll leave the portal
          </span>
          <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            {demo.industry}
          </span>
          <h2 className="mt-2 font-semibold text-foreground">{demo.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {demo.description}
          </p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            {demo.customerStory}
          </p>
        </CardContent>
      </Card>
    </a>
  );
}
