"use client";

import { useFormStatus } from "react-dom";
import { useState } from "react";
import { addCocktailAction } from "../action/action";
import "bootstrap/dist/css/bootstrap.min.css";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <a href="#baru">
      <button
        type="submit"
        disabled={pending}
        className="btn btn-success w-100 fw-bold"
      >
        {pending ? "Menyimpan..." : "Simpan Cocktail"}
      </button>
    </a>
  );
}

export default function DynamicCocktailForm() {
  const [error, setError] = useState<string | null>(null);
  const [numIngredients, setNumIngredients] = useState<number | "">(1);
  const [isConfigured, setIsConfigured] = useState(false);

  const [cocktailName, setCocktailName] = useState("");
  const [instructions, setInstructions] = useState("");

  const ingredientFields = Array.from(
    { length: numIngredients as number },
    (_, i) => i
  );

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof numIngredients === "number" && numIngredients > 0) {
      setIsConfigured(true);
      setError(null);
    } else {
      setError("Jumlah bahan harus angka positif.");
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await addCocktailAction(formData);

      const targetElement = document.getElementById("baru");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      setCocktailName("");
      setInstructions("");
      setNumIngredients(1);
      setIsConfigured(false);
    } catch (e: any) {
      setError(e.message || "Gagal menyimpan cocktail.");
    }
  };

  return (
    <div className="container mt-4">
      {error && (
        <div className="alert alert-danger">
          <strong>Error: </strong>
          {error}
        </div>
      )}

      {!isConfigured ? (
        <form onSubmit={handleConfigSubmit} className="card p-4 shadow">
          <h3 className="mb-3">Langkah 1: Tentukan Jumlah Bahan</h3>

          <div className="mb-3">
            <label className="form-label">
              Berapa banyak bahan yang digunakan?
            </label>
            <input
              type="number"
              min="1"
              required
              value={numIngredients}
              onChange={(e) =>
                setNumIngredients(
                  e.target.value === "" ? "" : parseInt(e.target.value)
                )
              }
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Lanjutkan
          </button>
        </form>
      ) : (
        <form action={handleSubmit} className="card p-4 shadow">
          <h3 className="mb-3">Langkah 2: Masukkan Detail Cocktail</h3>

          <div className="mb-3">
            <label className="form-label">Nama Cocktail : </label>
            <input
              type="text"
              name="name"
              required
              className="form-control"
              value={cocktailName}
              onChange={(e) => setCocktailName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Daftar Bahan ({numIngredients} total)
            </label>

            {ingredientFields.map((index) => (
              <input
                key={index}
                type="text"
                name={`ingredient-${index + 1}`}
                required
                placeholder={`Bahan ke-${index + 1}`}
                className="form-control mb-2"
              />
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">Instruksi Pembuatan</label>
            <textarea
              name="instructions"
              rows={5}
              required
              className="form-control"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsConfigured(false)}
            className="btn btn-secondary w-100 mb-2"
          >
            Ubah Jumlah Bahan
          </button>

          <SubmitButton />
        </form>
      )}
    </div>
  );
}
