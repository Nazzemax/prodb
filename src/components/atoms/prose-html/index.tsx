import * as React from "react";
import type { HtmlSanitizer } from "@/components/types";
import { sanitizeCkHtml } from "@/lib/sanitizeCkHtml";
import { cn } from "@/lib/utils";

type Props = {
  html?: string;
  sanitize?: HtmlSanitizer;
  className?: string;
};

export default function ProseHtml({ html, sanitize, className = "" }: Props) {
    const activeSanitizer = sanitize ?? sanitizeCkHtml;
    const cleaned = React.useMemo(
        () => activeSanitizer(html || ""),
        [html, activeSanitizer]
    );

    if (!cleaned) return null;

    return (
        <div
            className={cn(
                "ck-content prose prose-slate max-w-none prose-headings:font-semibold prose-p:leading-relaxed",
                className
            )}
            dangerouslySetInnerHTML={{ __html: cleaned }}
        />
    );
}
