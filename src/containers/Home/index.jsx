


import {CategoriesCarousel,OffersCarousel} from "../../components";
import { Banner, Container } from "./styles.js";



export function Home() {
    
     
    return (
        <main>
            <Banner>
           <h1> Bem Vindo(a)!</h1>
            </Banner>
            <Container>
                <div>
                    <CategoriesCarousel />
                    <div> Carrossel Produtos </div>
                    <OffersCarousel />
                    <div> Carrossel Ofertas </div>
                    
                </div>
            </Container>
        </main>
        );
}

