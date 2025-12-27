import { UserProvider } from "./UserContext";
import { CartProvider } from "./cartContext";
import { Elements } from "@stripe/react-stripe-js"; // Importe o CartProvider
import stripePromise from "../config/stripeConfig";
const AppProvider = ({ children }) => {
    return ( // Adicione os parênteses aqui
        <UserProvider>
            <CartProvider>
                <Elements stripe={stripePromise}>
                    {children}
                </Elements>
            </CartProvider>
        </UserProvider>
    );
};

export default AppProvider;

