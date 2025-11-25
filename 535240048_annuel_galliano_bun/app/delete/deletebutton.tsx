"use client";

import { useState } from "react";
import { deleteCocktailAction } from "./action";
import { useTransition } from "react";

interface DeleteButtonProps {
  cocktailId: number;
}

export default function DeleteButton({ cocktailId }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const boundDeleteAction = deleteCocktailAction.bind(null, cocktailId);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    startTransition(() => {
      boundDeleteAction();
    });
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="w-100">
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="btn btn-danger btn-sm w-100"
      >
        Hapus
      </button>

      <div
        className={`modal ${showConfirm ? "show d-block" : ""}`}
        tabIndex={-1}
        style={{ backgroundColor: showConfirm ? "rgba(0, 0, 0, 0.5)" : "" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-warning text-dark">
              <h5 className="modal-title">Konfirmasi Penghapusan</h5>
              <button
                type="button"
                className="btn-close"
                onClick={cancelDelete}
                disabled={isPending}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <p>Apakah Anda yakin ingin menghapus cocktail ini?</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={cancelDelete}
                disabled={isPending}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={confirmDelete}
                disabled={isPending}
              >
                {isPending ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirm && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
