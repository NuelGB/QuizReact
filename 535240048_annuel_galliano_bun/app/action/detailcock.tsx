"use server";

import { CocktailDetailResponse } from "@/type/cocktail";

export async function getCocktailDetail(id: string): Promise<{
  data?: CocktailDetailResponse;
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    if (!res.ok) throw new Error("Detail not found");

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: (err as Error).message };
  }
}
