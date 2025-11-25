
import DynamicCocktailForm from "./form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddCocktailPage() {
  return (
    <main className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">➕ Tambah Cocktail Baru</h1>
      
      <DynamicCocktailForm />
      
    </main>
  );
}