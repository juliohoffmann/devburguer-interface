 import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import stripePromise from "../../config/stripeConfig.js";
import { CheckoutForm } from "../../components";
export function Checkout() {
    const {
        state:{clientSecret},
     } = useLocation()
    if(!clientSecret){
        return <div>Erro ao carregar o checkout</div>;
    }
    return (
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm/>
        </Elements>
    );
}