'use client';

import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Cocktail } from '@/lib/database';
import "bootstrap/dist/css/bootstrap.min.css";

interface EditFormProps {
  editAction: (formData: FormData) => Promise<void>;
  cocktail: Cocktail;
}


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-100 fw-bold"
    >
      {pending ? "Memperbarui..." : "Perbarui Cocktail"}
    </button>
  );
}

export default function DynamicEditForm({ editAction, cocktail }: EditFormProps) {
  const [error, setError] = useState<string | null>(null);

  
  const initialIngredients = cocktail.ingredients
    .split("|")
    .filter((i) => i.trim() !== "");

  
  const [ingredientsList, setIngredientsList] = useState<string[]>(
    initialIngredients.length > 0 ? initialIngredients : [""]
  );

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await editAction(formData);
    } catch (e: any) {
      setError(e.message || "Gagal memperbarui cocktail.");
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newList = [...ingredientsList];
    newList[index] = value;
    setIngredientsList(newList);
  };

  const handleAddIngredient = () => {
    setIngredientsList([...ingredientsList, ""]);
  };

  const handleRemoveIngredient = (index: number) => {
    const newList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(newList.length === 0 ? [""] : newList);
  };

  return (
    <form action={handleSubmit} className="card p-4 shadow">

  
      {error && (
        <div className="alert alert-danger">
          <strong>Error: </strong> {error}
        </div>
      )}

      <h3 className="mb-3">Edit Data Cocktail</h3>


      <div className="mb-3">
        <label className="form-label">Nama Cocktail</label>
        <input
          type="text"
          name="name"
          defaultValue={cocktail.name}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Daftar Bahan:</label>

        {ingredientsList.map((value, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              name={`ingredient-${index}`}
              placeholder={`Bahan #${index + 1}`}
              value={value}
              required
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="form-control"
            />

            {ingredientsList.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="btn btn-danger"
              >
                Hapus
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddIngredient}
          className="btn btn-success btn-sm fw-bold mt-2"
        >
          + Tambah Bahan
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Instruksi</label>
        <textarea
          name="instructions"
          rows={5}
          required
          defaultValue={cocktail.instructions}
          className="form-control"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
