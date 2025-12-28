import { useState, useEffect } from "react";
import { Container, Banner, BackButton, CategoryMenu, CategoryButton, ProductsContainer } from "./styles.js";
import { api } from "../../services/api.js";
import { formatPrice } from "../../utils/FormatPrice.js";
import CardProduct from "../../components/CardProduct/index.jsx";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get("categoria");
    if (categoryId) {
      return categoryId;
    }
    return 0;
  });

  // Este useEffect monitora mudanças na URL para atualizar activeCategory
  useEffect(() => {
    const newCategoryId = +queryParams.get("categoria");
    if (newCategoryId !== activeCategory) {
      setActiveCategory(newCategoryId || 0);
    }
  }, [search, activeCategory]); // Adicione activeCategory às dependências para garantir que a comparação seja com o estado mais recente

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get("/categories");
        const newCategories = [{ id: 0, name: "Todas" }, ...data];
        setCategories(newCategories);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    async function loadProducts() {
      try {
        const { data } = await api.get("/products");
        const newProducts = data.map((product) => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));
        setProducts(newProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    const currentActiveCategory = Number(activeCategory);

    if (products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let newFilteredProducts = [];
    if (currentActiveCategory === 0) {
      newFilteredProducts = products; // Mostra todos os produtos
    } else {
      newFilteredProducts = products.filter(
        (product) => product.category_id === currentActiveCategory
      );
    }
    setFilteredProducts(newFilteredProducts);
  }, [products, activeCategory]);

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBURGUER
          <br />
          ESTÁ AQUI!
          <span>Esse Cardápio🍔está irresistivel!</span>
        </h1>
      </Banner>
      <BackButton onClick={handleGoBack}>
        Voltar para Home
      </BackButton>
      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            to={`/cardapio?categoria=${category.id}`}
            $isActive={Number(activeCategory) === category.id}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>
      <ProductsContainer>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <CardProduct key={product.id} product={product} />
          ))
        ) : (
          <p>Nenhum produto encontrado nesta categoria.</p>
        )}
      </ProductsContainer>
    </Container>
  );
}
