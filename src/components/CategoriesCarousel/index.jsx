
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { api } from "../../services/api.js";

import { Container, Title, ContainerItems, CategoryButton } from "./styles.js";
import { useLocation, useSearchParams } from "react-router-dom";


export  function CategoriesCarousel() {

  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  useLocation();
  const activeCategory = searchParams.get('categoria');
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');
        setCategories(response.data); // Salva os dados no estado
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        // Opcional: toast.error("Não foi possível carregar as categorias.");
      }
    }
    loadCategories();
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
          <ContainerItems key={category.id}
            $imageUrl={category.url}> {/* Assumindo que category.url existe */}
            <CategoryButton
              key={category.id}
              to={`/cardapio?categoria=${category.id}`}
              isActive={activeCategory === category.id}
            // Removido o onClick redundante, o Link já faz a navegação

            >{category.name}</CategoryButton> {/* Use um span ou p para o nome */}
          </ContainerItems>
        ))}

      </Carousel>
    </Container>
  )
}






