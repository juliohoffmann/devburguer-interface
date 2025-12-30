// src/components/stripe/checkoutForm/index.jsx
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { useCart } from "../../../hooks/CartContext.jsx";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const {
    state: { dpmCheckerLink },
  } = useLocation();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or elements is not loaded");
      return;
    }
    setIsLoading(true);

    // O Stripe.js confirmPayment com redirect: "if_required"
    // irá lidar com 3D Secure e outros redirecionamentos necessários.
    // Se o pagamento for concluído sem redirecionamento, ele retornará o paymentIntent.
    // Se precisar de redirecionamento (ex: 3D Secure), ele fará o redirecionamento
    // para a return_url que você deve ter configurado no seu backend
    // ou no momento da criação do Payment Intent (se não estiver usando Checkout Sessions).
    // No seu caso, como você está usando PaymentElement e confirmPayment,
    // o Stripe espera que você lide com o redirecionamento manual ou configure uma return_url
    // no momento da criação do Payment Intent no backend.
    // No entanto, para o fluxo atual, vamos garantir que a navegação manual
    // após o sucesso seja correta.

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Mantém o comportamento padrão para 3D Secure, etc.
      // Se você quisesse forçar um redirecionamento, usaria:
      // confirmParams: {
      //   return_url: `${window.location.origin}/complete?payment_intent_client_secret=${clientSecret}`,
      // },
      // Mas como você está fazendo um navigate manual, não é estritamente necessário aqui.
    });

    console.log("Payment Intent:", paymentIntent);
    console.log("Error:", error);

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
      setIsLoading(false);
      // Em caso de erro, você pode redirecionar para a página de complete
      // para que ela exiba a mensagem de erro.
      // É importante passar o client_secret para que a página complete
      // possa tentar recuperar o status do Payment Intent, mesmo que tenha falhado.
      const clientSecret = elements?._elements[0]?.options?.clientSecret;
      if (clientSecret) {
        navigate(`/complete?payment_intent_client_secret=${clientSecret}`);
      } else {
        navigate('/complete'); // Redireciona sem client_secret se não for encontrado
      }

    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        const products = cartProducts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price
          };
        });

        // Você está criando o pedido no backend APÓS o sucesso do Stripe.
        // Isso é uma abordagem válida, mas significa que o backend precisa
        // associar este pedido ao paymentIntent.id.
        const { status } = await api.post('/orders', { products }, {
          validateStatus: () => true,
        });

        if (status === 200 || status === 201) {
          toast.success('Pedido realizado com sucesso!');
          clearCart(); // Limpa o carrinho no frontend

          // --- CORREÇÃO AQUI: USAR CRASES E REMOVER ESPAÇOS ---
          // Redireciona para a página de complete com o client_secret correto
          setTimeout(() => {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
          }, 3000);

        } else if (status === 409) {
          toast.error('Erro ao realizar o pedido. Tente novamente.');
          // Em caso de erro no backend, ainda redireciona para complete
          // para que o usuário veja um status de erro.
          navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
        } else {
          throw new Error('Erro desconhecido ao finalizar pedido no backend.');
        }
      } catch (error) {
        console.error('Erro ao finalizar pedido no backend:', error);
        toast.error('Falha no Sistema! Tente novamente.');
        // Em caso de erro no backend, ainda redireciona para complete
        // para que o usuário veja um status de erro.
        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
      }
    } else if (paymentIntent && paymentIntent.status === "requires_action") {
        // Se o pagamento requer uma ação (ex: 3D Secure), o Stripe.js
        // tentará lidar com isso automaticamente se `redirect: "if_required"` for usado.
        // Se precisar de um redirecionamento para autenticação, o Stripe o fará.
        // Após a autenticação, ele redirecionará para a `return_url` que você configurou
        // no seu backend ou no `confirmParams` (se tivesse usado).
        // Como não temos uma `return_url` explícita no `confirmPayment` aqui,
        // o comportamento pode variar.
        // Para garantir que a página `complete` seja visitada, podemos forçar a navegação.
        toast.info('Seu pagamento requer uma ação adicional. Redirecionando...');
        const clientSecret = elements?._elements[0]?.options?.clientSecret;
        if (clientSecret) {
          navigate(`/complete?payment_intent_client_secret=${clientSecret}`);
        } else {
          navigate('/complete');
        }
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements}
          id="submit"
          className="button">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar agora"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      <div id="dpm-annotation">
        <p>
          Os metodos de pagamento são disponibilizados de acordo com sua região.&nbsp;
          <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">
            Ver método de Pagamento.
          </a>
        </p>
      </div>
    </div>
  );
}
