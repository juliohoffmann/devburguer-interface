import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import { api } from "../../services/api";
import { Button } from "../../components/Button";
import Logo from "../../assets/Logo.png";
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from "./style";

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup.string().email('Digite um email válido').required('O email é obrigatório'),
      password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await toast.promise(
        api.post('/sessions', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: "Verificando seus dados...",
          success: "Login realizado com sucesso!",
          error: "E-mail ou senha incorretos. Tente novamente.", // Esta mensagem é genérica, o catch pode refinar
        }
      );

      // As linhas abaixo só devem ser executadas se a requisição for bem-sucedida
      // localStorage.setItem('devburger:userData', JSON.stringify(response.data.user)); // Já está sendo feito pelo UserContext
      // localStorage.setItem('devburger:token', response.data.token); // Já está sendo feito pelo UserContext
      console.log("Login bem-sucedido:", response.data);

      putUserData(response.data); // Mova esta linha para cá

      if (response.data?.admin) {
        navigate("/admin/pedidos");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      // ✅ CORREÇÃO AQUI: Usando encadeamento opcional
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Falha ao fazer login. Verifique sua conexão ou tente novamente.");
      }
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo DevBurguer" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem-vindo ao <span>Dev Burger!</span>
          <br />
          Acesse com seu <span>Login e Senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label htmlFor="email-input">Email</label>
            <input
              type="email"
              id="email-input"
              {...register("email")}
              autoComplete="email"
            />
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label htmlFor="password-input">Senha</label>
            <input
              type="password"
              id="password-input"
              {...register("password")}
              autoComplete="current-password"
            />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>
          Ainda não possui uma conta?{" "}
          <Link type="button" onClick={() => navigate("/cadastro")}>
            Clique aqui.
          </Link>
        </p>
      </RightContainer>
    </Container>
  );
}
