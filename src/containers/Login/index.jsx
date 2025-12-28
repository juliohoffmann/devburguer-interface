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
      email: yup
        .string()
        .email("Digite um e-mail válido")
        .required("O e-mail é obrigatório"),
      password: yup.string().required("A senha é obrigatória"),
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
    const { data: userData } = await toast.promise(
      api.post("/session", {
        email: data.email,
        password: data.password,
      }),
      {
        peding: "Verificando seus dados",
        success: {
          render() {
            setTimeout(() => {
              if (userData?.admin) {
                navigate("/admin/pedidos");
              } else {
                navigate("/");
              }
            }, 2000);
            return "Seja Bem Vindo(a)";
          },
        },
        error: "E-mail ou password estão incorretos.",
      }
    );
    putUserData(userData);
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