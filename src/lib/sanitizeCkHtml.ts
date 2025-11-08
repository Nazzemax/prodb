// src/lib/sanitizeCkHtml.ts
import sanitizeHtml, { IOptions } from "sanitize-html";

const BASE = "https://api.boldbrands.pro";

function absolutize(src?: string) {
    if (!src) return src;
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("//")) return `https:${src}`;
    if (src.startsWith("/")) return BASE + src;
    return src; // data:, blob:, etc. (allowed by config below if needed)
}

function absolutizeSrcset(value?: string) {
    if (!value) return undefined;

    const candidates = value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
        .map((entry) => {
            const [url, descriptor] = entry.split(/\s+/, 2);
            if (!url) return null;
            const abs = absolutize(url);
            return descriptor ? `${abs} ${descriptor}` : abs;
        })
        .filter(Boolean);

    return candidates.length ? candidates.join(", ") : undefined;
}

const options: IOptions = {
    // Keep only safe/generic content + images/links
    allowedTags: [
        "p","br","hr","b","strong","i","em","u","s","span","blockquote","code","pre",
        "ul","ol","li","h1","h2","h3","h4","h5","h6","img","a","figure","figcaption",
        "picture","source","table","tbody","thead","tfoot","tr","td","th","caption",
        "div","section"
    ],
    allowedAttributes: {
        a: ["href","name","target","rel","title","class","style"],
        img: [
            "src","alt","title","width","height","loading","class","srcset","sizes","data-caption"
        ],
        source: ["src","srcset","type","media","sizes"],
        table: ["border","cellpadding","cellspacing"],
        "*": [
            "class",
            "data-align",
            "data-style",
            "data-widget",
            "data-caption",
            "data-image-style"
        ], // allow classes/data-* for CKEditor styling
    },
    allowedSchemes: ["http","https","mailto","tel","data"],
    allowedSchemesByTag: {
        img: ["http","https","data"], // allow data URIs if CKEditor inlines small images
        source: ["http","https","data"],
    },
    transformTags: {
        a: (_tagName, attribs) => {
            const href = attribs.href?.trim();
            if (!href) {
                return {
                    tagName: "span",
                    attribs: {},
                };
            }

            const baseStyle = "color:#2563eb;text-decoration:underline;";
            const style = attribs.style
                ? `${attribs.style};${baseStyle}`
                : baseStyle;

            return {
                tagName: "a",
                attribs: {
                    ...attribs,
                    href,
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    style,
                },
            };
        },
        img: (_tagName, attribs) => {
            const src = absolutize(attribs.src) || "";
            const srcset = absolutizeSrcset(attribs.srcset);
            const loading = attribs.loading || "lazy";

            const cleanAttribs: { [key: string]: string } = Object.fromEntries(
        Object.entries({
            ...attribs,
            src,
            loading,
            srcset,
        }).filter(([, value]) => value !== undefined) as [string, string][]
            );

            return { tagName: "img", attribs: cleanAttribs };
        },
        source: (_tagName, attribs) => {
            const src = attribs.src ? absolutize(attribs.src) : undefined;
            const srcset = absolutizeSrcset(attribs.srcset);
            const cleanAttribs = { ...attribs };
            if (src) cleanAttribs.src = src;
            if (srcset) cleanAttribs.srcset = srcset;
            return { tagName: "source", attribs: cleanAttribs };
        },
    },
    nonTextTags: ["script","style","iframe","object","embed","noscript","template"],
};

export function sanitizeCkHtml(dirty?: string): string {
    if (!dirty) return "";
    return sanitizeHtml(dirty, options).trim();
}
