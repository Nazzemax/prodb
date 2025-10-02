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