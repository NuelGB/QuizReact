// app/cocktail/[id]/page.tsx

import { getCocktailById } from "@/lib/database";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

interface DetailPageProps {
  params: { id: string };
}

export default async function CocktailDetailPage({ params }: DetailPageProps) {
  const id = parseInt(params.id);
  const cocktail = await getCocktailById(id);

  if (!cocktail) {
    return (
      <main className="container py-5">
        <div className="text-center">
          <h1 className="text-danger fw-bold mb-3">404: Cocktail Tidak Ditemukan</h1>
          <p className="mb-4">Cocktail dengan ID {params.id} tidak ada dalam database.</p>

          <Link href="/" className="btn btn-outline-primary">
            &larr; Kembali ke Daftar
          </Link>
        </div>
      </main>
    );
  }

  const ingredientsList = cocktail.ingredients
    .split("|")
    .filter((item) => item.trim() !== "");

  return (
    <main className="container py-5 d-flex justify-content-center">
      <div className="col-md-8">

     
        <div className="text-center mb-4">
          <h1 className="fw-bold">detail dari : {cocktail.name}</h1>
        </div>

       
        <div className="card shadow mb-4">
          <div className="card-body">
            <h3 className="card-title border-bottom pb-2 mb-3">Bahan-bahan</h3>

            {ingredientsList.length > 0 ? (
              <ul className="list-group">
                {ingredientsList.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Tidak ada bahan tersedia.</p>
            )}
          </div>
        </div>

      
        <div className="card shadow mb-4">
          <div className="card-body">
            <h3 className="card-title border-bottom pb-2 mb-3">Instruksi Pembuatan</h3>
            <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
              {cocktail.instructions}
            </p>
          </div>
        </div>

     
        <div className="text-center">
          <Link href="/" className="btn btn-secondary">
            &larr; Kembali ke Daftar Cocktail
          </Link>
        </div>
      </div>
    </main>
  );
}
