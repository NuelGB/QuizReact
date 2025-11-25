"use client";

import { useEffect, useState } from "react";
import { getCocktailDetail } from "@/app/action/detailcock";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [drink, setDrink] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await getCocktailDetail(id);

      if (error || !data?.drinks?.length) {
        setError("Drink tidak ditemukan.");
        return;
      }

      setDrink(data.drinks[0]);
    }

    load();
  }, [id]);

  if (error) {
    return (
      <div className="container py-5 d-flex justify-content-center">
        <div className="alert alert-danger px-5 py-3 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!drink) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="text-center" style={{ maxWidth: "700px" }}>

        <h1 className="mb-4 fw-bold">{drink.strDrink}</h1>

        <img
          src={drink.strDrinkThumb}
          className="img-fluid rounded shadow mb-4"
          alt={drink.strDrink}
          style={{ maxWidth: "350px" }}
        />

        <h4 className="fw-semibold mt-3">instruksi</h4>
        <p className="mx-auto" style={{ maxWidth: "600px" }}>
          {drink.strInstructions}
        </p>

        <h4 className="fw-semibold mt-4">Bahan</h4>
        <ul
          className="list-group mx-auto mb-4"
          style={{ maxWidth: "350px", textAlign: "center" }}
        >
          {drink.strIngredient1 && (
            <li className="list-group-item">{drink.strIngredient1}</li>
          )}
          {drink.strIngredient2 && (
            <li className="list-group-item">{drink.strIngredient2}</li>
          )}
          {drink.strIngredient3 && (
            <li className="list-group-item">{drink.strIngredient3}</li>
          )}
          {drink.strIngredient4 && (
            <li className="list-group-item">{drink.strIngredient4}</li>
          )}
          {drink.strIngredient5 && (
            <li className="list-group-item">{drink.strIngredient5}</li>
          )}

          {drink.strIngredient6 && (
            <li className="list-group-item">{drink.strIngredient6}</li>
          )}
          {drink.strIngredient7 && (
            <li className="list-group-item">{drink.strIngredient7}</li>
          )}
          {drink.strIngredient8 && (
            <li className="list-group-item">{drink.strIngredient8}</li>
          )}
          {drink.strIngredient9 && (
            <li className="list-group-item">{drink.strIngredient9}</li>
          )}
          {drink.strIngredient10 && (
            <li className="list-group-item">{drink.strIngredient10}</li>
          )}
          {drink.strIngredient11 && (
            <li className="list-group-item">{drink.strIngredient11}</li>
          )}
          {drink.strIngredient12 && (
            <li className="list-group-item">{drink.strIngredient12}</li>
          )}
          {drink.strIngredient13 && (
            <li className="list-group-item">{drink.strIngredient13}</li>
          )}
          {drink.strIngredient14 && (
            <li className="list-group-item">{drink.strIngredient14}</li>
          )}
          {drink.strIngredient15 && (
            <li className="list-group-item">{drink.strIngredient15}</li>
          )}
        </ul>

        <a href="/explore" className="btn btn-secondary px-4 py-2">
          Kembali
        </a>
      </div>
    </div>
  );
}
