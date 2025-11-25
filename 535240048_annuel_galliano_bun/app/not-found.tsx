import Link from "next/link";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">
            <h1 className="display-1 fw-bold text-danger mb-4">404</h1>

            <h2 className="display-5 fw-light text-secondary mb-3">
              Opss! Halaman yang Anda cari tidak dapat ditemukan.
            </h2>

            <p className="lead text-muted mb-4">
              Kami tidak dapat menemukan URL yang Anda akses. Mungkin halaman
              tersebut telah dipindahkan, dihapus, atau Anda salah mengetik
              alamatnya.
            </p>

            <div className="mt-5">
              <Link href="/" passHref>
                <button className="btn btn-primary btn-lg shadow-sm">
                  <i className="bi bi-house-door-fill me-2"></i>
                  Kembali ke Beranda Utama
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
