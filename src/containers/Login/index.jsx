
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import * as yup from "yup"
import { useNavigate,  } from "react-router-dom";
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer,   } from "./style";
import  Logo  from "../../assets/Logo.png";

import { Button } from "../../components/Button";
import { api} from "../../services/api";

export function Login() {
  const navigate = useNavigate(); // Inicialize o hook useNavigate
  const schema = yup
  .object({
    email: yup.string().email('Digite um email valido').required('o email é obrigatório'),
    password: yup.string().min(6,' A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
  })
  .required()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);

  const onSubmit = async (data) => {
    try {
      const response = await toast.promise(
        api.post("/sessions", {
        email: data.email,
        password: data.password,
      }),
      {
        pending: "Verificando seus dados",
        success: "Seja bem vindo ao Dev Burguer",
        error: "Email ou senha incorretos",
      }
      );
      localStorage.setItem('devburger:userData', JSON.stringify(response.data));
      console.log("Login bem-sucedido:", response.data);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
   
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo DevBurguer" />
      </LeftContainer>

      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Dev Burger!</span>
          <br />
         Acesse com seu <span>Login e Senha.</span>
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          
          <Button type="submit">Entrar</Button> 

        </Form>
      

      <p>
      Ainda não possui uma conta?<a> Clique aqui.</a>
      </p>

      </RightContainer>
    </Container>
  );
}
