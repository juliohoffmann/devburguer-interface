// src/app/containers/Register/index.jsx

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link, } from "./style";
import Logo from "../../assets/Logo.png";
import { Button } from "../../components/Button";
import { api } from "../../services/api";

export function Register() {
  const navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string().required("O nome é obrigatório"),
      email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
      // ✅ CORREÇÃO AQUI: O campo de senha no schema do frontend deve ser 'password'
      password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
      // ✅ CORREÇÃO AQUI: O campo de confirmação deve ser 'passwordConfirm' e referenciar 'password'
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senhas devem ser iguais") // Referencia 'password'
        .required("A confirmação de senha é obrigatória"),
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
        api.post("/users", {
          name: data.name,
          email: data.email,
          // ✅ CORREÇÃO AQUI: Enviar o campo 'password' para o backend
          password: data.password,
          // REMOVIDO: passwordConfirm não deve ser enviado para o backend
        }),
        {
          pending: "Verificando seus dados...",
          success: "Seja bem-vindo ao Dev Burguer!",
          error: "Ops, algo deu errado, tente novamente.",
        }
      );
      localStorage.setItem("devburger:userData", JSON.stringify(response.data));
      console.log("Registro bem-sucedido:", response.data);
      navigate("/login"); // Redirecionar para login após o registro
    } catch (err) {
      console.error("Erro no registro:", err);
      // ✅ Usando encadeamento opcional para acessar a mensagem de erro do backend
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Falha ao registrar. Verifique sua conexão ou tente novamente.");
      }
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo DevBurguer" />
      </LeftContainer>
      <RightContainer>
        <Title>Criar Conta</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            {/* ✅ CORREÇÃO AQUI: Associar label com input usando htmlFor e id */}
            <label htmlFor="name-input">Nome</label>
            <input type="text" id="name-input" {...register("name")} />
            <p>{errors?.name?.message}</p>
          </InputContainer>
          <InputContainer>
            {/* ✅ CORREÇÃO AQUI: Associar label com input usando htmlFor e id */}
            <label htmlFor="email-input">Email</label>
            <input type="email" id="email-input" {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label htmlFor="password-input">Senha</label>
            {/* ✅ CORREÇÃO AQUI: Usar "password" para o campo de senha */}
            <input type="password" id="password-input" {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <InputContainer>
            <label htmlFor="password-confirm-input">Confirmar Senha</label>
            {/* ✅ CORREÇÃO AQUI: Usar "passwordConfirm" para o campo de confirmação */}
            <input type="password" id="password-confirm-input" {...register("passwordConfirm")} />
            <p>{errors?.passwordConfirm?.message}</p>
          </InputContainer>
          <Button type="submit">Criar Conta</Button>
        </Form>
        <p>
          Já possui uma conta?{" "}
          {/* ✅ CORREÇÃO AQUI: Usar um botão para ação de clique e navegar para /login */}
          <Link type="button" onClick={() => navigate("/login")}>
            Clique aqui.
          </Link>
        </p>
      </RightContainer>
    </Container>
  );
}
