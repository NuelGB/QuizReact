
import { getCocktailById } from '@/lib/database';
import { editCocktailAction } from '@/app/action/action';
import DynamicEditForm from './editcocktail';
import "bootstrap/dist/css/bootstrap.min.css";  

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditCocktailPage({ params }: EditPageProps) {
  const id = parseInt(params.id);
  const cocktail = await getCocktailById(id);

  if (!cocktail) {
    return (
      <main className="container mx-auto p-4">
        <p className="text-red-500">Cocktail dengan ID {params.id} tidak ditemukan.</p>
      </main>
    );
  }


  const boundEditAction = editCocktailAction.bind(null, id);

  return (
    <main className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit {cocktail.name}</h1>
      

      <DynamicEditForm 
        cocktail={cocktail} 
        editAction={boundEditAction}
      />
      
    </main>
  );
}