// src/components/CategoriesCarousel/index.jsx
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { api } from "../../services/api.js";
// Remova qualquer import de useNavigate, useLocation, useSearchParams daqui
// import { useNavigate } from "react-router-dom"; // REMOVA ESTA LINHA
import { Container, Title, ContainerItems, CategoryButton } from "./styles.js";

export function CategoriesCarousel() { // Remova as props activeCategory, setActiveCategory
  const [categories, setCategories] = useState([]);
  // Remova qualquer declaração de navigate, searchParams, activeCategory local
  // const navigate = useNavigate(); // REMOVA ESTA LINHA
  // const activeCategory = ... // REMOVA ESTA LINHA

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    loadCategories();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return (
    <Container>
      <Title> CATEGORIAS </Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-item"
      >
        {categories.map((category) => (
          <ContainerItems key={category.id} $imageUrl={category.url}>
            <CategoryButton
              // key={category.id} // A key já está no ContainerItems, não precisa aqui
              to={`/cardapio?categoria=${category.id}`} // ESSA PROP É CRÍTICA
              // A prop isActive não é mais necessária aqui, pois a Home não tem um "activeCategory" para o carrossel
              // isActive={activeCategory === category.id} // REMOVA ESTA LINHA
              // Remova qualquer onClick aqui, o Link já faz a navegação
              // onClick={() => { ... }} // REMOVA ESTE BLOCO
            >
              {category.name}
            </CategoryButton>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  );
}
