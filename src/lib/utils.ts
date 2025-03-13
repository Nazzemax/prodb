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
    return Object.keys(obj)
        .map((key) => {
            if (Array.isArray(obj[key])) {
                return obj[key]
                    .map((item, index) =>
                        // Рекурсивно обрабатываем вложенные объекты в массиве
                        Object.keys(item)
                            .map((subKey) => 
                                // Преобразуем каждый элемент в нужный формат
                                `FIELDS[${key}][${index}][${subKey}]=${encodeURIComponent(item[subKey])}`
                            )
                            .join("&")
                    )
                    .join("&");
            } else if (typeof obj[key] === "object") {
                // Обрабатываем вложенные объекты
                return Object.keys(obj[key])
                    .map((subKey) => 
                        `FIELDS[${key}][${subKey}]=${encodeURIComponent(obj[key][subKey])}`
                    )
                    .join("&");
            } else {
                // Простые поля
                return `FIELDS[${key}]=${encodeURIComponent(obj[key])}`;
            }
        })
        .join("&");
}
