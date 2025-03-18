'use client';

import { usePathname } from "next/navigation"

export const useSlug = (): string => {
    const pathname = usePathname()
    return pathname.split('/').pop() || ''
}

export const usePrevSlug = (): string => {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    return parts.length > 1 ? parts[parts.length - 2] : '';
};