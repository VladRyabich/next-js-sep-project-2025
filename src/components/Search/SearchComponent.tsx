"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import {searchQueryAction} from "@/server-actions/ServerActions";

const SearchComponent = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query] = useState(searchParams.get("query") || "");
    const [isPending, startTransition] = useTransition();

    const handleSearch = async (formData: FormData) => {
        const queryValue = formData.get("query") as string;
        const newUrl = await searchQueryAction(pathname, searchParams, queryValue);

        startTransition(() => {
            router.push(newUrl); // Оновлюємо URL після виконання Server Action
        });
    };

    return (
        <form action={handleSearch} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <input
                type="text"
                name="query"
                placeholder="SearchComponent by name or ID..."
                defaultValue={query}
                style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <button type="submit" disabled={isPending} style={{ padding: "8px", cursor: "pointer" }}>
                {isPending ? "🔄 Searching..." : "🔍 SearchComponent"}
            </button>
        </form>
    );
};

export default SearchComponent;