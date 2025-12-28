// src/components/OffersCarousel/index.jsx
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { api } from "../../services/api.js";
import { Container, Title } from "./styles.js";
import CardProduct from "../CardProduct/index.jsx";
import { formatPrice } from "../../utils/FormatPrice.js";

export  function OffersCarousel() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await api.get('/products');
                const onlyOffers = response.data
                    .filter(product => product.offer === true) // Corrigido a sintaxe do filter
                    .map(product => {
                        // Adiciona o preço formatado ao objeto do produto
                        return { ...product, formatedPrice: formatPrice(product.price) };
                    });
                setOffers(onlyOffers);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }
        loadProducts();
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
            <Title> OFERTAS DO DIA </Title>
            <Carousel
                responsive={responsive}
                infinite={true}
                partialVisible={false}
                itemClass="carousel-item"
            >
                {offers.map((product) => (
                    <CardProduct key={product.id} product={product} />
                ))}
            </Carousel>
        </Container>
    );
}






