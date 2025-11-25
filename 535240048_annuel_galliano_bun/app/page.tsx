import Link from "next/link";
import { getAllCocktails, initializeDatabase, Cocktail } from "@/lib/database";
import DeleteButton from "./delete/deletebutton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export default async function HomePage() {
  await initializeDatabase();
  const cocktails: Cocktail[] = await getAllCocktails();

  return (
    <main className="container mt-5">
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center fw-bold"
        style={{ minHeight: "100vh" }}
      >
        <h2>Nama : Annuel Galliano Bun</h2>
        <h2>NIM : 535240048</h2>
        <h2>Topik : Resep Cocktail</h2>
        <a href="#baru">
          <h2>Scroll Down ↓↓↓</h2>
        </a>
      </div>

      <div
        className="d-flex flex-column justify-content-center align-items-center text-center fw-bold"
        style={{ minHeight: "100vh" }}
      >
        <h2>Cocktail</h2>
        <img src="image/sejarah.png"></img>
        <p>
          Coktail adalah minuman campuran berbagai jenis minuman ringan dan jus
          buah dengan tambahan minuman beralkohol. Biasanya, minuman ini
          disajikan sebelum atau sesudah makan malam. Ini tergantung jenis
          cocktail apa yang akan dikonsumsi. Cocktail memiliki cita rasa asam,
          manis, dan pahit karena mengandung sebagian besar alkohol. Cocktail
          harganya lebih mahal dibanding mocktail karena mengandung minuman
          beralkohol. Minuman ini berpotensi memabukkan bagi yang meminumnya.
          Beberapa cocktail populer di antaranya yaitu Manhattan, Alexander,
          Dirty martini, French Connection, dan Green Russians.
        </p>

        <Button variant="info" href="/explore" className="mt-4 px-4 py-2">
          Explore lebih jauh
        </Button>
      </div>

      <div
        className="d-flex flex-column justify-content-center align-items-center text-center fw-bold"
        style={{ minHeight: "100vh" }}
      >
        <h2>Sejarah Cocktail</h2>
        <img src="image/sejarah.png"></img>
        <p>
          Cocktail pertama kali muncul pada awal abad ke-19 di Amerika Serikat
          dan artinya "campuran minuman beralkohol". Ada banyak teori tentang
          asal usul kata "cocktail", tetapi tidak ada konsensus yang jelas.
          Beberapa orang percaya bahwa kata itu berasal dari bahasa Prancis
          "coquetier", yang berarti "gelas telur" dan digunakan untuk menyajikan
          minuman pada abad ke-18. Yang lain percaya bahwa kata itu berasal dari
          praktik memotong ekor kuda dan menempelkannya ke piala minuman, yang
          disebut "cocktail". Apapun asal usul kata "cocktail", minuman ini
          menjadi sangat populer pada abad ke-19 dan telah berevolusi menjadi
          banyak varian yang dikenal saat ini.
        </p>
      </div>

      <div id="baru">
        <h1 className="text-center mb-4 fw-bold">
          Buat Resep Cocktail Versimu !
        </h1>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <Link href="/create" className="btn btn-success fw-bold">
          Tambah Resep Cocktail Baru
        </Link>
      </div>

      {cocktails.length === 0 ? (
        <p className="text-muted text-center">
          Belum ada cocktail yang terdaftar.
        </p>
      ) : (
        <div className="row g-4 justify-content-center">
          {cocktails.map((cocktail) => (
            <div key={cocktail.id} className="col-md-4 col-lg-3">
              <div className="card shadow-sm h-100">
                <img
                  src="/image/cocktail.png"
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title fw-bold">{cocktail.name}</h5>
                </div>

                <div className="card-footer bg-white d-flex flex-column gap-2">
                  <Link
                    href={`/cocktail/${cocktail.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Lihat Detail
                  </Link>

                  <Link
                    href={`/edit/${cocktail.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>

                  <DeleteButton cocktailId={cocktail.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
