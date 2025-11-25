

'use server';

import { deleteCocktail } from '@/lib/database'; 
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';




export async function deleteCocktailAction(id: number) {
  if (!id) {
    throw new Error('ID cocktail tidak valid atau hilang.'); 
  }
  
  try {
   
    await deleteCocktail(id);
    
   
    
  } catch (error) {
    
    console.error("Error database saat menghapus cocktail:", error);
    throw new Error("Gagal menghapus data dari database."); 
  }
  
  
  revalidatePath('/'); 
  redirect('/'); 
}