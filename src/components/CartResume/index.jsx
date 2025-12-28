import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/CartContext.jsx";
import { api } from "../../services/api.js";
import { formatPrice } from "../../utils/FormatPrice.js";
import { ContainerPrime, Content } from "./styles.js";
import { Button } from "../Button";



export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [deliveryTax] = useState(500);
    const navigate = useNavigate();

    const { cartProducts } = useCart();

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc;
        }, 0);
        setFinalPrice(sumAllItems);
    }, [cartProducts]);
    const submitOrder = async () => {
        const products = cartProducts.map((product) => {
            return {
                id: product.id,
                quantity: product.quantity,
                price: product.price
            };
        });
        try {
            const { data } = await api.post('/create-payment-intent', { products },);
          
                navigate('/checkout', {state: data });
            } catch (error) {
                toast.error('Erro ao realizar o pedido. Tente novamente.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }};
     

            return (
                <ContainerPrime>
                    <Content>
                        <div className="container-top">
                            <h2 className='title'>Resumo do pedido</h2>
                            <p className='items'>Itens</p>
                            <p className='items-price'>{formatPrice(finalPrice)}</p>
                            <p className='delyvery-tax'>Taxa de Entrega</p>
                            <p className='delivery-tax-price'>{formatPrice(deliveryTax)}</p>
                        </div>
                        <div className="container-bottom">
                            <p>Total</p>
                            <p>{formatPrice(finalPrice + deliveryTax)}</p>
                        </div>
                    </Content>
                    <Button onClick={submitOrder}>Finalizar Pedido</Button>
                </ContainerPrime>


            )
        
    };