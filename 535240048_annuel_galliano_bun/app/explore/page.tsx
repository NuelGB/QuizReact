"use client";
import { useEffect, useState } from "react";
import { getCocktailByType } from "../action/action";
import { Cocktail } from "@/type/cocktail";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Explore() {
  const [nonAlcoholic, setNonAlcoholic] = useState<Cocktail[]>([]);
  const [alcoholic, setAlcoholic] = useState<Cocktail[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setError("");

      const nonA = await getCocktailByType("Non_Alcoholic");
      const alc = await getCocktailByType("Alcoholic");

      if (nonA.error || alc.error) {
        setError(nonA.error || alc.error || "Failed to load cocktails");
        return;
      }

      if (nonA.data) setNonAlcoholic(nonA.data.drinks);
      if (alc.data) setAlcoholic(alc.data.drinks);
    }

    load();
  }, []);

  return (
    <Container className="mt-4 mb-5">
      <h1 className="text-center mb-4">Explore Cocktails</h1>
      <p> Sumber : https://www.thecocktaildb.com/api.php</p>
      <Button variant="primary" href="/" className="mb-4">
        Kembali
      </Button>
      {error && <p className="text-danger">{error}</p>}

      <h3 className="mt-4">Non Alcoholic</h3>
      <Row className="g-4">
        {nonAlcoholic.map((drink) => (
          <Col key={drink.idDrink} xs={6} md={2}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title style={{ fontSize: "14px" }}>
                  {drink.strDrink}
                </Card.Title>
                <a
                  href={`/explore/${drink.idDrink}`}
                  className="btn btn-sm btn-primary mt-2"
                >
                  Lihat Detail
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="mt-5">Alcoholic</h3>
      <Row className="g-4">
        {alcoholic.map((drink) => (
          <Col key={drink.idDrink} xs={6} md={2}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title style={{ fontSize: "14px" }}>
                  {drink.strDrink}
                </Card.Title>
                <a
                  href={`/explore/${drink.idDrink}`}
                  className="btn btn-sm btn-primary mt-2"
                >
                  Lihat Detail
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
