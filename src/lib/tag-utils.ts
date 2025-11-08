import { Tag } from "@/api/Article/types";

type TagLike = Pick<Tag, "id" | "tags"> | { id?: number | null; tags?: string | null };

export function normalizeTagLabels(tags?: TagLike[] | null): string[] {
    if (!Array.isArray(tags)) return [];

    const seen = new Set<string>();

    return tags
        .map((tag) => (typeof tag?.tags === "string" ? tag.tags.trim() : ""))
        .filter((label) => {
            if (!label || seen.has(label)) {
                return false;
            }
            seen.add(label);
            return true;
        });
}

export function normalizeTagIds(tags?: TagLike[] | null): number[] {
    if (!Array.isArray(tags)) return [];

    return tags
        .map((tag) => tag?.id)
        .filter((id): id is number => typeof id === "number");
}
