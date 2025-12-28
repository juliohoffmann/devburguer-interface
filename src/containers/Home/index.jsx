// src/containers/Client/Home/index.jsx
// Remova useState, pois não é mais usado aqui
// import { useState } from "react";
import { CategoriesCarousel, OffersCarousel } from "../../components";
import { Banner, Container } from "./styles.js";

export function Home() {
  // Remova o estado activeCategory, pois ele não é mais usado aqui
  // const [activeCategory, setActiveCategory] = useState(0);

  return (
    <main>
      <Banner>
        <h1> Bem Vindo(a)!</h1>
      </Banner>
      <Container>
        <div>
          <CategoriesCarousel
            // Remova as props activeCategory e setActiveCategory
            // activeCategory={activeCategory}
            // setActiveCategory={setActiveCategory}
          />
          {/* ... o restante do seu layout da Home ... */}
          <div> Carrossel Produtos </div> {/* Este div parece ser um placeholder */}
          <OffersCarousel />
          <div> Carrossel Ofertas </div> {/* Este div parece ser um placeholder */}
        </div>
      </Container>
    </main>
  );
}
