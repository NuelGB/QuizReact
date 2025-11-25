"use server";

import { CocktailResponse } from "@/type/cocktail";
import { createCocktail, deleteCocktail, updateCocktail } from '@/lib/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getCocktailByType(type: string): Promise<{
  data?: CocktailResponse;
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch cocktail data");
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

export async function addCocktailAction(formData: FormData) {
  const name = formData.get('name') as string;
  const instructions = formData.get('instructions') as string;
  
  
  const ingredientsArray: string[] = [];
  formData.forEach((value, key) => {
    if (key.startsWith('ingredient-') && typeof value === 'string' && value.trim() !== '') {
      ingredientsArray.push(value.trim());
    }
  });

  
  const ingredients = ingredientsArray.join('|'); 

  if (!name || ingredientsArray.length === 0 || !instructions) {
    throw new Error('Nama, instruksi, dan minimal satu bahan harus diisi.');
  }

  await createCocktail(name, ingredients, instructions);

  revalidatePath('/'); 
  redirect('/');
}


export async function editCocktailAction(id: number, formData: FormData) {
  const name = formData.get('name') as string;
  const instructions = formData.get('instructions') as string;

 
  const ingredientsArray: string[] = [];
  formData.forEach((value, key) => {
  
    if (key.startsWith('ingredient-') && typeof value === 'string' && value.trim() !== '') {
      ingredientsArray.push(value.trim());
    }
  });

  const ingredients = ingredientsArray.join('|'); 
  

  if (!name || ingredientsArray.length === 0 || !instructions || !id) {
    throw new Error('Semua kolom harus diisi, dan minimal satu bahan diperlukan.');
  }

  await updateCocktail(id, name, ingredients, instructions);

  revalidatePath('/'); 
  redirect('/');
}