import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default function mergeRefs<T>(
    ...inputRefs: (React.Ref<T> | undefined)[]
): React.Ref<T> | React.RefCallback<T> {
    const filteredInputRefs = inputRefs.filter(Boolean);

    if (filteredInputRefs.length <= 1) {
        const firstRef = filteredInputRefs[0];

        return firstRef || null;
    }

    return function mergedRefs(ref) {
        for (const inputRef of filteredInputRefs) {
            if (typeof inputRef === 'function') {
                inputRef(ref);
            } else if (inputRef) {
                (inputRef as React.MutableRefObject<T | null>).current = ref;
            }
        }
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToQueryString(obj: Record<string, any>): string {
    const parts: string[] = [];

    for (const key of Object.keys(obj)) {
        const value = obj[key];

        if (value == null) continue; // skip null/undefined

        // Arrays
        if (Array.isArray(value)) {
            if (value.length === 0) continue;

            const isArrayOfObjects = value.every(
                (v) => v !== null && typeof v === "object" && !Array.isArray(v)
            );

            if (isArrayOfObjects) {
                // Expand arrays of objects (EMAIL, PHONE, ...)
                value.forEach((item, index) => {
                    for (const subKey of Object.keys(item)) {
                        const subVal = item[subKey];
                        if (subVal == null) continue;
                        parts.push(
                            `FIELDS[${key}][${index}][${subKey}]=${encodeURIComponent(String(subVal))}`
                        );
                    }
                });
            } else {
                // Array of primitives -> join into single-line string (for SECOND_NAME, LAST_NAME, tags)
                const joined = value.map((v) => String(v)).join(", ");
                parts.push(`FIELDS[${key}]=${encodeURIComponent(joined)}`);
            }

            continue;
        }

        // Plain objects (not arrays) -> expand subkeys
        if (typeof value === "object") {
            for (const subKey of Object.keys(value)) {
                const subVal = value[subKey];
                if (subVal == null) continue;
                parts.push(
                    `FIELDS[${key}][${subKey}]=${encodeURIComponent(String(subVal))}`
                );
            }
            continue;
        }

        // Scalars
        parts.push(`FIELDS[${key}]=${encodeURIComponent(String(value))}`);
    }

    return parts.join("&");
}


export const getYouTubeId = (url: string | undefined): string | null | undefined => {
    if (!url || !url.startsWith("http")) return null;

    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname === "youtu.be") {
            return parsedUrl.pathname.substring(1);
        }
        if (parsedUrl.hostname.includes("youtube.com")) {
            return parsedUrl.searchParams.get("v");
        }
    } catch (error) {
        console.error("Invalid YouTube URL:", url);
        return null;
    }
};

const LIMIT = 191 as const;

/**
 * Strips ALL HTML and returns plain text truncated to `limit`.
 * - Removes scripts/styles/noscript/template/head/title blocks entirely
 * - Drops comments, doctype, CDATA
 * - Decodes HTML entities (DOM when available, regex fallback on SSR)
 * - Collapses whitespace
 * - Appends "..." ONLY if truncated
 * Works in Next.js on both server and client.
 */
export function sanitizer(html: string, limit: number = LIMIT): string {
    if (!html) return "";

    // 1) Remove dangerous/hidden blocks completely (content + tags)
    let text = html
    // comments <!-- ... -->
        .replace(/<!--([\s\S]*?)-->/g, "")
    // doctype, PIs, CDATA
        .replace(/<!doctype[\s\S]*?>/gi, "")
        .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "")
        .replace(/<\?[\s\S]*?\?>/g, "")
    // blocks to strip entirely
        .replace(
            /<(script|style|template|noscript|iframe|head|title|svg|math)[\s\S]*?>[\s\S]*?<\/\1>/gi,
            ""
        );

    // 2) Replace remaining tags with a space (preserve word boundaries)
    //    also handle self-closing tags (e.g., <br/>)
    text = text
        .replace(/<br\s*\/?>/gi, " ") // treat <br> as a space
        .replace(/<[^>]+>/g, " ");

    // 3) Decode HTML entities
    text = decodeEntities(text);

    // 4) Normalize whitespace (including newlines/tabs)
    text = text.replace(/\s+/g, " ").trim();

    // 5) Safe slicing
    const truncated = sliceSafe(text, limit);
    // If already within limit -> return as is
    if (truncated.length === text.length) return truncated;

    // If truncated -> add ellipsis
    return truncated.trimEnd() + "...";
}

/** Prefer DOM entity decoding when available; fallback for SSR. */
function decodeEntities(str: string): string {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
    // Browser/Client: robust entity decode using DOM
        const textarea = document.createElement("textarea");
        textarea.innerHTML = str;
        return textarea.value;
    }

    // Server fallback: handle common named + numeric
    const named = str
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");

    const decimal = named.replace(/&#(\d+);/g, (_, code: string) =>
        String.fromCodePoint(Number(code))
    );

    return decimal.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex: string) =>
        String.fromCodePoint(parseInt(hex, 16))
    );
}

/**
 * Slices by grapheme clusters when available (Intl.Segmenter),
 * otherwise falls back to code points (Array.from).
 */
function sliceSafe(input: string, limit: number): string {
    if (limit <= 0) return "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const seg = new (Intl as any).Segmenter(undefined, { granularity: "grapheme" });
        const it = seg.segment(input)[Symbol.iterator]();
        let out = "";
        let count = 0;
        for (let step = it.next(); !step.done; step = it.next()) {
            const part = step.value.segment as string;
            if (count + 1 > limit) break;
            out += part;
            count += 1;
        }
        return out;
    }
    // Code point fallback
    const cps = Array.from(input);
    if (cps.length <= limit) return input;
    return cps.slice(0, limit).join("");
}
