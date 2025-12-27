import { useState, useEffect } from "react";
import { Container, Banner, BackButton, CategoryMenu, CategoryButton, ProductsContainer } from "./styles.js";
import { api } from "../../services/api.js";
import { formatPrice } from "../../utils/FormatPrice.js";
import CardProduct from "../../components/CardProduct/index.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";

export function Menu() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]); // Este estado vai guardar TODOS os 36 produtos
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(0);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Efeito para carregar categorias e produtos iniciais
    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await api.get('/categories');
                const newCategories = [{ id: 0, name: 'Todos' }, ...response.data];
                setCategories(newCategories);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        }

        async function loadProducts() {
            try {
                const response = await api.get('/products');
                const newProducts = response.data
                    // CORREÇÃO 1: REMOVIDO O FILTRO DE OFERTA AQUI
                    // Agora, 'newProducts' terá TODOS os 36 produtos
                    .map(product => {
                        return { ...product, formatedPrice: formatPrice(product.price) };
                    });
                setProducts(newProducts);
                // NÃO inicialize filteredProducts aqui. O useEffect de filtragem fará isso com base na URL.
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }

        loadCategories();
        loadProducts();
    }, []); // Executa apenas uma vez ao montar o componente

    // Efeito para ler a categoria da URL e definir o activeCategory
    useEffect(() => {
        const categoryIdFromUrl = Number(searchParams.get('categoria')) || 0;
        setActiveCategory(categoryIdFromUrl);
    }, [searchParams]); // Reage a mudanças nos parâmetros da URL

    // Efeito para filtrar produtos sempre que activeCategory ou products mudarem
    useEffect(() => {
        if (products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        if (activeCategory === 0) {
            setFilteredProducts(products); // Se a categoria ativa for 'Todos', mostra TODOS os produtos carregados
        } else {
            // CORREÇÃO 2: Usando 'product.category_id' (com underscore)
            const newFilteredProducts = products.filter(product => product.category_id === activeCategory);
            setFilteredProducts(newFilteredProducts);
        }
    }, [activeCategory, products]); // Depende de activeCategory e products
    const handleGoBack = () => {
        navigate('/'); // Navega para a rota raiz (Home)
    };


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
                        isActive={activeCategory === category.id}
                    // Removido o onClick redundante, o Link já faz a navegação
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
